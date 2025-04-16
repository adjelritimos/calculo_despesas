import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Calculator from './screens/calculate.jsx'




const router = createBrowserRouter([
  {
    path: "/calculo_despesas/",
    element: <App />,
    children: [
      {
        path: "/calculo_despesas/",
        element: <Calculator />,
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)