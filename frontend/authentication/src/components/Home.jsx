import React from 'react'
import { NavLink } from 'react-router-dom'
function Home() {
    // basically hume ye design karna hai ki agar wo active hai matlab agar ye wala navlink active hai toh uske text ka color -change kardo
    return (
        <>
            <div className="bg-violet-500 h-20 flex justify-center items-center gap-10 text-white">
                <NavLink to="/signup" className={({ isActive }) => (isActive ? " text-black underline" : "")}  >Signup</NavLink  >
                <NavLink to="/login" className={({ isActive }) => (isActive ? " text-black underline" : "")} >Login</NavLink>
            </div>
        </>

    )
}

export default Home
