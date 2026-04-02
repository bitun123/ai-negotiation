import { createContext, useState } from "react"

export const PageContext = createContext()

export const PageProvider = ({ children }) => {
const [loading, setloading] = useState(false)
const [error, seterror] = useState("")
const [product, setproduct] = useState([])
const [message, setmessage] = useState([])
const [id, setid] = useState("")
const [gameinformation, setgameinformation] = useState(null)
const [leaderBoard, setleaderBoard] = useState([])


    return (
        <PageContext.Provider value={{product, setproduct, loading, setloading, error, seterror, message, setmessage, id, setid, gameinformation, setgameinformation, leaderBoard, setleaderBoard   }} >
            {children}
        </PageContext.Provider>
    )
}