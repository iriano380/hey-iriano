import Link from "next/link";

export const DeployButton = () => (
  <Link
    href={`https://hey-iriano.vercel.app`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 ml-2 text-white text-sm px-3 py-1.5 rounded-md transition-colors duration-200 hover:bg-zinc-900"
    style={{ backgroundColor: "#212832" }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="w-4 h-4"
    >
      <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" />
    </svg>
    Novo chat
  </Link>
);
