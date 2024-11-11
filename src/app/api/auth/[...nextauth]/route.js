import { mongodb } from "@/lib/mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
    secret: process.env.NEXT_PUBLIC_SECRET_KEY,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                if(!email || !password){
                    return null;
                }
                const db = await mongodb();
                const currentUser = await db.collection('users').findOne({email});
                if(!currentUser){
                    return null;
                }
                const passwordMatch = bcrypt.compareSync(password, currentUser.password);
                if(!passwordMatch){
                    return null;
                }
                return currentUser;
            }
        })
    ],
    callbacks: {

    },
    pages: {
        signIn: '/sign-in'
    }
});

export { handler as GET, handler as POST }