
//1st


// import React, { useEffect, useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/user.context';
// import axios from 'axios';

// const First = () => {
//     const { user, setUser } = useContext(UserContext);
//     const [userData, setUserData] = useState(null);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//             fetchUserData(JSON.parse(storedUser).id);
//         }
//     }, [setUser]);

//     const fetchUserData = async (userId) => {
//         try {
//             const response = await fetch(`/api/users/${userId}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 setUserData(data);
//             } else {
//                 console.error('Failed to fetch user data');
//             }
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//         }
//     };

//     const handleLogout = async () => {
//         try {
//             await axios.get('/users/logout');
//             localStorage.removeItem('user');
//             localStorage.removeItem("token");
//             setUser(null);
//             setUserData(null);
//             navigate('/');
//         } catch (err) {
//             console.error('Logout failed:', err);
//             setError('Logout failed. Please try again.');
//         }
//     };

//     const handleGetStarted = () => {
//         if (user) {
//             navigate('/home');
//         } else {
//             setError('Please log in or register to get started.');
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col font-sans text-gray-800">

//             <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
//                 <div className="container mx-auto flex justify-between items-center">
//                     <div className="flex items-center">
//                         <Link to="/" className="text-lg font-semibold text-blue-600 text-shadow">
//                             AI Agent
//                         </Link>
//                         <div className="ml-8 space-x-4">
//                             <Link to="/" className="hover:text-blue-500">Home</Link>
//                             <Link to="/about" className="hover:text-blue-500">About</Link>

//                         </div>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         {user ? (
//                             <>
//                                 <span className="font-semibold text-gray-700">
//                                     {userData && userData.name ? `Welcome, ${userData.name}` : 'Welcome, User'}
//                                 </span>
//                                 <Link to="/home" className="text-blue-600 hover:text-blue-800">
//                                     Dashboard
//                                 </Link>
//                                 <button
//                                     onClick={handleLogout}
//                                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                                 >
//                                     Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                                     Login
//                                 </Link>
//                                 <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                                     Register
//                                 </Link>
//                             </>
//                         )}
//                         {user && user.email && <span className="mr-4 font-semibold text-gray-700 "><i className="ri-user-fill p-3 border-b-2 rounded-full bg-slate-300"></i> {user.email}</span>}
//                     </div>
//                 </div>
//             </nav>


//             <div className="flex-grow flex flex-col justify-center right-0 items-end first-image p-8">
//                 <div className="max-w-3xl text-center">
//                     <h1 className="text-4xl font-bold mb-12 text-blue-800 ">Streamline Your Projects with Ai Agent</h1>
//                     <p className="text-lg mb-6 text-gray-600">
//                         Effortlessly manage tasks, collaborate with your team, and achieve your project goals with our intuitive platform.
//                     </p>
//                     {error && <p className="text-red-500 mb-4">{error}</p>}
//                     <button
//                         onClick={handleGetStarted}
//                         className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg  transition-colors duration-900 "
//                     >
//                         Get Started
//                     </button>
//                 </div>



//             </div>
//         </div>
//     );
// };

// export default First;





import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import axios from 'axios';
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsTwitterX } from "react-icons/bs";
import { motion } from "framer-motion";

