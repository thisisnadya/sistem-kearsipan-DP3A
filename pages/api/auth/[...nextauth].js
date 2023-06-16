import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/conn";
import Users from "@/model/admin";
import { compare } from "bcryptjs";

export const authOptions = {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? process.env.NEXTAUTH_URL
      : "http://localhost:3000",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      session: {
        strategy: "jwt",
      },
      authorize: async (credentials) => {
        // Perform custom authentication logic here
        if (
          credentials.username === "admin" &&
          credentials.password === "admin1234"
        ) {
          // If authentication succeeds, return the user object
          return { id: 1, name: "Admin" };
        } else {
          // If authentication fails, throw an error
          throw new Error("Invalid credentials");
        }
      },
      callbacks: {
        async session({ session, token }) {
          session.user = token.user;
          return session;
        },
        async jwt({ token, user }) {
          if (user) {
            token.user = user;
          }
          return token;
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
