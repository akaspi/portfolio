import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { connectDB } from "./lib/connect";
import User from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [Google],
    callbacks: {
        async session({ session }) {
            return session;
        },
        async signIn({ user }) {
            try {
                await connectDB();

                const userExists = await User.findOne({ email: user.email });

                if (!userExists) {
                    const newUser = new User({
                        email: user.email
                    });

                    await newUser.save();
                }

                return true;
            }
            catch (error) {
                console.log('Error signing in:', error);
                return false;
            }
        }
    }
});