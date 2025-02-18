"use client";
import { House, LogIn, LogOut, Pencil, ShoppingCart, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-950 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-3xl font-extrabold italic font-serif">
            My Store
          </h1>
        </div>

        <nav>
          <ul className="flex space-x-12">
            <li>
              <Link
                href="/"
                className="hover:text-gray-600 flex flex-row gap-1"
              >
                <House /> Home
              </Link>
            </li>
            {session ? (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-gray-600 flex flex-row gap-1"
                  >
                    <User /> Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className="hover:text-gray-600 flex flex-row gap-1"
                  >
                    <ShoppingCart /> Carrinho
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="hover:text-gray-600 flex flex-row gap-1"
                  >
                    <LogOut /> Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-gray-600 flex flex-row gap-1"
                  >
                    <LogIn />
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/create-account"
                    className="hover:text-gray-600 flex flex-row gap-1"
                  >
                    <Pencil />
                    Criar conta
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
