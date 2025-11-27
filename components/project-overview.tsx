import NextLink from "next/link";

export const ProjectOverview = () => {
  const suggestions = [
    "Cria uma imagem futurista do Hiriano",
    "Explica-me como funciona a IA Groq",
    "Dá-me ideias para melhorar o meu chatbot",
    "Escreve um texto profissional para o meu site"
  ];

  // função dispara pergunta como o ChatGPT
  const sendSuggestion = (text: string) => {
    window.dispatchEvent(
      new CustomEvent("ai-chat-input", { detail: { text } })
    );
  };

  return (
    <div className="flex flex-col items-center justify-end">
      <h1 className="text-3xl font-semibold mb-4">Em que posso ajudar?</h1>

      <p className="text-center max-w-md">
        Sou Iriano IA (inteligência artificial criada pela{" "}
        <Link href="https://groq.com/">IrianoCreative</Link>{" "}
        com a <Link href="https://sdk.vercel.ai/docs">WangaChat</Link> em{" "}
        <Link href="https://vercel.com/marketplace/groq">
          Tecnologias de Moçambique
        </Link>
        .
      </p>

      {/* SUGESTÕES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 w-full max-w-md">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => sendSuggestion(s)}
            className="p-3 border border-zinc-300 dark:border-zinc-700 rounded-xl 
                       text-sm text-zinc-700 dark:text-zinc-200 
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

const Link = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <NextLink
      target="_blank"
      className="text-blue-500 hover:text-blue-600 transition-colors duration-75"
      href={href}
    >
      {children}
    </NextLink>
  );
};
