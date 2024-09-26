import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import Auth from "@auth/core";
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  pages: {
    signIn: "/",
    signOut: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_CLIENTID,
      clientSecret: process.env.NEXT_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
  ],
  trustHost: true,
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  callbacks: {
    async signIn({ account, profile }: any) {
      // console.log("🚀 ~ signIn ~ profile:", profile);
      if (account?.provider === "google") {
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      if (token) {
        const userCreated = await createUser({
          email: token?.email!,
          displayName: token?.name!,
        });
        if (userCreated) {
          token.databaseId = userCreated?.id;
        }
      }

      // }
      return token;
    },
    async session({ session, token }) {
      // Take the custom data from the token and add it to the session object
      session.user.databaseId = token.databaseId; // This adds the user role to the session
      // Add more custom data as needed
      return session;
    },
  },
});

async function createUser(user: { email: string; displayName: string }) {
  if (!user) {
    console.error("User details not found");
    return false;
  }

  const { email, displayName: username } = user;

  try {
    const response = await fetch(
      `${process.env.NEXT_BACKEND_BASE_URL}/ai/user/`,
      {
        method: "POST", // Assuming you're making a POST request
        headers: {
          "Content-Type": "application/json",
          // Include other necessary headers here
        },
        body: JSON.stringify({
          email: email, // Assuming 'email' and 'username' are variables available in your scope
          username: username,
        }),
      }
    );
    const finalData = await response.json();

    // console.log("User created:", finalData?.data);
    // console.log("User created:1", finalData);
    // localStorage?.setItem("userId", finalData?.id);
    // Handle successful user creation, if needed
    return finalData;
  } catch (error) {
    console.error("Error creating user:", error);
    // Handle error
    return null;
  }
}
