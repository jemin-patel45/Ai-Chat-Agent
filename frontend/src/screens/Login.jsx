/* 


import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[error,setError]=useState(null)
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault();
        axios.post('/users/login', { email, password })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                navigate('/');
            })
            .catch((err) => {
                console.log(err.response.data);
                setError('Email or password is incorrect')
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            <motion.div 
                className="absolute inset-0 bg-blue-600 opacity-10 blur-3xl" 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            
            <motion.div 
                className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative z-10 border border-gray-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
            >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p className='text-red-800'>{error}</p>}
                    <motion.button
                        type="submit"
                        className="w-full p-3 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg shadow-blue-500/30"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Login
                    </motion.button>
                </form>
                <p className="text-gray-400 mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login; */




// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../config/axios';
// import { UserContext } from '../context/user.context';
// import { motion } from 'framer-motion';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const { setUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     axios
//       .post('/users/login', { email, password })
//       .then((res) => {
//         localStorage.setItem('token', res.data.token);
//         setUser(res.data.user);
//         navigate('/');
//       })
//       .catch((err) => {
//         setError('Email or password is incorrect');
//       });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <motion.div
//         className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         whileHover={{ scale: 1.02 }}
//       >
//         <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
//         <form onSubmit={submitHandler} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               id="email"
//               className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               id="password"
//               className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               placeholder="Enter your password"
//             />
//           </div>
//           {error && <p className="text-red-500">{error}</p>}
//           <motion.button
//             type="submit"
//             className="w-full p-3 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all"
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Login
//           </motion.button>
//         </form>
//         <p className="text-gray-600 mt-4 text-center">
//           Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;






// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../config/axios';
// import { UserContext } from '../context/user.context';
// import { motion } from 'framer-motion';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const { setUser } = useContext(UserContext);
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);

//     const submitHandler = (e) => {
//         e.preventDefault();
//         setLoading(true);
//         axios
//             .post('/users/login', { email, password })
//             .then((res) => {
//                 localStorage.setItem('token', res.data.token);
//                 setUser(res.data.user);
//                 navigate('/');
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 setError('Email or password is incorrect');
//                 setLoading(false);
//             });
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-whatsapp-bg">
//             <motion.div
//                 className="bg-whatsapp-panel p-8 rounded-xl shadow-lg w-full max-w-md border border-whatsapp-border"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 whileHover={{ scale: 1.02 }}
//             >

//                 <h2 className="text-2xl font-semibold text-whatsapp-text mb-6 text-center">Login</h2>
//                 <form onSubmit={submitHandler} className="space-y-4">
//                     <div>
//                         <label className="block text-whatsapp-label mb-2" htmlFor="email">Email</label>
//                         <input
//                             onChange={(e) => setEmail(e.target.value)}
//                             type="email"
//                             id="email"
//                             className="w-full p-3 rounded-md border border-whatsapp-input focus:outline-none focus:ring-2 focus:ring-whatsapp-primary transition-all bg-whatsapp-input-bg text-whatsapp-text"
//                             placeholder="Enter your email"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-whatsapp-label mb-2" htmlFor="password">Password</label>
//                         <div className="relative">
//                             <input
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 type={showPassword ? 'text' : 'password'}
//                                 id="password"
//                                 className="w-full p-3 rounded-md border border-whatsapp-input focus:outline-none focus:ring-2 focus:ring-whatsapp-primary transition-all bg-whatsapp-input-bg text-whatsapp-text"
//                                 placeholder="Enter your password"
//                             />
//                             <button
//                                 type="button"
//                                 className="absolute inset-y-0 right-3 flex items-center text-whatsapp-icon"
//                                 onClick={() => setShowPassword(!showPassword)}
//                             >
//                                 <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
//                             </button>
//                         </div>
//                     </div>
//                     {error && <p className="text-red-500">{error}</p>}
//                     <motion.button
//                         type="submit"
//                         className={`w-full p-3 rounded-md ${loading ? 'bg-whatsapp-button-disabled cursor-not-allowed' : 'bg-whatsapp-button hover:bg-whatsapp-button-hover'} text-white font-semibold focus:outline-none focus:ring-2 focus:ring-whatsapp-primary shadow-md transition-all`}
//                         whileHover={!loading ? { scale: 1.03 } : {}}
//                         whileTap={!loading ? { scale: 0.95 } : {}}
//                         disabled={loading}
//                     >
//                         {loading ? 'Logging in...' : 'Login'}
//                     </motion.button>
//                 </form>
//                 <p className="text-whatsapp-text mt-4 text-center">
//                     Don't have an account? <Link to="/register" className="text-whatsapp-link hover:underline">Register</Link>
//                 </p>
//             </motion.div>
//         </div>
//     );
// };

// export default Login;







//Main login**********

// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../config/axios';
// import { UserContext } from '../context/user.context';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const { setUser } = useContext(UserContext);
//     const navigate = useNavigate();

//     const [showPassword, setShowPassword] = useState(false);


//     const submitHandler = (e) => {
//         e.preventDefault();

//         axios
//             .post('/users/login', { email, password })
//             .then((res) => {
//                 localStorage.setItem('token', res.data.token);
//                 setUser(res.data.user);
//                 navigate('/');

//             })
//             .catch((err) => {
//                 setError('Email or password is incorrect');

//             });
//     };

