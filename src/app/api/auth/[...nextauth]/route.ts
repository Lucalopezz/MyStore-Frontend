import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    jwt: string;
    role: string;
  }

  interface User {
    jwt: string;
    role: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    jwt: string;
    role: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch("http://localhost:3001/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await response.json();

          if (response.ok && data.accessToken) {
            return {
              id: "1",
              jwt: data.accessToken,
              role: data.role, // Armazenando a role do usuário
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
        token.role = user.role; // Armazenando a role no token
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        jwt: token.jwt,
        role: token.role, // Incluindo a role na sessão
      };
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
});

export { handler as GET, handler as POST };