import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const First = () => {
    const { user, setUser } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            fetchUserData(JSON.parse(storedUser).id);
        }

        const loginSuccess = localStorage.getItem('loginSuccess');
        if (loginSuccess) {
            toast.success("Login Successfully", { // Display success toast
                position: "top-right",
                autoClose: 3000, // Adjust the duration as needed (milliseconds)
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            localStorage.removeItem('loginSuccess'); // Clear the flag
        }
    }, [setUser, navigate]);
    // }, [setUser]);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get('/users/logout');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
            setUserData(null);
            navigate('/');
        } catch (err) {
            console.error('Logout failed:', err);
            setError('Logout failed. Please try again.');
        }
    };

    const handleGetStarted = () => {
        if (user) {
            navigate('/home');
        } else {
            setError('Please log in or register to get started.');
        }
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const dynamicTexts = [
        "Empowering collaboration with intelligent AI tools.",
        "Building the future of AI-driven project management.",
        "Innovating AI solutions for seamless teamwork.",
        "Transforming ideas into reality with AI-powered code.",
    ];

    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const textInterval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % dynamicTexts.length);
        }, 4000); // Change text every 4 seconds
        return () => clearInterval(textInterval);
    }, [dynamicTexts.length]);

    const features = [
        { title: "Real-Time Chat", description: "Seamlessly communicate with your team in real-time.", icon: "💬" },
        { title: "Project Discussions", description: "Keep projects aligned with structured discussions.", icon: "📋" },
        { title: "AI Assistance (@ai)", description: "Get instant AI responses and code snippets.", icon: "🤖" },
    ];

    return (
        <div className="min-h-screen flex flex-col font-poppins text-gray-800 bg-gray-50 overflow-hidden">
            {/* Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-indigo-700 via-violet-600 to-blue-500 shadow-xl p-5 sticky top-0 z-50"
            >

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-2xl font-extrabold text-white tracking-wide drop-shadow-md">
                            AI Agent
                        </Link>
                        <div className="space-x-6 text-white font-medium">
                            {['home', 'about', 'service', 'contact'].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => handleSectionChange(section)}
                                    className={`hover:text-indigo-200 transition-colors duration-300 ${activeSection === section ? 'text-indigo-200 underline' : ''}`}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/home" className="text-white hover:text-indigo-200 transition-colors duration-300 font-medium">
                                    Dashboard
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-5 py-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-100 transition-all duration-300 font-semibold shadow-md"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-blue-400 text-white rounded-full hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 font-semibold shadow-md"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        {user && user.email && (
                            <span className="text-white font-medium flex items-center gap-2">
                                <i className="ri-user-fill p-2 bg-white bg-opacity-20 rounded-full" />
                                {user.email}
                            </span>
                        )}
                    </div>
                </div>
            </motion.nav>


            <section id="home" className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-400 text-white overflow-hidden">

                <div className="absolute inset-0 flex justify-center items-center">
                    <motion.div
                        className="w-96 h-96 bg-indigo-400 rounded-full opacity-20 blur-3xl"
                        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="w-72 h-72 bg-purple-400 rounded-full opacity-20 blur-3xl absolute top-20 left-20"
                        animate={{ scale: [1, 1.1, 1], rotate: -360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
                <div className="relative z-10 text-center max-w-4xl px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg"
                    >
                        Streamline Your Projects with AI Agent
                    </motion.h1>
                    <motion.p
                        key={currentTextIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light"
                    >
                        {dynamicTexts[currentTextIndex]}
                    </motion.p>
                    {error && <p className="text-red-700 mb-4 text-sm">{error}</p>}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGetStarted}
                        className="px-8 py-4 text-lg font-semibold text-indigo-600 bg-white rounded-full hover:bg-indigo-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Get Started
                    </motion.button>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold text-indigo-700 mb-8"
                    >
                        About AI Chat & Code
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: .2 }}
                        className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto"
                    >
                        We’re revolutionizing teamwork with AI-driven tools that enhance collaboration, streamline coding, and boost productivity.
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <span className="text-4xl mb-4 block">{feature.icon}</span>
                                <h3 className="text-xl font-semibold text-indigo-700 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-16 bg-gradient-to-b from-gray-50 to-indigo-100">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold text-indigo-700 mb-8"
                    >
                        Our Services
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { title: "AI Collaboration", desc: "Work smarter with your team and AI.", color: "indigo" },
                            { title: "Code Generation", desc: "Instantly generate optimized code.", color: "blue" },
                            { title: "Task Management", desc: "Stay organized and on track.", color: "green" },
                            { title: "Real-Time AI", desc: "Get instant AI support anytime.", color: "purple" },
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className={`p-6 bg-white rounded-xl shadow-lg border-t-4 border-${service.color}-600 hover:scale-105 transition-all duration-300`}
                            >
                                <h3 className={`text-xl font-semibold text-${service.color}-700 mb-3`}>{service.title}</h3>
                                <p className="text-gray-600">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative py-16 bg-gradient-to-b from-blue-50 to-indigo-200">
                <svg className="absolute bottom-0 left-0 w-full h-32 text-indigo-300" viewBox="0 0 1440 320">
                    <path fill="currentColor" d="M0,160L80,176C160,192,320,224,480,224C640,224,800,192,960,176C1120,160,1280,160,1360,160L1440,160V320H0Z" />
                </svg>
                <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold text-indigo-700 mb-6"
                    >
                        Get in Touch
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-600 mb-8"
                    >
                        Questions or ideas? Let’s connect and create something amazing together!
                    </motion.p>
                    <form className="space-y-6 bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl">
                        <div className="relative">
                            <input type="text" placeholder="Your Name" className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">👤</span>
                        </div>
                        <div className="relative">
                            <input type="email" placeholder="Your Email" className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">📧</span>
                        </div>
                        <div className="relative">
                            <textarea placeholder="Your Message" rows="4" className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                            <span className="absolute left-4 top-5 text-gray-400">✍️</span>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full font-semibold hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-md"
                        >
                            Send Message
                        </motion.button>
                    </form>
                    <div className="mt-8 flex justify-center space-x-6 text-3xl">
                        <a href="http://google.com" className="hover:text-indigo-600 transition"><FcGoogle /></a>
                        <a href="https://www.linkedin.com/in/jemin-vaghasiya" className="text-blue-600 hover:text-blue-800 transition"><FaLinkedin /></a>
                        <a href="#" className="text-gray-800 hover:text-gray-600 transition"><BsTwitterX /></a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default First;