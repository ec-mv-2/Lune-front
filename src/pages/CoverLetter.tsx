import { useState } from "react";
import Button from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page from "@/components/Page";

export function CoverLetterForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      console.log("Título:", title);
      console.log("Conteúdo:", content);
      toast.success("Carta de apresentação enviada com sucesso!");
      setTitle("");
      setContent("");
    } catch (error) {
      toast.error("Erro ao enviar a carta. Tente novamente!");
    }
  };

  return (
    <Page className="flex justify-center">
      <div className="mt-20 max-w-[760px] w-full px-4">
        <div className="text-center">
          <p className="text-darkBlueText text-2xl m-1">Escreva uma carta de apresentação</p>
          <p className="text-gray-600 mb-7">Se apresente! Fale sobre você, seus hobbies, experiências e talentos. Esse passo é opcional, mas te diferencia de outros usuários.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              className="border rounded py-4 px-6"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="border rounded py-4 px-6"
              placeholder="Conteúdo da carta"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div className="justify-center flex">
              <Button type="submit" variant="mediumSizeDark" rightIcon={false} onClick={('clicado')}>Enviar</Button>
            </div>
          </form>
        </div>
        <ToastContainer/>
      </div>
    </Page>
  );
}
