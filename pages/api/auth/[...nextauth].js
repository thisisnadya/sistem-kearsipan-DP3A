import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/conn";
import Users from "@/model/admin";
import { compare } from "bcryptjs";

export const authOptions = {
  pages: {
    signIn: "/pages/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        // Perform custom authentication logic here
        if (
          credentials.username === "admin" &&
          credentials.password === "admin1234"
        ) {
          // If authentication succeeds, return the user object
          return { id: 1, name: "Admin" };
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
