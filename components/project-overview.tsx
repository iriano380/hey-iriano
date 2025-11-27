import NextLink from "next/link";
export const ProjectOverview = () => {
  return (
    <div className="flex flex-col items-center justify-end">
      <h1 className="text-3xl font-semibold mb-4">Em que posso ajudar hoje?</h1>
      <p className="text-center">
        Olá eu sou o "Hey hiriano" o seu assistente pessoal para quase tudo... Fui criado pela <Link href="https://groq.com/">IrianoCreative-Studio</Link>{" "}
        Em Moçambique/Vilanculo siga-me no <Link href="https://sdk.vercel.ai/docs">Facebook</Link> para poder{" "}
        <Link href="https://vercel.com/marketplace/groq">
          Obter mais ajuda
        </Link>
        .
      </p>
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
