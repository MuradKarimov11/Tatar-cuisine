import { signOut } from "@/auth/auth";

export async function signOutFunc() {
    try {
        const result = await signOut({ redirect: false });
        console.log("Sign-out successful:", result);
        return result;
    } catch (error) {
        console.error("Error signing out:", error);
        throw error;
    }
}