import { mongodb } from "@/lib/mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { generateFromEmail } from "unique-username-generator";

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
                if (!email || !password) {
                    return null;
                }
                const db = await mongodb();
                const currentUser = await db.collection('users').findOne({ email });
                if (!currentUser) {
                    return null;
                }
                const passwordMatch = bcrypt.compareSync(password, currentUser.password);
                if (!passwordMatch) {
                    return null;
                }
                return currentUser;
            }
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'google' || account.provider === 'github') {
                const { name, email, image } = user;
                const username = generateFromEmail(
                    email,
                    3
                );
                const formattedDate = new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                }).format(new Date());
                const saveUser = {
                    full_name: name,
                    user_name: username,
                    email,
                    image_url: image,
                    created_at: formattedDate
                };
                try {
                    const db = await mongodb();
                    const userCollection = await db.collection('users');
                    const userEmailExist = await userCollection.findOne({ email });
                    const userNameExist = await userCollection.findOne({ user_name: username });
                    if (userEmailExist && userNameExist) {
                        console.log('Hello, i am ok here both');
                    } else if (userNameExist) {
                        console.log("hello i am ok here  username");
                    } else if (userEmailExist) {
                        console.log('hello i am ok here email');
                    } else {
                        const username = generateFromEmail(
                            email,
                            3
                        );
                        const res = await userCollection.insertOne(saveUser);
                        return user;
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            return user
        },
        
        async session({ session, token }) {
            session.user = {
                email: token.email,
                full_name: token.full_name,
                image_url: token.image_url,
                user_name: token.user_name,
            };
            return session;
        },
    },
    pages: {
        signIn: '/sign-in'
    }
});

export { handler as GET, handler as POST }