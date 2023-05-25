/* eslint-disable new-cap */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { API } from "@configs";

export type sessionType = {
  accessToken: string;
  user?: object;
  expires: string;
};
export default NextAuth({
  secret: process.env.NEXT_CREDENTIALS_CLIENT_SECRET,
  session: {
    maxAge: 60 * 60 * 2,
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      authorize: async (credentials: any, req) => {
        const res = await new API()
          .post("oauth/token")
          .payload({
            username: credentials.username,
            password: credentials.password,
            grant_type: "password",
            client_id: process.env.NEXT_CREDENTIALS_CLIENT_ID,
            client_secret: process.env.NEXT_CREDENTIALS_CLIENT_SECRET,
          })
          .fetch();
        const {data: auth, error} = res;
        if (auth && !!auth.response && auth.response?.status !== 200) {
          throw new Error(auth.response.data.message);
        }
        console.log(error)
        if (auth) {
          const user = await new API(auth.access_token).get("v1-mobile/globals/initial").fetch();
          console.log(user, "USERRRR")
          return {
            ...auth,
            token: auth.access_token,
            user: user.user,
            // token: user.data.token,
            // email: user.data.email,
            // is_admin: user.data.is_admin,
          };
        }
        
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(user, "gettoken");
      if (user) {
        console.log(user, "gettoken");
        const newToken: any = {};
        newToken.accessToken = user.access_token;
        return newToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ user, account }) {
      if (user) return true;

      return false;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },
});
