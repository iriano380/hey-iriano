import NextLink from "next/link";
import { RiRobot2Line, RiImageAddLine, RiQuestionAnswerLine, RiLightbulbFlashLine } from "remixicon-react";

export const ProjectOverview = ({ onSelect }: { onSelect: (msg: string) => void }) => {
  return (
    <div className="flex flex-col items-center justify-end gap-6">

      {/* TEXTO PRINCIPAL */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-4">Em que posso ajudar?</h1>
        <p className="text-center max-w-md">
          Sou Iriano IA (inteligência artificial criada pela{" "}
          <Link href="https://groq.com/">IrianoCreative</Link> com a{" "}
          <Link href="https://sdk.vercel.ai/docs">WangaChat</Link> em{" "}
          <Link href="https://vercel.com/marketplace/groq">
            Tecnologias de Moçambique
          </Link>
          .
        </p>
      </div>

      {/* SUGESTÕES */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">

        <SuggestionCard
          icon={<RiRobot2Line size={22} />}
          text="Explica-me uma coisa"
          onClick={() => onSelect("Podes explicar-me como funciona a IA?")}
        />

        <SuggestionCard
          icon={<RiImageAddLine size={22} />}
          text="Criar imagem"
          onClick={() => onSelect("Cria uma imagem futurista sobre Moçambique.")}
        />

        <SuggestionCard
          icon={<RiQuestionAnswerLine size={22} />}
          text="Preciso de ajuda rápida"
          onClick={() => onSelect("Preciso de ajuda com algo urgente.")}
        />

        <SuggestionCard
          icon={<RiLightbulbFlashLine size={22} />}
          text="Dá-me uma ideia"
          onClick={() => onSelect("Dá-me uma ideia criativa para um projecto.")}
        />

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

const SuggestionCard = ({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700
                 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};
