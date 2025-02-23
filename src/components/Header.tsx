"use client";
import { House, LogIn, LogOut, Pencil, ShoppingCart, User, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-950 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-3xl font-extrabold italic font-serif">
            My Store
          </h1>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <nav className={`md:flex ${isOpen ? "block" : "hidden"} absolute md:static bg-gray-950 w-full md:w-auto top-16 left-0`}>
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 p-4 md:p-0">
            <li>
              <Link
                href="/"
                className="hover:text-gray-600 flex flex-row gap-1"
                onClick={() => setIsOpen(false)}
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
                    onClick={() => setIsOpen(false)}
                  >
                    <User  /> Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className="hover:text-gray-600 flex flex-row gap-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart /> Carrinho
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
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
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn />
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/create-account"
                    className="hover:text-gray-600 flex flex-row gap-1"
                    onClick={() => setIsOpen(false)}
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