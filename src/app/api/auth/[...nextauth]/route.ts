import NextAuth, { DefaultSession, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

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

export const authOptions = {
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
              id: "1", // Use um ID real do usuário, se disponível
              jwt: data.accessToken, // Token JWT
              role: data.role, // Role do usuário
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
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.jwt = user.jwt; 
        token.role = user.role; 
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        jwt: token.jwt,
        role: token.role, 
      };
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };