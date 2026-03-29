import { useAuth } from '../../auth/hooks/useAuth'
import { Navigate } from 'react-router-dom'

function Protected({ children }) {

    const { user, loading } = useAuth()
    // Redirect to login if user not found after loading completes
    if (!user && loading === false) {
        return (
            <Navigate to="/login" replace={true} />
        )
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default Protected