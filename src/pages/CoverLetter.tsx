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
    <Page className="">
    <div className="border rounded-md p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          className="border rounded p-2"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border rounded p-2"
          placeholder="Conteúdo da carta"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Button type="submit" variant="strongBlue" onClick={('')}>Enviar</Button>
      </form>
    </div>
    <ToastContainer/>
    </Page>
  );
}
