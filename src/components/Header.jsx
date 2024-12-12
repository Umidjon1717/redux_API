import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className="bg-gray-800 text-white shadow-md">
      <nav className="flex justify-center gap-6 py-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors duration-300 ${
              isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-400 hover:text-gray-100'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors duration-300 ${
              isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-400 hover:text-gray-100'
            }`
          }
        >
          Register
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors duration-300 ${
              isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-400 hover:text-gray-100'
            }`
          }
        >
          Login
        </NavLink>

        <NavLink
          to="/createproduct"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors duration-300 ${
              isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-400 hover:text-gray-100'
            }`
          }
        >
          Product_create
        </NavLink>
      </nav>
    </div>
  )
}

export default Header
