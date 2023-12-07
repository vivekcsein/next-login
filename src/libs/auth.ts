import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db"
import { compare } from "bcrypt-ts";
// import GoogleProvider from "next-auth/providers/google";
// import ldap from "ldapjs";
// const ldap = require("ldapjs");

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/signin",
        // signOut: "/signout",
        // error: "/error"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                let existingUser = await db.user.findUnique({
                    where: { email: credentials.email },
                    // where: {
                    //     OR: [
                    //         { username: credentials.username },
                    //         { email: credentials.email }
                    //     ]
                    // }
                })
                if (!existingUser) {
                    return null;
                }

                if (existingUser) {
                    const passwordMatch = await compare(credentials.password, existingUser.password);
                    if (!passwordMatch) {
                        throw new Error('Incorrect Password');
                    } else {
                        console.log(`${credentials.email} has now signedIN`);
                    }
                }

                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email,
                    role: existingUser.role,
                }
            }
        }),
        // CredentialsProvider({
        //     name: "LDAP",
        //     credentials: {
        //         username: { label: "DN", type: "text", placeholder: "" },
        //         password: { label: "Password", type: "password" },
        //     },
        //     async authorize(credentials, req) {
        //         // You might want to pull this call out so we're not making a new LDAP client on every login attemp
        //         const client = ldap.createClient({
        //             url: process.env.LDAP_URI,
        //         })

        //         // Essentially promisify the LDAPJS client.bind function
        //         return new Promise((resolve, reject) => {
        //             client.bind(credentials?.username, credentials?.password, (error: any) => {
        //                 if (error) {
        //                     console.error("Failed")
        //                     reject()
        //                 } else {
        //                     console.log("Logged in")
        //                     resolve({
        //                         username: credentials?.username,
        //                         password: credentials?.password,
        //                     })
        //                 }
        //             })
        //         })
        //     },
        // }),

    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    // accessTokenExpiresIn: 60 * 60 * 24 * 7,
                    // refreshTokenExpiresIn: 60 * 60 * 24 * 30,
                    // expiresIn: "1d",
                    sub: user.id,
                    username: user.username,
                    role: user.role,
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username,
                    role: token.role
                }
            }
        },
    }
}