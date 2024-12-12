import { request } from '@/api'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '@/redux/slices/token-slice'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignUp = e => {
    e.preventDefault()
    let formData = new FormData(e.target)
    let user = Object.fromEntries(formData)

    console.log(user)

    request
      .post("/auth/signup-admin", user)
      .then(res => {
        console.log(res)
        dispatch(signIn(res.data.access_token))
        navigate("/admin")
      })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Register</h2>
        <form onSubmit={handleSignUp} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              name="name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              name="email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              name="password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              name="confirm_password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium rounded-md bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
