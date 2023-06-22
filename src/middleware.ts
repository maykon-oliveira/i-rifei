export { default } from "next-auth/middleware"

// TODO: https://github.com/nextauthjs/next-auth/issues/1582

export const config = { matcher: ["/app/:path*"] }