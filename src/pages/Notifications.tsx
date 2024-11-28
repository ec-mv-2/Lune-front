import Page from "@/components/Page"; 
import { useState, useEffect, useContext } from "react";
import { useBackendApi } from "../hooks/useBackendApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "@/contexts/AuthContext";

interface User {
  _id: string;
  name: string;
}

interface Notification {
  _id: string;
  message: string;
  createdAt: string;
}

const api = useBackendApi();

export function Notifications() {
  const [users, setUsers] = useState<User[]>([]);
  const [receiverIds, setReceiverIds] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.listUsers();
        console.log("Resposta da API:", response);
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

  useEffect(() => {
    if (!user) {
      console.warn("Usuário não está definido.");
      return;
    }

    const fetchNotifications = async () => {
      try {
        setLoadingNotifications(true);
        const response = await api.getNotifications(user._id);

        if (response?.notifications?.notifications && Array.isArray(response.notifications.notifications)) {
          console.log("Notificações recebidas:", response.notifications.notifications);
          setNotifications(response.notifications.notifications);
        } else {
          console.warn("Resposta da API não contém notificações esperadas:", response);
          setNotifications([]);
        }
      } catch (error: any) {
        console.error("Erro ao buscar notificações:", error);
        toast.error(`Erro ao carregar notificações: ${error.message || 'Erro desconhecido.'}`);
      } finally {
        setLoadingNotifications(false);
      }
    };

    fetchNotifications(); 
    const interval = setInterval(fetchNotifications, 4000); 

    return () => clearInterval(interval); 
  }, [user]);

  const handleCheckboxChange = (userId: string) => {
    setReceiverIds((prev) => {
      const newIds = prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId];

      if (!prev.includes(userId)) {
        
      }
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

  if (!user) {
    return (
      <Page className="flex justify-center items-center">
        <p className="text-center text-red-600">Usuário não autenticado.</p>
      </Page>
    );
  }

  return (
    <Page className="flex flex-col justify-center items-center">
      {user.isADM && (
        <div className="p-6 mt-20 bg-whiteLight border rounded-md w-full max-w-xl">
          <h1 className="text-2xl text-darkBlueText mb-4 text-center">Enviar Notificação</h1>
          <textarea
            className="w-full border rounded-md mb-4 px-6 py-4"
            placeholder="Digite a notificação"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {loading ? (
            <p className="text-center text-gray-500">Carregando usuários...</p>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <label key={user._id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 text-darkBlueText"
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
            className="mt-4 w-full bg-darkBlueText opacity-90 text-white py-2 px-4 rounded-md hover:opacity-100 hover:bg-darkBlueText transition disabled:bg-gray-400"
          >
            {loading ? "Enviando..." : "Enviar Notificação"}
          </button>
        </div>
      )}

      <div className="p-6 bg-whiteLight border rounded-md w-full max-w-xl my-8">
        <h2 className="text-xl text-darkBlueText mb-1 text-center">Notificações Recebidas</h2>
        <p className="text-center mb-6 text-sm text-gray-600 break-words">Visualize todas as notificações que você recebeu</p>
        {loadingNotifications ? (
          <p className="text-center text-gray-500">Carregando notificações...</p>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div key={notification._id} className="border border-gray-400 p-4 rounded-md mb-2">
                <p className="text-darkBlueText">{notification.message}</p>
                <p className="text-sm text-gray-500">Recebido em: {new Date(notification.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </Page>
  );
}
