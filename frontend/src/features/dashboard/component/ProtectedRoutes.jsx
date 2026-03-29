import React, { Children } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({Children}) {
const{user ,loading} = useAuth()


if(loading){
    return <div>Loading...</div>
}

if(!user){
    return <Navigate to="/login" />
}

  return (
    <div>{Children}</div>
  )
}

export default ProtectedRoutes