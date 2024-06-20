import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { postLogin } from "@/services/Auth/index";
declare module "next-auth" {
  interface Session {
    user: {
      id: any;
      name: string;
      email: string;
      token: string;
      token_type: string;
      expires_in: number;
    };
    token: any;
  }

  interface JWT {
    id: string;
    token?: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    token?: string;
    token_type: string;
    expires_in: number;
  }
}

interface CredentialsType {
  username: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { username, password } = credentials as CredentialsType;

          const { data } = await postLogin({
            username: username,
            password: password,
          });
          console.log("RESPONSE API >>", data);

          if (!data.status) throw new Error(data.message[0]);
          // If login is successful, return a user object
          const user = {
            id: "1",
            name: "Admin",
            email: "admin@admin.com",
          };

          // You can also return additional properties like tokens
          const token = {
            token: data.access_token,
            token_type: data.token_type,
            expires_in: data.expires_in,
          };

          return { ...user, ...token };
        } catch (error) {
          console.log(error);

          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  jwt: {
    maxAge: 60480, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add access_token to the token right after signin
      console.log("JWT CALLBACK >>", token, user);
      
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("SESSION CALLBACK >>", session, token);
      
      if (token && token.accessToken) {
        session.token = token.accessToken;
      }
      return session;
    },
  },
};

export default authOptions;