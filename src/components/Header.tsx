"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-950 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-3xl font-extrabold italic font-serif">
            My Store
          </h1>
        </div>


        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link href="/logout" className="hover:underline">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
