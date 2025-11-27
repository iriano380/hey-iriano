import NextLink from "next/link";

/* Cartões estilo ChatGPT */
const SuggestionCard = ({ text }: { text: string }) => (
  <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer">
    <p className="text-sm text-zinc-800 dark:text-zinc-100">{text}</p>
  </div>
);

/* Link moderno */
const ExternalLink = ({
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

export const ProjectOverview = () => {
  return (
    <div className="flex flex-col items-center justify-end">
      <h1 className="text-3xl font-semibold mb-4">Hiriano AI</h1>

      <p className="text-center text-zinc-600 dark:text-zinc-300 mb-6">
        A tua assistente inteligente, moderna e super-rápida — criada com um
        novo modelo avançado.
      </p>

      {/* SUGESTÕES ESTILO CHATGPT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mt-4">
        <SuggestionCard text="Gerar ideias para o meu novo projecto" />
        <SuggestionCard text="Criar descrições profissionais e criativas" />
        <SuggestionCard text="Aprender algo novo com explicações simples" />
        <SuggestionCard text="Ajudar-me a escrever códigos e corrigir erros" />
      </div>
    </div>
  );
};
