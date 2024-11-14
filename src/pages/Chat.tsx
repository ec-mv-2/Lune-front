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
interface UserProps {
  _id: string,
  name: string,
  email: String,
  password: String,
  state: string,
  cep: string,
  cpf: string,
  birthDate: string,
  skills: [],
  experience: [],
  academic: [],
  bio: string,
  isContractor: boolean
}

interface chatsProps {
  messages: [{
    user: string,
    message: string
  }] 
}

export function Chat() {
  const backendApi = useBackendApi()
  const [users, setUsers] = useState<UserProps[]>([])
  const [messages, setMessages] = useState<chatsProps>()

  const [newMessageText, setNewMessageText] = useState("")


  const [otherId, setOtherId] = useState("")

  useEffect(()=>{
    async function listUsers(){
      const data = await backendApi.listUsers()
      if(data){
        setUsers(data.users)
      }
    }

    listUsers()

    async function listMessages(){
      
      const data = await backendApi.ListMessages(otherId)
      if(data){
        setMessages(data.messages)
      }
    }

    listMessages()

    console.log(messages)



  }, [users])

  console.log(messages)


  async function createChat(){
    await backendApi.createChat(otherId)
  }
  

  async function newMessage(){
    await backendApi.newMessage(newMessageText, otherId)
  }
  

  const auth = useContext(AuthContext)
  return (
    <div className="min-h-screen">
      <Page className="">
        <div className="p-4 pt-20 max-w-lg mx-auto">
          <h1>Escolha um destinatário:</h1>
          <div className="flex flex-col gap-2">

            {users.map(user =>{
              return(
                <div className={otherId==user._id? `bg-gray-500 px-3 py-3 rounded cursor-pointer` : `bg-white px-3 py-3 rounded cursor-pointer`} onClick={()=>{
                  setOtherId(user._id)
                  }}>
                  {user.name}
                </div>
              )
            })}
            {
              messages?
                <div className=" flex items-center gap-2  ">
                  <input value={newMessageText} onChange={(e)=>{setNewMessageText(e.target.value)}} type="text" className="flex-initial w-[400px] py-2 px-3 rounded" placeholder="Digite sua mensagem"/>
                  <button onClick={()=>newMessage()} className="flex-initial px-3 py-2 rounded bg-darkBlueText text-white">Enviar</button>
                </div>

              :

              <div>
                  <button className="flex-initial px-3 py-2 rounded bg-darkBlueText text-white w-full disabled:bg-slate-500" onClick={()=>createChat()}>Criar chat</button>

              </div>
            }
            
          </div>


          <div className="bg-white min-h-10 mt-24 rounded p-2 flex flex-col gap-5">
            {messages?
                messages.messages.map(message =>{
                  if(message.user == auth.user?._id){
                    return(
                      <p className="text-right">{message.message}</p>

                    )
                  }else{
                    return(
                      <p>{message.message}</p>
                    )
                  }
                  
                })

              :null
            }
          </div>

          

        </div>
      </Page>
    </div>
  );
}

export default Chat;
