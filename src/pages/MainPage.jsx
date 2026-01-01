import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    FaUser,
    FaArrowRight,
} from 'react-icons/fa6'
import {
    FaSignOutAlt,
} from 'react-icons/fa'
import NameModal from '../components/NameModal'
import { useAuth } from '../context/AuthContext'

const MainPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [updateName, setUpdateName] = useState('')
    const navigate = useNavigate()
    const { userName, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="main-container min-h-screen">
            <nav className="px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FaUser className="text-blue-600" />
                        </div>
                        <div className='hidden sm:flex'>
                            <p className="text-sm text-white">Welcome back,</p>
                            <p className="font-semibold text-gray-900">{userName}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white font-medium py-1 px-2 sm:p-2 text-sm hover:bg-blue-600 rounded-lg transition flex items-center justify-center gap-2">
                            Add Name
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2  bg-red-50 text-red-600 rounded-lg py-1 px-2 sm:px-4  sm:py-2 hover:bg-red-100 transition"
                        >
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="w-1/2 mx-auto mt-[200px] px-6 py-8 flex justify-center gap-5">
                <button
                    onClick={() => {
                        localStorage.setItem('user-name', updateName)
                        navigate('/successful-journey')
                    }}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold py-4 rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all flex items-center justify-center gap-2"
                >
                    Successful
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                    onClick={() => {
                        localStorage.setItem('user-name', updateName)
                        navigate('/failed-journey')

                    }}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-rose-600 to-red-600 text-white font-semibold py-4 rounded-xl hover:from-rose-700 hover:to-red-700 transition-all flex items-center justify-center gap-2"
                >
                    Failed
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <NameModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={(name) => {
                    setUpdateName(name)
                    // Update user name in context and localStorage
                    setShowModal(false)
                }}
                currentName={userName}
            />
        </div>
    )
}

export default MainPage