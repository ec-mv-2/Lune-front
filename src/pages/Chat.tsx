import Page from "@/components/Page";
import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useBackendApi } from "@/hooks/useBackendApi";
import { AuthContext } from "@/contexts/AuthContext";

const socket = io("http://localhost:3333"); // Atualize com a URL do servidor.

interface Message {
  user: string | undefined;
  name: String; 
  message: string;
}

interface UserProps {
  _id: string;
  name: string;
  email: string;
}

export function Chat() {
  const backendApi = useBackendApi();
  const auth = useContext(AuthContext);

  const [users, setUsers] = useState<UserProps[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [otherId, setOtherId] = useState("");

  useEffect(() => {
    // Listar usuários
    async function listUsers() {
      const data = await backendApi.listUsers();
      if (data) {
        setUsers(data.users);
      }
    }
    listUsers();

    // Configuração do WebSocket
    socket.on("receiveMessage", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Entrar em uma sala de chat
  useEffect(() => {
    if (otherId) {
      socket.emit("joinChat", { chatId: `${auth.user?._id}-${otherId}` });

      // Carregar mensagens do backend
      async function listMessages() {
        const data = await backendApi.ListMessages(otherId);
        if (data) {
          setMessages(data.messages.map((msg: any) => ({
            ...msg,
            name: users.find((user) => user._id === msg.user)?.name || "Desconhecido",
          })));
        }
      }
      listMessages();
    }
  }, [otherId, users]);

  // Enviar uma nova mensagem
  async function newMessage() {
    if (newMessageText.trim() === "") return;

    const message = {
      user: auth.user?._id,
      name: auth.user?.name || "Você",
      message: newMessageText,
    };

    socket.emit("sendMessage", {
      chatId: `${auth.user?._id}-${otherId}`,
      senderId: auth.user?._id,
      message: newMessageText,
    });

    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessageText("");

    await backendApi.newMessage(newMessageText, otherId);
  }

  return (
    <div className="min-h-screen">
      <Page className="">
        <div className="p-4 pt-20 max-w-lg mx-auto">
          <h1>Escolha um destinatário:</h1>
          <div className="flex flex-col gap-2">
            {users.map((user) => (
              <div
                key={user._id}
                className={`px-3 py-3 rounded cursor-pointer ${
                  otherId === user._id ? "bg-gray-500 text-white" : "bg-white"
                }`}
                onClick={() => setOtherId(user._id)}
              >
                {user.name}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-4">
              <input
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                type="text"
                className="flex-initial w-full py-2 px-3 rounded border border-gray-300"
                placeholder="Digite sua mensagem"
              />
              <button
                onClick={newMessage}
                className="flex-initial px-3 py-2 rounded bg-darkBlueText text-white"
              >
                Enviar
              </button>
            </div>
          </div>

          <div className="bg-white mt-6 rounded p-4 flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.user === auth.user?._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.user === auth.user?._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <p className="text-sm font-semibold">{message.name}</p>
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Page>
    </div>
  );
}

export default Chat;
