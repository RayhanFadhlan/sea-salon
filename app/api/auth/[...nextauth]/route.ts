import NextAuth from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

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