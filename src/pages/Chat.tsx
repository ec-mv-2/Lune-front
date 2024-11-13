import Page from "@/components/Page";
import { useEffect, useRef, useState, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBackendApi } from "@/hooks/useBackendApi";
import { AuthContext } from "@/contexts/AuthContext";

interface Message {
  text: string;
}

interface User {
  _id: string;
  userId: string;
  name: string;
}

export function Chat({ userId }: { userId: string }) {
  const { user } = useContext(AuthContext);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [recipientId, setRecipientId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const messageRef = useRef<HTMLInputElement>(null);

  const { getUser } = useBackendApi();

  const fetchConversation = async (recipientId: string) => {
    try {
      const response = await fetch(`http://localhost:3333/conversations/${userId}/${recipientId}`);
      const data = await response.json();
      if (data.messages) {
        setMessageList(data.messages); 
      }
    } catch (error) {
      console.error("Erro ao buscar a conversa:", error);
      toast.error("Erro ao carregar o histórico de mensagens.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser(userId);
        console.log("Dados do usuário:", response.user);
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
        toast.error("Erro ao carregar dados do usuário.");
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    const socketConnection = io("http://localhost:3333");
    setSocket(socketConnection);

    socketConnection.on("receiveMessage", (data: { from: string; message: string }) => {
      if (data.from === recipientId) {
        setMessageList((prevMessages) => [
          ...prevMessages,
          { text: `${data.from}: ${data.message}` },
        ]);
      }
    });

    socketConnection.on("connect_error", (err: Error) => {
      toast.error(`Erro de conexão: ${err.message}`);
      console.error("Erro de conexão:", err);
    });

    return () => {
      socketConnection.off("receiveMessage");
      socketConnection.disconnect();
    };
  }, [recipientId]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3333/listUsers");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast.error("Erro ao buscar usuários.");
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("authenticate", userId);
    }
  }, [socket, userId]);

  const handleSubmit = () => {
    if (!recipientId) {
      toast.error("Selecione um destinatário antes de enviar.");
      return;
    }

    if (messageRef.current && socket && recipientId) {
      const message = messageRef.current.value.trim();
      if (!message) {
        toast.error("A mensagem está vazia.");
        return;
      }

      socket.emit("message", {
        from: userId,
        to: recipientId,
        message: message,
      });

      setMessageList((prevMessages) => [
        ...prevMessages,
        { text: `${user?.name || "Eu"}: ${message}` },
      ]);

      messageRef.current.value = "";
      toast.success("Mensagem enviada com sucesso!");
    }
  };

  const handleSelectRecipient = (selectedUserId: string) => {
    setRecipientId(selectedUserId);
    setMessageList([]); 
    fetchConversation(selectedUserId);
  };

  return (
    <div className="min-h-screen">
      <Page className="">
        <div className="p-4 pt-20 max-w-lg mx-auto">
          <div className="mb-6">
            <h2 className="text-xl mb-2">Escolha um destinatário:</h2>
            <ul className="space-y-2">
              {users.map((user) => (
                <li key={user._id}>
                  <button
                    onClick={() => handleSelectRecipient(user._id)}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      recipientId === user._id ? "bg-darkBlueText text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {user.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {recipientId && (
            <div className="mb-4">
              <h3 className="text-lg text-darkBlueText">
                Conversa com {users.find((user) => user._id === recipientId)?.name}
              </h3>
            </div>
          )}

          <div className="flex items-center  mb-4">
            <input
              type="text"
              ref={messageRef}
              placeholder="Digite sua mensagem"
              className="flex-1 p-2 rounded-md"
            />
            <button
              onClick={handleSubmit}
              className="p-2 ml-5  rounded-md bg-darkBlueText px-9 text-white "
              disabled={!recipientId}
            >
              Enviar
            </button>
          </div>

          
          <div className="bg-white p-4 rounded-md shadow">
            {messageList.length > 0 ? (
              <div className="space-y-2">
                {messageList.map((message, index) => (
                  <p key={index} className="p-2 rounded-md bg-gray-100">
                    {message.text}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Não há mensagens.</p>
            )}
          </div>
        </div>
      </Page>
    </div>
  );
}
