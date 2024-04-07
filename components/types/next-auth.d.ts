import "next-auth";

declare module "next-auth" {
  /**
   * Extending the built-in session types to include the properties of the User object.
   */
  interface Session {
    user: {
      databaseId: string; // Add your custom properties here
    } & User; // Ensures you keep the original User properties
  }

  /**
   * If you're also manipulating the token object, you can extend its type similarly.
   */
  interface JWT {
    databaseId?: string;
  }
}
