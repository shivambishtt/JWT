import React from 'react'
import Home from './components/Home'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'


function App() {

  return (

    <div>
      <Home />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
