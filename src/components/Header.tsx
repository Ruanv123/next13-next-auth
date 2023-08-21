import Link from "next/link";
import { SignOut } from "./SignOut";
import { getServerSession } from "next-auth";

export const Header = async () => {
  const session = await getServerSession();

  return (
    <header className="flex bg-slate-600 px-52 py-5 justify-between items-center">
      <div>
        <Link href="/" className="text-3xl text-white">
          Logo
        </Link>
      </div>
      <ul className="flex justify-between gap-5 text-white font-bold ">
        <li className="hover:text-blue-500">
          <Link href="/login">Login</Link>
        </li>
        <li className="hover:text-blue-500">
          <Link href="/public">Publica</Link>
        </li>
        <li className="hover:text-blue-500">
          <Link href="/private">Privada</Link>
        </li>
        {session && (
          <li className="hover:text-blue-500">
            <SignOut />
          </li>
        )}
      </ul>
    </header>
  );
};
