import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // If user is logged in and tries to access /auth/*
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // token exists = logged in
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",                // home
    "/dashboard/:path*",// future dashboard
    "/auth/:path*",     // auth pages
  ],
};