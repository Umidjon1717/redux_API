import { request } from '@/api'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '@/redux/slices/token-slice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignIn = e => {
    e.preventDefault()
    setLoading(true)
    let formData = new FormData(e.target)
    const user = Object.fromEntries(formData)

    request
      .post("/auth/signin-admin", user)
      .then(res => {
        dispatch(signIn(res.data.access_token))
        navigate("/admin")
      })
      .catch(err => {
        alert(err.response.data.message.message)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Login</h2>
        <form onSubmit={handleSignIn} className="mt-6 space-y-4">
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
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white font-medium rounded-md transition-colors duration-300 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
