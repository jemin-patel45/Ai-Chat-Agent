// import React, { useState, useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { UserContext } from '../context/user.context'
// import axios from '../config/axios'

// const Register = () => {

//     const [ email, setEmail ] = useState('')
//     const [ password, setPassword ] = useState('')
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState(null);

//     const { setUser } = useContext(UserContext)

//     const navigate = useNavigate()


//     function submitHandler(e) {

//         e.preventDefault()

//         axios.post('/users/register', {
//             email,
//             password
//         }).then((res) => {
//             console.log(res.data)
//             localStorage.setItem('token', res.data.token)
//             setUser(res.data.user)
//             navigate('/')
//         }).catch((err) => {
//             console.log(err.response.data)
//         })
//     }
//     return(

//         <div className="min-h-screen bg-gray-100 font-poppins text-gray-700 flex items-center justify-center p-4">
//         <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg flex overflow-hidden">
            
            

//             {/* Right Side - Login Form */}
//             <div className="w-3/5 p-10 flex flex-col justify-center">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-8">Register</h2>

//                 <form className="space-y-6" onSubmit={submitHandler}>
//                     {/* Email Field */}
//                     <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             placeholder="Enter Email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full mt-2 p-3 text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                         />
//                     </div>

//                     {/* Password Field */}
//                     <div className="relative">
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                             Password
//                         </label>
//                         <input
//                             type={showPassword ? 'text' : 'password'}
//                             placeholder="Enter Password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full mt-2 p-3 text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                         />
//                         <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-10 text-gray-500 hover:text-indigo-600 transition-colors"
//                         >
//                             <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
//                         </button>
//                         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//                     </div>

                    
//                     <button
//                         type="submit"
//                         className="w-full p-3 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//                     >
//                      Register
//                     </button>
//                 </form>
//             </div>
//             <div className="w-2/5 bg-gradient-to-br from-indigo-600 to-blue-500 text-white p-8 relative flex flex-col justify-between">
//                 {/* Decorative Wave */}
//                 <svg
//                     className="absolute bottom-0 left-0 w-full h-24 text-white opacity-20"
//                     viewBox="0 0 1440 320"
//                     preserveAspectRatio="none"
//                 >
//                     <path
//                         fill="currentColor"
//                         d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,197.3C960,171,1056,117,1152,106.7C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//                     />
//                 </svg>

//                 {/* Content */}
//                 <div className="relative z-10">
//                     <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Welcome Back!</h2>
//                     <p className="text-lg mb-6 opacity-90">
//                         Join us today. <br />Create an account to access exclusive features and content.
//                     </p>
//                     <button
//                         onClick={() => navigate('/login')}
//                         className="inline-block px-6 py-2.5 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 ease-in-out transform hover:scale-105"
//                     >
//                        Login
//                     </button>
//                 </div>

                
//                 <div className="relative z-10 h-48 flex items-end justify-center">
//                     <div className="w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
//                 </div>
//             </div>
//         </div>
//     </div>
// );
// }

// export default Register;




// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/user.context';
// import axios from '../config/axios';
// import { motion } from 'framer-motion';

// const Register = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { setUser } = useContext(UserContext);
//     const navigate = useNavigate();

//     function submitHandler(e) {
//         e.preventDefault();
//         axios.post('/users/register', { email, password })
//             .then((res) => {
//                 console.log(res.data);
//                 localStorage.setItem('token', res.data.token);
//                 setUser(res.data.user);
//                 navigate('/');
//             })
//             .catch((err) => {
//                 console.log(err.response.data);
//             });
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
//             <motion.div 
//                 className="absolute inset-0 bg-blue-600 opacity-10 blur-3xl" 
//                 animate={{ scale: [1, 1.2, 1] }} 
//                 transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
//             />
            
//             <motion.div 
//                 className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative z-10 border border-gray-700"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 whileHover={{ scale: 1.02 }}
//             >
//                 <h2 className="text-3xl font-bold text-white mb-6 text-center">Create an Account</h2>
//                 <form onSubmit={submitHandler} className="space-y-4">
//                     <div>
//                         <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
//                         <input
//                             onChange={(e) => setEmail(e.target.value)}
//                             type="email"
//                             id="email"
//                             className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                             placeholder="Enter your email"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
//                         <input
//                             onChange={(e) => setPassword(e.target.value)}
//                             type="password"
//                             id="password"
//                             className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                             placeholder="Enter your password"
//                         />
//                     </div>
//                     <motion.button
//                         type="submit"
//                         className="w-full p-3 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg shadow-blue-500/30"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         Register
//                     </motion.button>
//                 </form>
//                 <p className="text-gray-400 mt-4 text-center">
//                     Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
//                 </p>
//             </motion.div>
//         </div>
//     );
// };

// export default Register;

import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user.context'
import axios from '../config/axios'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [dob, setDob] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)

    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    function submitHandler(e) {
        e.preventDefault()
        axios.post('/users/register', {
            email,
            password,
            mobile,
            dob
        }).then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
            navigate('/')
        }).catch((err) => {
            console.log(err.response.data)
            setError(err.response.data.message || 'Registration failed')
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-gray-100 font-sans text-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
                {/* Left Side - Register Form */}
                <div className="w-3/5 p-12 flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 animate-fade-in">
                        Create Your Account
                    </h2>

                    <form className="space-y-6" onSubmit={submitHandler}>
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 p-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 ease-in-out hover:shadow-md"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 p-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 ease-in-out hover:shadow-md"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-12 text-gray-500 hover:text-indigo-600 transition-colors duration-200"
                            >
                                <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                            </button>
                        </div>

                        {/* Mobile Number Field */}
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter your mobile number"
                                id="mobile"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="w-full mt-2 p-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 ease-in-out hover:shadow-md"
                                required
                            />
                        </div>

                        {/* Date of Birth Field */}
                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dob"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="w-full mt-2 p-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 ease-in-out hover:shadow-md"
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm mt-2 animate-pulse">{error}</p>}

                        <button
                            type="submit"
                            className="w-full p-4 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Register
                        </button>
                    </form>
                </div>

                {/* Right Side - Welcome Section */}
                <div className="w-2/5 bg-gradient-to-br from-indigo-700 to-blue-600 text-white p-10 relative flex flex-col justify-between">
                    {/* Decorative Wave */}
                    <svg
                        className="absolute bottom-0 left-0 w-full h-32 text-white opacity-20"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="currentColor"
                            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,197.3C960,171,1056,117,1152,106.7C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        />
                    </svg>

                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-5xl font-extrabold mb-6 tracking-tight animate-slide-in">
                            Join the Journey!
                        </h2>
                        <p className="text-lg mb-8 opacity-90 leading-relaxed">
                            Sign up today to unlock a world of exclusive features, personalized content, and seamless experiences.
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="inline-block px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            Login
                        </button>
                    </div>

                    <div className="relative z-10 h-48 flex items-end justify-center">
                        <div className="w-40 h-40 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Tailwind CSS Animation Keyframes */}
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes slideIn {
                        from { opacity: 0; transform: translateX(20px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    .animate-fade-in {
                        animation: fadeIn 0.6s ease-out forwards;
                    }
                    .animate-slide-in {
                        animation: slideIn 0.6s ease-out forwards;
                    }
                    .shadow-3xl {
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    }
                `}
            </style>
        </div>
    )
}

export default Register