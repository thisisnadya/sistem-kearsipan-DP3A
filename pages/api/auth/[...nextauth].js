import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/conn";
import Users from "@/model/admin";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      session: {
        strategy: "jwt",
      },
      async authorize(credentials, req) {
        await connectMongo().catch((err) => {
          error: "Connection Failed";
        });

        // check user existance
        const result = await Users.findOne({ username: credentials.username });
        if (!result) {
          throw new Error("No user found");
        }

        // compare password
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        if (!checkPassword) {
          throw new Error("Password not match");
        }
        return result;
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
};

export default NextAuth(authOptions);
