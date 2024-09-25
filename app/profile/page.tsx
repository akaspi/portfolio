
import { auth, signIn, signOut } from "@/auth"

export default async function SignIn() {
    const session = await auth();
    const user = session?.user;

    if (user) {
        return (
            <div>
                <p>Hi, {user.name}!</p>
                <form
                    action={async () => {
                        "use server"
                        await signOut()
                    }}
                    >
                    <button type="submit">Sign Out</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <p>Not signed in</p>
            <form
                action={async () => {
                    "use server"
                    await signIn('google')
                }}
                >
                <button type="submit">Signin with Google</button>
            </form>
        </div>
    )
}