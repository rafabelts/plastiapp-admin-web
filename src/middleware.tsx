import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get("session");
    const isSessionActive = sessionCookie?.value === "true";
    const path = req.nextUrl.pathname;

    // if session inactive and not in auth, move to auth
    if (!isSessionActive && path !== "/auth") {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    // if session active and in /auth, redirect  to home
    if (isSessionActive && path === "/auth") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|images|assets|logo|public|api).*)",
    ],
};
