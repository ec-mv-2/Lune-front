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

export function Chat() {
  const { user } = useContext(AuthContext); 
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [recipientId, setRecipientId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Novo estado para controlar o carregamento
  const messageRef = useRef<HTMLInputElement>(null);

  const { getUser } = useBackendApi();

  const fetchConversation = async (recipientId: string) => {
    const userId = user?._id; 
  
    if (!userId) {
      toast.error("Usuário não autenticado.");
      return null;
    }
  
    try {
      const response = await fetch(`http://localhost:3333/getConversation/${userId}/${recipientId}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar a conversa: ${response.statusText}. `);
      }
  
      const data = await response.json();
      if (data.conversationId && data.messages) {
        setMessageList(data.messages);
        return data.conversationId;
      }
    } catch (error) {
      console.error("Erro ao buscar a conversa:", error);
      toast.error("Erro ao carregar o histórico de mensagens.");
    }
    return null;
  };

  useEffect(() => {
    if (recipientId) {
      fetchConversation(recipientId);
    }
  }, [recipientId]);
  

  useEffect(() => {
    if (!user?._id) {
      toast.error("Usuário não autenticado.");
      return;
    }
    if (!recipientId) {
      console.log("AQUIIII")
    } else {
      console.log('deu pau aq')
    }

    const fetchUserData = async () => {
      try {
        setLoading(true); 
        const response = await getUser(user._id);
        console.log("Dados do usuário principal:", response.user);
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
        toast.error("Erro ao carregar dados do usuário.");
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();
  }, [user]);

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


  const handleSelectRecipient = (selectedUserId: string) => {
    if (!selectedUserId) {
        toast.error("Selecione um destinatário válido.");
        return;
    }

    if (selectedUserId === user?._id) {
        toast.error("Você não pode enviar uma mensagem para si mesmo.");
        return;
    }

    setRecipientId(selectedUserId);
    fetchConversation(selectedUserId);
};


  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3333/listUsers");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários :", error);
        toast.error("Erro ao buscar usuários.");
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (socket && user?._id) {
      socket.emit("authenticate", user._id);
    }
  }, [socket, user]);

  const handleSubmit = async () => {
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
      

      const conversationId = await fetchConversation(recipientId);
      if (!conversationId) {
        toast.error("Erro ao obter o ID da conversa."); 
        return;
      } 

      if (!user) { 
        toast.error("Usuário não autenticado.");
        return;
      }
      sendMessage(conversationId, user._id, recipientId, message);

      setMessageList((prevMessages) => [
        ...prevMessages,
        { text: `${user?.name || "Eu"}: ${message}` },
      ]);

      messageRef.current.value = "";
      toast.success("Mensagem enviada com sucesso!");
    }
  };

  
  const sendMessage = (conversationId: string, from: string, to: string, text: string) => {
    if (!conversationId || !from || !to || !text) {
      console.error("Dados incompletos. Todos os campos são necessários.");
      return;
    }

    if (socket) {
      socket.emit("message", {
        conversationId,
        from,
        to,
        text
      });
    } else {
      console.error("Socket não está conectado.");
    }
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
                    onClick={() => {
                      console.log(`Selecionado: ${user._id}`);  
                      handleSelectRecipient(user._id);
                      
                    }}
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
              className="p-2 ml-5 rounded-md bg-darkBlueText px-9 text-white"
              disabled={!recipientId || loading}
            >
              {loading ? "Enviando..." : "Enviar"}
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
              <p>Sem mensagens ainda.</p>
            )}
          </div>
        </div>
      </Page>
    </div>
  );
}

export default Chat;
