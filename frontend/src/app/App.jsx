import React from 'react'
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { AuthProvider } from '../features/auth/state/ContextAuth';
import { PageProvider } from '../features/dashboard/state/PageProvider';



function App() {



  return (
    <AuthProvider >
      <PageProvider>
        <RouterProvider router={AppRouter} />
      </PageProvider>
    </AuthProvider>
  )
}

export default App