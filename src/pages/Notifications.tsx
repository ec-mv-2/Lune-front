import Page from "@/components/Page";
import { useState, useEffect } from "react";
import { useBackendApi } from "../hooks/useBackendApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

interface User {
  _id: string;
  name: string;
}

const api = useBackendApi();

export function Notifications() {
  const [users, setUsers] = useState<User[]>([]);
  const [receiverIds, setReceiverIds] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.listUsers();
        console.log("Resposta da API:", response);
        console.log("Usuários:", response.users);

        response.users?.forEach((user: User) => {
          console.log("User dentro do forEach:", user);
          console.log("User ID:", user._id);
        });

        setUsers(response.users || []);

        if (response.users) {
          setReceiverIds(response.users.map((user: User) => user._id));
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast.error("Erro ao carregar a lista de usuários.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [api]);

  const handleCheckboxChange = (userId: string) => {
    console.log("Antes de alterar, receiverIds:", receiverIds);
    setReceiverIds((prev) => {
      const newIds = prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId];

      if (!prev.includes(userId)) {
        setMessage("");
      }

      console.log("Depois de alterar, receiverIds:", newIds);
      return newIds;
    });
  };

  const createNotification = async () => {
    if (!message) {
      toast.error("A mensagem não pode estar vazia.");
      return;
    }
    if (!receiverIds.length) {
      toast.error("Selecione pelo menos um usuário.");
      return;
    }

    try {
      await api.createNotification(message, receiverIds);
      toast.success("Notificação enviada com sucesso!");
      setMessage("");
      setReceiverIds([]); 
    } catch (error) {
      console.error("Erro ao enviar notificação:", error);
      toast.error("Erro ao enviar a notificação.");
    }
  };

  return (
    <Page className=" flex justify-center items-center">
      <div className="p-6 bg-whiteLight border rounded  w-full max-w-xl">
        <h1 className="text-2xl text-darkBlueText mb-4 text-center">Enviar Notificação</h1>
        <textarea
          className="w-full border rounded mb-4 px-6 py-4"
          placeholder="Digite a notificação"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {loading ? (
          <p className="text-center text-gray-500">Carregando usuários...</p>
        ) : (
          <div className="space-y-2 ">
            {users.map((user) => (
              <label key={user._id} className="flex items-center ">
                <input
                  type="checkbox"
                  className="mr-2  text-darkBlueText"
                  value={user._id}
                  checked={receiverIds.includes(user._id)}
                  onChange={() => handleCheckboxChange(user._id)}
                />
                {user.name}
              </label>
            ))}
          </div>
        )}
        <button
          onClick={createNotification}
          disabled={loading || !message.trim()}
          className="mt-4 w-full bg-darkBlueText opacity-90 text-white py-2 px-4 rounded hover:opacity-100 hover:bg-darkBlueText transition disabled:bg-gray-400"
        >
          {loading ? "Enviando..." : "Enviar Notificação"}
        </button>
      </div>
      <ToastContainer />
    </Page>
  );
}
