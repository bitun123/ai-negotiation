import axios from 'axios';


const api = axios.create({
    baseURL: import.meta.env.VITE_URL,
    withCredentials: true, // Include cookies in requests
      headers: {
        "Content-Type": "application/json"
    }
})



export const login  = async (email,password)=>{


    try {
        
        const response = await api.post("/api/auth/login",{
            email,
            password
        })
        console.log(response.data)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}



export const register = async (userName,email,password)=>{
    try {
        const response = await api.post("/api/auth/registration",{
            userName,
            email,
            password
        })
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}



