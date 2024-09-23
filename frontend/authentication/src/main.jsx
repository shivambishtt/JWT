import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './components/Home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main app layout
    children: [
     
      {
        path: "signup", // Child route for Signup
        element: <Signup />,
      },
      {
        path: "login", // Child route for Login
        element: <Login />,
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
