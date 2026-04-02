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
export const createGame = async (selectedProduct , selectedDifficulty) => {
    console.log("Creating game with product:", selectedProduct, "and difficulty:", selectedDifficulty);
const response  = await api.post("/api/games/", { selectedProduct, selectedDifficulty })
return response.data
}




// API function to make an offer in an ongoing game
export const makeOffer = async(gameId, offer ,userMessage )=>{
    const response = await api.post(`/api/games/${gameId}/offer`, {offer ,userMessage})
    console.log(response.data)
    return response.data
}




// API function to get the current state of a game
export const getGameState = async(gameId)=>{
    const response = await api.get(`/api/games/${gameId}`)
    return response.data
}

export const getActiveGame = async()=>{
    const response = await api.get("/api/games/active")
    return response.data
}


export const getLeaderBoard  = async()=>{
    const response = await api.get("/api/leaderboard")
    return response.data
}