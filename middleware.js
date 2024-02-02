import { NextResponse, NextRequest } from "next/server";
import isAuthenticated from "./auth/isauthenticated.js";

const middleware1 = async (request) => {
    console.log("middleware1=>", request.nextUrl.pathname);

    return NextResponse.next();
};

export async function middleware(request) {
    // const requestHeaders = new Headers(request.headers);
    // requestHeaders.set("x-test", "hello");
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";
    const isPublicPath = path === "/login" || path === "/signup";

    // Authenticate API calls
    if (!isPublicPath && path.startsWith("/api/")) {
        const isAuth = await isAuthenticated(request);
        if (!isAuth) {
            // Respond with JSON indicating an error message
            return Response.json({ success: false, message: "authentication failed" }, { status: 401 });
        }
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-_id", isAuth._id);
        const response = NextResponse.next({
            request: {
                // New request headers
                headers: requestHeaders,
            },
        });
        return response
    }

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    // await middleware1(request)
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/login", "/signup", "/explore", "/profile", "/api/post/add"],
};
