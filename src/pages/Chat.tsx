import Page from "@/components/Page";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBackendApi } from "@/hooks/useBackendApi";

// Tipagem das mensagens
interface Message {
    text: string;
}

interface User {
    _id: string;
    userId: string;
    name: string;
}

export function Chat({ userId }: { userId: string }) {
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [recipientId, setRecipientId] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const messageRef = useRef<HTMLInputElement>(null);

    const { getUser } = useBackendApi();

    // Carregar dados do usuário
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

    // Conectar ao Socket e escutar mensagens
    useEffect(() => {
        const socketConnection = io("http://localhost:3333");

        setSocket(socketConnection);

        console.log("Conexão estabelecida com o servidor socket:", socketConnection.id);

        // Escutando as mensagens recebidas
        socketConnection.on("receiveMessage", (data: { from: string, message: string }) => {
            console.log("Mensagem recebida:", data); // Verificar os dados recebidos

            // Verifica se a mensagem é para o destinatário atual ou para o usuário
            if (recipientId) {
                setMessageList((prevMessages) => [
                    ...prevMessages,
                    { text: `${data.from}: ${data.message}` },
                ]);
            }
        });

        // Handle de erro de conexão
        socketConnection.on("connect_error", (err: Error) => {
            toast.error(`Erro de conexão: ${err.message}`);
            console.error("Erro de conexão:", err);
        });

        return () => {
            socketConnection.off("receiveMessage");
        };
    }, [recipientId]); // Adicionado recipientId como dependência para garantir que as mensagens sejam filtradas corretamente

    // Carregar lista de usuários
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:3333/listUsers');
                const data = await response.json();
                console.log("Usuários recebidos:", data);
                setUsers(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                toast.error("Erro ao buscar usuários.");
            }
        }
        fetchUsers();
    }, []);

    // Autenticar no socket
    useEffect(() => {
        if (socket) {
            socket.emit("authenticate", userId);
            console.log(`Usuário ${userId} autenticado no servidor socket`);
        }
    }, [socket, userId]);

    // Enviar mensagem
    const handleSubmit = () => {
        if (!recipientId) {
            toast.error("Selecione um destinatário antes de enviar.");
            console.log("Erro: Nenhum destinatário selecionado.");
            return;
        }

        if (messageRef.current && socket && recipientId) {
            const message = messageRef.current.value.trim();
            if (!message) {
                toast.error("A mensagem está vazia.");
                console.log("Erro: A mensagem está vazia.");
                return;
            }

            // Enviar mensagem via socket
            socket.emit("message", {
                from: userId,
                to: recipientId,
                message: message,
            });

            messageRef.current.value = ''; // Limpa o campo de mensagem
            toast.success("Mensagem enviada com sucesso!");
        }
    };

    // Selecionar destinatário
    const handleSelectRecipient = (userId: string) => {
        console.log(`Destinatário clicado: ${userId}`);
        setRecipientId(userId);
    };

    return (
        <div className="min-h-screen">
            <Page className="bg-grey">
                <div className="p-4">
                    {/* Lista de usuários */}
                    <div className="mb-4">
                        <h2>Escolha um destinatário:</h2>
                        <ul>
                            {users.map((user) => (
                                <li key={user._id}>
                                    <button
                                        onClick={() => handleSelectRecipient(user._id)}
                                        className={`text-blue-500 ${recipientId === user._id ? "font-bold" : ""}`}
                                    >
                                        {user.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {recipientId && (
                        <div>
                            <h3>Enviando para: {users.find((user) => user._id === recipientId)?.name}</h3>
                        </div>
                    )}

                    <div>
                        <input
                            type="text"
                            ref={messageRef}
                            placeholder="Digite sua mensagem"
                            className="p-2 border rounded"
                        />
                        <button
                            onClick={handleSubmit}
                            className="ml-2 p-2 bg-darkBlueText text-whiteLight rounded"
                            disabled={!recipientId}
                        >
                            Enviar
                        </button>
                    </div>

                    {/* Exibe a lista de mensagens */}
                    <div className="mt-4">
                        {messageList.length > 0 ? (
                            messageList.map((message, index) => (
                                <p key={index}>{message.text}</p>
                            ))
                        ) : (
                            <p>Não há mensagens.</p>
                        )}
                    </div>
                </div>
            </Page>
        </div>
    );
}
