import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './screens/Home.jsx'
import Splash from './screens/Splash.jsx'
import NotFound from './screens/404.jsx'




const router = createBrowserRouter([
  {
    path: "/calculo_despesas/",
    element: <App />,
    children: [
      {
        path: "/calculo_despesas/",
        element: <Splash />,
      },

      {
        path: "/calculo_despesas/home",
        element: <Home />,
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)