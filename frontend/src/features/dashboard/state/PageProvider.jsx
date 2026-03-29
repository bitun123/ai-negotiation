import { createContext, useState } from "react"

export const PageContext = createContext()

export const PageProvider = ({ children }) => {
const [loading, setloading] = useState(false)
const [error, seterror] = useState("")
const [product, setproduct] = useState([])

    return (
        <PageContext.Provider value={{product, setproduct, loading, setloading, error, seterror}} >
            {children}
        </PageContext.Provider>
    )
}