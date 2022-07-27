import { User } from "@supabase/supabase-js"
import { createContext, useState, useEffect, ReactNode } from "react"
import { supabase } from "../utils/supabase"

type AuthContext = {
    user: User | null
}

export const AuthContext = createContext({} as AuthContext)

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(supabase.auth.session()?.user ?? null)

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null)
        })
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}