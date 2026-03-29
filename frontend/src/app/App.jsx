import React from 'react'
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { AuthProvider } from '../features/auth/state/ContextAuth';
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={AppRouter} />
    </AuthProvider>
  )
}

export default App