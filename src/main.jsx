import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './screens/Home.jsx'
import Splash from './screens/Splash.jsx'
import NotFound from './screens/404.jsx'




const router = createBrowserRouter([
  {
    path: "/calculo_despesas",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Splash />,
      },

      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />, 
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)