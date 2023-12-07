import { db } from "./db"
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from 'next-auth/providers/google';

const getGoogleCredentials = () => {
    const GOOGLE_clientId: string | undefined = process.env.GOOGLE_CLIENT_ID;
    const GOOGLE_ClientSecret: string | undefined = process.env.GOOGLE_SECRET;
    if (!GOOGLE_clientId || !GOOGLE_ClientSecret) throw new Error("Missing Google credentials");
    if (!GOOGLE_clientId || GOOGLE_clientId.length === 0) {
        throw new Error("Missing Google ClientId");
    }
    if (!GOOGLE_ClientSecret || GOOGLE_ClientSecret.length === 0) {
        throw new Error("Missing Google Client secret");
    }
    return { clientId: GOOGLE_clientId, clientSecret: GOOGLE_ClientSecret };
}

export const authOptionsGoogle: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: "/signin",
        error: "/signin-error",
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        }),
    ],
    callbacks: {
        async session({ token, session }) {
            // @ts-ignore
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.role = token.role
                session.user.image = token.picture
            }
            return session
        },
        async jwt({ token, account, user }) {
            const dbUser = await db.user.findFirst({
                where: { email: token?.email ?? "" }
            })
            if (!dbUser) {
                token.id = user!.id
                return token
            }
            return {
                id: dbUser.id,
                email: dbUser.email,
                role: dbUser.role,
                // name: dbUser.name,
                // picture: dbUser.image,
            }
            // if (account && user) {
            //     return {
            //         ...token,
            //         id: user.id,
            //         name: user.name,
            //         role: user.role,
            //         image: user.image,
            //         email: user.email,
            //     }
            // } else if (dbUser) {
            //     return {
            //         ...token,
            //         id: dbUser.id,
            //         role: dbUser.role,
            //         email: dbUser.email,
            //     };
            // }
            // throw new Error("No User Found")
        },
    }

}