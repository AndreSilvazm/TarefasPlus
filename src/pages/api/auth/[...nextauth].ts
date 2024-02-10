import NextAuth from "next-auth/next";

import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {

    providers: [
        GoogleProvider({

            clientId: process.env.GOOGLE_CLIENTE_ID as string,
            clientSecret: process.env.GOOGLE_CLIENTE_SECRET as string
        }),

        
    ],
    secret: process.env.JWT_SECRET as string,
}

export default NextAuth(authOptions)