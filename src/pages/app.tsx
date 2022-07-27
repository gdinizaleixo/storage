import Router from "next/router"
import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"

export default function App() {
    const { user } = useAuth()

    useEffect(() => {
        if (!user) {
            Router.push("/")
        }
    }, [user])

    return (
        <h1>Logado</h1>
    )
}