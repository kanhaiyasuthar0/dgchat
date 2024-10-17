import { auth } from "./auth";
export default auth((req) => {
  //   console.log("🚀 ~ auth ~ req:", req);
  // req.auth

  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  // uncomment below logic if auth is required and page protection is required
  // if (pathname == "/chat" && !isLoggedIn) {
  //   return Response.redirect(new URL("/", nextUrl));
  // }
  if (pathname == "/") {
    return Response.redirect(new URL("/chat", nextUrl));
  }
});
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
