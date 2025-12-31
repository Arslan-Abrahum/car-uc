
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaUser, FaLock, FaArrowRight } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
    const [username, setUsername] = useState('Huzaifa123')
    const [password, setPassword] = useState('Huzaifa123')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()

    const from = location.state?.from?.pathname || '/'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!username.trim() || !password.trim()) {
            setError('Please enter both username and password')
            return
        }

        if (username !== "Huzaifa123" || password !== "Huzaifa123") {
            setError('Please enter valid username and password')
            return
        }

        setIsLoading(true)

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            // For demo purposes, accept any non-empty credentials
            // In real app, you would validate against your backend

            login(username)

            // Redirect to the page they tried to visit or home
            navigate(from, { replace: true })
        } catch (err) {
            setError('Authentication failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex flex-col md:flex-row">
            <div className="md:w-full bg-white flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In to Account</h2>
                        <p className="text-gray-600">Enter your credentials to access the portal</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="Enter your username"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="Enter your password"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                           
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <FaArrowRight />
                                </>
                            )}
                        </button>
                    </form>


                   
                </div>
            </div>
        </div>
    )
}

export default LoginPage