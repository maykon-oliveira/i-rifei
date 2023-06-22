import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { OAuth2Client } from "google-auth-library";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    // TODO: https://github.com/nextauthjs/next-auth/issues/1582
    // CredentialsProvider({
    //   id: "googleonetap",
    //   name: "Google One Tap",
    //   credentials: {
    //     credential: {
    //       type: 'text'
    //     },
    //   },
    //   async authorize(credentials, req) {
    //     const idToken = credentials!.credential;

    //     const ticket = await oauth2Client.verifyIdToken({
    //       idToken,
    //       audience: process.env.GOOGLE_CLIENT_ID as string,
    //     });

    //     const payload = ticket.getPayload();

    //     if (!payload) {
    //       throw new Error("Cannot extract payload from signin token");
    //     }

    //     const { email, sub, given_name, family_name, email_verified, picture: image } = payload;
    //     if (!email) {
    //       throw new Error("Email not available");
    //     }

    //     let user = await prisma.user.findUnique({
    //       where: {
    //         email: email
    //       }
    //     });

    //     if (!user) {
    //       user = await prisma.user.create({
    //         data: {
    //           name: [given_name, family_name].join(" "),
    //           email: email,
    //           image: image as string | '',
    //           emailVerified: email_verified ? new Date() : null,
    //         }
    //       });
    //     }

    //     const account = await prisma.account.findUnique({
    //       where: {
    //         provider_providerAccountId: {
    //           provider: "google",
    //           providerAccountId: sub
    //         }
    //       }
    //     });

    //     if (!account && user) {
    //       await prisma.account.create({
    //         data: {
    //           userId: user.id,
    //           provider: "google",
    //           providerAccountId: sub,
    //           type: "credentials",
    //         }
    //       });
    //     }

    //     return user;
    //   },
    // }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 3000
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
