import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // If user is logged in and tries to access /auth/*
    if (pathname.startsWith("/auth") && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow access to auth pages
        if (req.nextUrl.pathname.startsWith("/auth")) {
          return true;
        }
        // token exists = logged in
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: [
    "/", // home
    "/dashboard/:path*", // future dashboard
    "/auth/:path*", // auth pages
  ],
};
