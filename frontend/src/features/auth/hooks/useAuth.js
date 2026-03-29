import { login,register , getMe } from "../api/auth.api"
import { useContext, useEffect } from "react"
import { AuthContext } from "../state/ContextAuth"

export const useAuth = ()=>{

const context = useContext(AuthContext)

const { user, setUser, loading, setLoading, error, setError } = context



 const handleLogin = async (email,password)=>{
    try {
        setLoading(true)
        const response = await login(email,password)
        setUser(response.user)
        setError("")

        console.log(user)
    } catch (error) {
        setError(error.message)
    }
    finally{
        setLoading(false)
    }
 }


 const handleRegister = async (userName,email,password)=>{
    try {
        setLoading(true)
        const response = await register(userName,email,password)
        setUser(response.user)
        setError("")
    } catch (error) {
        setError(error.message)
    }
    finally{
setLoading(false)
    }
 }

const getCurrentUser = async ()=>{
    try {
        setLoading(true)
        const response = await getMe()
        setUser(response.user)
        setError("")
    } catch (error) {
        setError(error.message)
    }
    finally{
        setLoading(false)
    }

}


useEffect(()=>{
    getCurrentUser()
},[])

 return { user, loading, error, handleLogin, handleRegister, getCurrentUser }

}


