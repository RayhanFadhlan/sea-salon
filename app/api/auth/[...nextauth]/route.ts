import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        console.log(user?.email);
        console.log(user?.password);
        console.log(credentials?.password);
        if (!user) {
          console.log("User not found");
          return null;
        }

        const isMatch = await bcrypt.compare(
          credentials?.password as string,
          user.password,
        );
        if (!isMatch) {
          return null;
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        //@ts-ignore
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.name = token.name;
      session.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  pages: {
    signIn: "/signin",
  },
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    role: string;
  }
}

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    name: string;
    phone: string;
    password: string;
    role: string;
  }
  interface Session {
    id: number;
    name: string;
    role: string;
  }
}