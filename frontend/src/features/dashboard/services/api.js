import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_URL,
    withCredentials: true, // Include cookies in requests
    headers: {
        'Content-Type': 'application/json',
    },
})


// API function to create a new game
export const createGame = async () => {
const response  = await api.post("/api/games/")
return response.data
}




// API function to make an offer in an ongoing game
export const makeOffer = async(gameId, offer)=>{
    const response = await api.post(`/api/games/${gameId}/offer`, {offer})
    return response.data
}




// API function to get the current state of a game
export const getGameState = async(gameId)=>{
    const response = await api.get(`/api/games/${gameId}`)
    return response.data
}

