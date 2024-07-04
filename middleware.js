import { NextResponse, NextRequest } from "next/server";
import isAuthenticated from "./auth/isauthenticated.js";

const middleware1 = async (request) => {
    console.log("middleware1=>", request.nextUrl.pathname);
    return NextResponse.next();
};

export async function middleware(request) {
    const path = request.nextUrl.pathname;
    console.log('---',path);
    const token = request.cookies.get("token")?.value;
    const isPublicPath = path === "/login" || path === "/signup";
    // const isPublicApiPath = path == "/api/users/login" || path == "/api/users/signup";

    // Authenticate API calls

    if (
        !isPublicPath &&
        path.startsWith("/api/") &&
        !path.endsWith("login") &&
        !path.endsWith("signup") &&
        !path.endsWith("auth")
    ) {
        const isAuth = await isAuthenticated(request);  
        if (!isAuth) {
            // Respond with JSON indicating an error message
            return Response.json({ success: false, message: "authentication failed" }, { status: 401 });
        }
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-_id", isAuth);
        const response = NextResponse.next({
            request: {
                // New request headers
                headers: requestHeaders,
            },
        });
        return response;
    }

    // // Authenticate non-API calls
    if (!path.startsWith("/api/")) {
        
        console.log('path1', path)
        if (isPublicPath && token) {
            console.log('path2', path)
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }
        
        if (!isPublicPath && !token && token !== "") {
            console.log('path3', path)
            return NextResponse.redirect(new URL("/login", request.nextUrl));
        }
    }

    // await middleware1(request)
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/login", "/signup", "/messages","/notifications", "/explore", "/profile", "/api/:path*"],
};
