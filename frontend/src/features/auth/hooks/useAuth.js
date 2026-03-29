import { login,register } from "../api/auth.api"
import { useContext } from "react"
import { AuthContext } from "../state/ContextAuth"

export const useAuth = ()=>{
 const { user, setUser, loading, setloading, error, setError }=    useContext(AuthContext)

 const handleLogin = async (email,password)=>{
    try {
        setloading(true)
        const response = await login(email,password)
        setUser(response.user)
        setError("")
        setloading(false)
    } catch (error) {
        setError(error.message)

    }
    finally{
        setloading(false)
    }
 }


 const handleRegister = async (userName,email,password)=>{
    try {
        setloading(true)
        const response = await register(userName,email,password)
        setUser(response.user)
        setError("")
    } catch (error) {
        setError(error.message)
    }
    finally{
setloading(false)
    }
 }

 return { user, loading, error, handleLogin, handleRegister }

}


