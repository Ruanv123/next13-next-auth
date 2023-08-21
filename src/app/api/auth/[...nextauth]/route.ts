import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentiais",
      credentials: {
        email: {
          label: "digite o email!",
          type: "email",
          placeholder: "email",
        },
        password: { label: "password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          email: "admin@admin.com",
          password: "adminadmin",
          name: "caio passos",
          role: "admin",
        };

        const isInvalidEmail = user.email === credentials?.email;
        const isInvalidPassword = user.password === credentials?.password;

        if (!isInvalidEmail || !isInvalidPassword) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const customUser = user as unknown as any;

      if (user) {
        return {
          ...token,
          role: customUser,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
          role: token.role,
        },
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
