"use client";

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex items-center space-x-2">
          <span>&copy; {new Date().getFullYear()} Lucas Dalossa Lopes</span>
        </div>

        <div className="flex space-x-4 mt-4">
          <a href="#" aria-label="Facebook">
            <Facebook className="w-6 h-6 hover:text-gray-600 transition-colors duration-300" />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter className="w-6 h-6 hover:text-gray-600 transition-colors duration-300" />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram className="w-6 h-6 hover:text-gray-600 transition-colors duration-300" />
          </a>
        </div>
      </div>
    </footer>
  );
}