import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/conn";
import Users from "@/model/admin";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((err) => {
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
    }),
  ],
};

export default NextAuth(authOptions);
