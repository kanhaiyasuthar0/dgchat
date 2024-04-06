import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_CLIENTID,
      clientSecret: process.env.NEXT_CLIENT_SECRET,
    }),
  ],
  trustHost: true,
});
