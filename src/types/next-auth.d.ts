import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    jwt: string;
  }

  interface Session {
    jwt: string;

    user: {
      jwt: string;

    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    jwt: string;
  }
}