//     return (
//         <div className="h-full bg-[#eaeff4] font-poppins text-[#666666] flex items-center justify-center">
//             <div className="w-full h-screen bg-white rounded-md shadow-[0_0_5px_#999999] flex">
//                 <div className="w-2/5 bg-[#4b84ff] text-white p-8 relative z-10 ">
//                     <div className="absolute top-0 left-0 w-0 h-0 border-t-[600px] border-r-[200px] border-transparent border-r-[#ffffff] opacity-20 pointer-events-none"></div>
//                     <div className="text">
//                         <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
//                         <p className="mb-5">Create your account.<br />For Free!</p>
//                         <button
//                             onClick={() => { navigate('/register') }}
//                             className="inline-block px-5 py-2 rounded-3xl border border-white hover:bg-white hover:text-[#4368ff] transition-colors duration-300 cursor-pointer font-semibold"
//                         >
//                             Sign Up
//                         </button>
//                     </div>
//                     <div className="imageLogin h-96   w-100%">

//                     </div>
//                 </div>
//                 <div className="w-3/5 p-16">
//                     <h2 className="text-2xl font-bold mb-10">Login</h2>


//                     <form className="space-y-6">

//                         <div className="mb-6">
//                             <label htmlFor="email" className="block text-sm font-normal text-gray-800 ">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 placeholder="Enter Email"
//                                 id="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="placeholder-black  w-full h-12 p-2 mt-2 text-sm font-light text-black rounded-full border-2 "
//                             />
//                         </div>
//                         <div className="mb-8 relative">
//                             <label htmlFor="password" className="block text-sm font-medium text-black">
//                                 Password
//                             </label>
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder="Enter Password"
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="placeholder-gray-700 w-full h-12 p-2 mt-2 text-sm font-light text-black rounded-full border "
//                             />
//                             <button
//                                 type="button"
//                                 className="absolute  inset-y-0 right-5 top-7 flex items-center text-whatsapp-icon"
//                                 onClick={() => setShowPassword(!showPassword)}
//                             >
//                                 <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
//                             </button>
//                             {error && <p className="text-red-500 mt-2">{error}</p>}
//                         </div>
//                         <button
//                             type="submit"
//                             onClick={submitHandler}
//                             className={`w-full p-3 m-0 top-0 text-lg font-semibold text-[#080710] rounded-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 transition-all duration-1000 shadow-lg shadow-blue-500/30`}
//                         >
//                             Log In
//                         </button>


//                     </form>

//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;



// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../config/axios';
// import { UserContext } from '../context/user.context';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const { setUser } = useContext(UserContext);
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);

//     const submitHandler = (e) => {
//         e.preventDefault();
//         axios
//             .post('/users/login', { email, password })
//             .then((res) => {
//                 localStorage.setItem('token', res.data.token);
//                 setUser(res.data.user);
//                 navigate('/');
//             })
//             .catch((err) => {
//                 setError('Email or password is incorrect');
//             });
//     };
   

//     return (
//         <div className="min-h-screen bg-gray-100 font-poppins text-gray-700 flex items-center justify-center p-4">
//             <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg flex overflow-hidden">
//                 {/* Left Side - Welcome Section */}
//                 <div className="w-2/5 bg-gradient-to-br from-indigo-600 to-blue-500 text-white p-8 relative flex flex-col justify-between">
//                     {/* Decorative Wave */}
//                     <svg
//                         className="absolute bottom-0 left-0 w-full h-24 text-white opacity-20"
//                         viewBox="0 0 1440 320"
//                         preserveAspectRatio="none"
//                     >
//                         <path
//                             fill="currentColor"
//                             d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,197.3C960,171,1056,117,1152,106.7C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//                         />
//                     </svg>

//                     {/* Content */}
//                     <div className="relative z-10">
//                         <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Welcome Back!</h2>
//                         <p className="text-lg mb-6 opacity-90">
//                             Don't have an account? <br />Create your account now.
//                         </p>
//                         <button
//                             onClick={()=>{navigate('/register')}} 
//                             className="inline-block px-6 py-2.5 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 ease-in-out transform hover:scale-105"
//                         >
//                             Sign Up
//                         </button>
//                     </div>

//                     {/* Subtle Animation Placeholder */}
//                     <div className="relative z-10 h-48 flex items-end justify-center">
//                         <div className="w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
//                     </div>
//                 </div>

//                 {/* Right Side - Login Form */}
//                 <div className="w-3/5 p-10 flex flex-col justify-center">
//                     <h2 className="text-3xl font-bold text-gray-800 mb-8">Log In</h2>

//                     <form className="space-y-6" onSubmit={submitHandler}>
//                         {/* Email Field */}
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 placeholder="Enter Email"
//                                 id="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="w-full mt-2 p-3 text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                             />
//                         </div>

//                         {/* Password Field */}
//                         <div className="relative">
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                 Password
//                             </label>
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder="Enter Password"
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="w-full mt-2 p-3 text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute right-3 top-10 text-gray-500 hover:text-indigo-600 transition-colors"
//                             >
//                                 <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
//                             </button>
//                             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                             type="submit"
//                             className="w-full p-3 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//                         >
//                             Log In
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;




import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../context/user.context';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('/users/login', { email, password })
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('loginSuccess', 'true');
                setUser(res.data.user);
                navigate('/');
            })
            .catch((err) => {
                setError('Email or password is incorrect');
            });
    };

    

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-gray-100 font-sans text-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
                {/* Left Side - Welcome Section */}
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
                            Welcome Back!
                        </h2>
                        <p className="text-lg mb-8 opacity-90 leading-relaxed">
                            Don't have an account? Sign up to unlock exclusive features and content.
                        </p>
                        <button
                            onClick={() => navigate('/register')}
                            className="inline-block px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Subtle Animation Placeholder */}
                    <div className="relative z-10 h-48 flex items-end justify-center">
                        <div className="w-40 h-40 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-3/5 p-12 flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 animate-fade-in">
                        Log In to Your Account
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
                            {error && <p className="text-red-500 text-sm mt-2 animate-pulse">{error}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            
                            className="w-full p-4 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Log In
                        </button>
                        
                    </form>
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
    );
}

export default Login;

