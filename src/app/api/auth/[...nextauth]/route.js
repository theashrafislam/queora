import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    secret: process.env.NEXT_PUBLIC_SECRET_KEY,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            credentials: {
                
            }
        })
    ]
});

export {handler as GET, handler as POST}