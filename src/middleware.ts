import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// Create the i18n middleware instance
const i18nMiddleware = createMiddleware(routing);

// Custom middleware to combine i18n with security headers
export default function middleware(request: NextRequest) {
    // Process the request with i18n middleware first
    const response = i18nMiddleware(request);

    // Apply security headers only in production
    if (process.env.NODE_ENV === "production") {
        // HSTS: Enforce HTTPS for 1 year, including subdomains
        response.headers.set(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains; preload"
        );

        // COOP: Isolate the origin to prevent cross-origin attacks
        response.headers.set("Cross-Origin-Opener-Policy", "same-origin");

        // XFO: Prevent clickjacking by disallowing framing
        response.headers.set("X-Frame-Options", "DENY");
    }

    return response;
}

// Export the matcher configuration
export const config = {
    matcher: [
        // Enable a redirect to a matching locale at the root
        "/",
        // Set a cookie to remember the previous locale for all requests with a locale prefix
        "/(ru|en|uz)/:path*",
        // Enable redirects that add missing locales (e.g., `/ru/services/:path*`)
        "/(ru|en|uz)/services/:path*",
        // Exclude Next.js internal routes and static files
        "/((?!_next|_vercel|.*\\..*).*)",
    ],
};