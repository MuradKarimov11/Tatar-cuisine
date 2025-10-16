import { Session } from "next-auth";
import { create } from "zustand";

type SessionStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  isAuth: boolean;
  status: SessionStatus;
  session: Session | null;
  setAuthState: (session: Session | null, status: SessionStatus) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuth: false,
    status: "loading",
    session: null,
    setAuthState: (session: Session | null, status: SessionStatus) =>
      set(() => ({
        session,
        status,
        isAuth: status === "authenticated",
      })),
}))