import { signIn } from "@/auth/auth";

export async function signInWithCredentials(email: string, password: string) {

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        return;
        
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
    
}