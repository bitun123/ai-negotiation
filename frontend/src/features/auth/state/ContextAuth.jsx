import { createContext, useState } from "react"



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("")
    const [loading, setloading] = useState(false)
    const [error, setError] = useState("")





    return (
        <div>
            <AuthContext.Provider value={{ user, setUser, loading, setloading, error, setError }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}
