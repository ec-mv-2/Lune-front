import Page from "@/components/Page";
import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useBackendApi } from "@/hooks/useBackendApi";
import { AuthContext } from "@/contexts/AuthContext";
import img from "../assets/unnamed.png"


const socket = io("http://localhost:3333");

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

  const [reseter, setReseter] = useState(Number);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [otherId, setOtherId] = useState("");

  setTimeout(() => { setReseter(reseter + 1) }, 1000);

  useEffect(() => {
    async function listUsers() {
      const data = await backendApi.listUsers();
      if (data) {
        setUsers(data.users);
      }
    }
    listUsers();

    socket.on("receiveMessage", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    if (otherId) {
      socket.emit("joinChat", { chatId: `${auth.user?._id}-${otherId}` });

      async function listMessages() {
        const data = await backendApi.ListMessages(otherId);
        if (data) {
          setMessages(data.messages.messages);
        }
      }
      listMessages();
    }
  }, [otherId, users, reseter]);

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

  async function createChat() {
    await backendApi.createChat(otherId);
  }

  return (
    <div className="min-h-screen">
      <Page className="">
        <div className="flex flex-col items-center mt-16">
          <span className="text-2xl text-darkBlueText">Suas conversas</span>
          <span className="text-gray-600">Converse com recrutadores e freelancers. Lembre-se de manter o Lune um espaço seguro.</span>
        </div>

        <div className="mx-10">
          <div className="p-4 pt-20 max-w-7xl min-w-max mx-auto flex gap-14">
            <div className="w-1/3 flex flex-col gap-2">
              {users.map((user) => (
                <div
                  key={user._id}
                  className={`px-8 py-6 rounded cursor-pointer transition duration-200 ease-in-out ${
                    otherId === user._id ? "bg-darkBlueText text-white" : "bg-gray-100 hover:bg-gray-100"
                  }`}
                  onClick={() => setOtherId(user._id)}
                >
                  {user.name}
                </div>
              ))}
              <button
                onClick={() => createChat()}
                className="bg-mainBeige opacity-90 mt-4 py-2 px-4 rounded text-white transition duration-200 ease-in-out hover:opacity-100"
              >
                Iniciar conversa
              </button>
            </div>

            <div className="w-2/3 flex flex-col">
              {otherId === "" ? (
                <div className="flex justify-center items-center h-full">
                  <span className="text-gray-500">Selecione um usuário para iniciar a conversa</span>
                </div>
              ) : (
                <div className="transition-opacity duration-300 ease-in-out opacity-100">
                   
                  <div className="bg-gray-100 min-w-full max-w-[400px] rounded flex flex-col gap-4 overflow-y-auto  pb-7">
                  <div className=" bg-gray-200 w-full py-5 px-9 max-w-full break-words">
                  {users.map((user) => (
                    user._id === otherId && (
                      <div key={user._id} className="text-lg text-darkBlueText flex flex-row items-center">
                      <img className="h-14 rounded-full object-cover border-2 border-grey" src={img} />
                      <span className="font-bold ml-3">{user.name}</span>
                    </div>
                    )
                  ))}
                </div>
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.user === auth.user?._id ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                           className={`py-5 px-4 mx-3 rounded-lg ${
                            message.user === auth.user?._id
                              ? "bg-darkBlueText text-white"
                              : "bg-gray-200 text-darkBlueText"
                          }`}
                        >
                          <p className="text-sm font-semibold mb-1 max-w-12 break-words">
                            {message.user === auth.user?._id ? "Você" : message.name}
                          </p>
                          <p className="max-w-md break-words">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 mb-4">
                    <input
                      value={newMessageText}
                      onChange={(e) => setNewMessageText(e.target.value)}
                      type="text"
                      className="flex-initial w-full py-2 px-4 rounded border border-gray-300 bg-gray-100  transition duration-200 ease-in-out focus:border-darkBlueText "
                      placeholder="Digite sua mensagem"
                    />
                    <button
                      onClick={newMessage}
                      className="flex-initial rounded bg-opacity-90 bg-darkBlueText text-white transition duration-200 ease-in-out hover:bg-darkBlueHover hover:bg-opacity-100 py-2 px-4"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Page>
    </div>
  );
}

export default Chat;
