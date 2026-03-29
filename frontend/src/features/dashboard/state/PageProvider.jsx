import { createContext, useState } from "react"

export const PageContext = createContext()

export const PageProvider = ({ children }) => {

const [product, setproduct] = useState([])

    return (
        <PageContext.Provider value={{product, setproduct}} >
            {children}
        </PageContext.Provider>
    )
}