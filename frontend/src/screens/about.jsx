// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/user.context';
// import axios from 'axios';

// const About = () => {
//     const { user, setUser } = useContext(UserContext);
//     const [userData, setUserData] = useState(null);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const [currentTextIndex, setCurrentTextIndex] = useState(0);

//     const dynamicTexts = [
//         "Empowering collaboration with intelligent AI tools.",
//         "Building the future of AI-driven project management.",
//         "Innovating AI solutions for seamless teamwork.",
//         "Transforming ideas into reality with AI-powered code.",
//     ];

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
//             await axios.post('/api/logout');
//             localStorage.removeItem('user');
//             setUser(null);
//             setUserData(null);
//             navigate('/login');
//         } catch (err) {
//             console.error('Logout failed:', err);
//             setError('Logout failed. Please try again.');
//         }
//     };

//     useEffect(() => {
//         const textInterval = setInterval(() => {
//             setCurrentTextIndex((prevIndex) => (prevIndex + 1) % dynamicTexts.length);
//         }, 5000);

//         return () => clearInterval(textInterval);
//     }, [dynamicTexts.length]);

//     return (
//         <div className="min-h-screen bg-gray-900 text-white font-sans">
//             {/* Header */}
//             <header className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
//                 <div className="flex items-center">
//                     <h1 className="text-xl font-semibold mr-4">AI Collab</h1>
//                     <nav className="flex items-center">
//                         <Link to="/" className="mx-3 hover:text-gray-300">Home</Link>
//                         <Link to="/about" className="mx-3 hover:text-gray-300">About</Link>
//                         {user && (
//                             <>
//                                 <Link to="/home" className="mx-3 hover:text-blue-400">Dashboard</Link>
//                             </>
//                         )}
//                     </nav>
//                 </div>
//                 <div className="flex items-center">
//                     {user ? (
//                         <>
//                             <span className="mr-4">
//                                 {userData && userData.name ? `Welcome, ${userData.name}` : 'Welcome, User'}
//                             </span>
//                             <button onClick={handleLogout} className="px-3 py-1 bg-red-600 rounded hover:bg-red-700">Logout</button>
//                         </>
//                     ) : (
//                         <>
//                             <Link to="/login" className="px-3 py-1 bg-blue-600 rounded mr-2 hover:bg-blue-700">Login</Link>
//                             <Link to="/register" className="px-3 py-1 bg-green-600 rounded hover:bg-green-700">Register</Link>
//                         </>
//                     )}
//                     {user && user.email && <span className="ml-4"><i className="ri-user-fill p-2 rounded-full bg-gray-700"></i></span>}
//                 </div>
//             </header>

//             {/* Main Content */}
//             <div className="flex-grow flex flex-col justify-center items-center p-12 max-w-4xl mx-auto">
//                 <h1 className="text-5xl font-extrabold mb-8 text-center">About AI Collab</h1>

//                 <p className="text-2xl text-gray-300 mb-8 animate-slide-up text-center">
//                     {dynamicTexts[currentTextIndex]}
//                 </p>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
//                     <div>
//                         <p className="text-lg text-gray-400 mb-6 text-left">
//                             AI Collab is designed to revolutionize how teams collaborate on software projects. We integrate powerful AI capabilities directly into your workflow, enhancing productivity and creativity.
//                         </p>

//                         <ul className="list-disc list-inside mb-6 text-left">
//                             <li className="mb-3">
//                                 <strong className="text-blue-400">AI-Powered Chat:</strong> Interact with an intelligent AI assistant directly in your project chat. Get instant code suggestions, answers to technical questions, and more.
//                             </li>
//                             <li className="mb-3">
//                                 <strong className="text-blue-400">Code Generation:</strong> Simply type "@ai" followed by your request, and our AI will generate code snippets tailored to your needs, saving you time and effort.
//                             </li>
//                             <li className="mb-3">
//                                 <strong className="text-blue-400">Project Management:</strong> Create and manage projects seamlessly. Add team members, assign tasks, and track progress all in one place.
//                             </li>
//                             <li className="mb-3">
//                                 <strong className="text-blue-400">Dynamic File Creation:</strong> Generate essential project files like `app.js` or `server.js` with simple prompts, streamlining your development process.
//                             </li>
//                         </ul>
//                     </div>

//                     <div className="flex items-center justify-center">
//                         <img
//                             src="/img/aiCollaboraters.webp"
//                             alt="AI Collaboration"
//                             className="rounded-lg shadow-xl animate-fade-in"
//                         />
//                     </div>
//                 </div>

//                 <p className="text-lg text-gray-400 mt-8 text-center">
//                     We're committed to empowering teams with cutting-edge AI tools, fostering innovation, and accelerating software development.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default About;




// import React, { useState, useEffect, useContext } from 'react';
// import { UserContext } from '../context/user.context';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../config/axios';

// const About = () => {
//     const dynamicTexts = [
//         "Empowering collaboration with intelligent AI tools.",
//         "Building the future of AI-driven project management.",
//         "Innovating AI solutions for seamless teamwork.",
//         "Transforming ideas into reality with AI-powered code.",
//     ];
//     const [currentTextIndex, setCurrentTextIndex] = useState(0);
//     const [displayText, setDisplayText] = useState(dynamicTexts[0]);
//     const [animationClass, setAnimationClass] = useState('fade-in');
//     const [userData, setUserData] = useState(null);
//     // const { user } = useContext(UserContext);
//     const { user, setUser } = useContext(UserContext);
//     const navigate = useNavigate();



//     useEffect(() => {
//         const textInterval = setInterval(() => {
//             setAnimationClass('fade-out');
//             setTimeout(() => {
//                 setCurrentTextIndex((prevIndex) => (prevIndex + 1) % dynamicTexts.length);
//                 setAnimationClass('fade-in');
//             }, 500); // Wait for fade-out to complete
//         }, 5000);

//         return () => clearInterval(textInterval);
//     }, [dynamicTexts.length]);


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

//     useEffect(() => {
//         setDisplayText(dynamicTexts[currentTextIndex]);
//     }, [currentTextIndex, dynamicTexts]);


//     const handleLogout = async () => {
//         try {
//             await axios.get('/users/logout');
//             localStorage.removeItem('user');
//             setUser(null);
//             setUserData(null);
//             navigate('/');
//         } catch (err) {
//             console.error('Logout failed:', err);
//             setError('Logout failed. Please try again.');
//         }
//     };


//     const features = [
//         {
//             title: "Real-Time Chat",
//             description: "Seamlessly communicate with your team members.Real-time chat, in the context of modern applications, goes far beyond simple text messaging. It's about creating a seamless, interactive, and immediate communication experience. Here's a deeper dive into its aspects:",
//             image: "real-time-chat",
//         },
//         {
//             title: "Project Discussions",
//             description: "Structured discussions to keep projects aligned and on track. Project discussions are where ideas spark, problems are solved, and collaboration thrives. When challenges arise, project discussions are the key to unlocking innovative solutions.",
//             image: "project-discution",
//         },
//         {
//             title: "AI Assistance (@ai)",
//             description: "Instant AI-generated responses and code snippets via '@ai' commands. give you filling like chatgpt.you have any dobute then you ask ai and solve it. ",
//             image: "ai-assis",
//         },
//         {
//             title: "Project Creation",
//             description: "Easily create and manage projects with your project members.Start a new project in just a few clicks! Name your project, add details, and get started. Collaborate with teammates, manage files, and track progress—all in one streamlined dashboard.",
//             image: "project-creation",
//         },
//         {
//             title: "Collaborator Management",
//             description: "Add and manage collaborators effortlessly.Easily manage your team and collaborate in real time! Add or remove collaborators, assign roles, and streamline teamwork—all in one place. Work together seamlessly and keep everyone on the same page",
//             image: "colaborater-management",
//         },

//     ];

//     return (
//         <div className="min-h-screen font-sans text-gray-800 bg-[#f4f3ef]">

//             <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg p-4 sticky top-0 z-10">
//                 <div className="container mx-auto flex justify-between items-center">
//                     <div className="flex items-center space-x-6">
//                         <Link to="/" className="text-xl font-bold text-white tracking-tight">
//                             AI Agent
//                         </Link>
//                         <div className="space-x-4 text-white">
//                             <Link to="/" className="hover:text-indigo-200 transition-colors">Home</Link>
//                             <Link to="/about" className="hover:text-indigo-200 transition-colors">About</Link>
//                         </div>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         {user ? (
//                             <>
//                                 {/* <span className="text-white font-semibold flex items-center">
//                                                 <i className="ri-user-fill mr-2 p-2 bg-white bg-opacity-20 rounded-full"></i>
//                                                 {userData && userData.name ? `Welcome, ${userData.name}` : 'Welcome, User'}
//                                             </span> */}
//                                 <Link to="/home" className="text-indigo-100 hover:text-white transition-colors">
//                                     Dashboard
//                                 </Link>
//                                 <button
//                                     onClick={handleLogout}
//                                     className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-md"
//                                 >
//                                     Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <Link
//                                     to="/login"
//                                     className="px-4 py-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-100 transition-all duration-300 font-semibold"
//                                 >
//                                     Login
//                                 </Link>
//                                 <Link
//                                     to="/register"
//                                     className="px-4 py-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-100 transition-all duration-300 font-semibold"
//                                 >
//                                     Register
//                                 </Link>
//                             </>
//                         )}
//                         {user && user.email && <span className="mr-4 font-semibold text-gray-300 "><i className="ri-user-fill mr-2 p-2 bg-white bg-opacity-30 rounded-full"></i> {user.email}</span>}
//                     </div>
//                 </div>
//             </nav>

//             <div className="p-6 max-w-6xl mx-auto mt-8">
//                 <h1 className="text-4xl font-bold mb-4 text-blue-800 text-center">About AI Chat & Code</h1>
//                 <p className={`text-lg mb-6 text-gray-600 text-center transition-opacity duration-500 ${animationClass === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}>
//                     {displayText}
//                 </p>

                


//                 {features.map((feature, index) => (
//                     <div className="bg-white shadow-md rounded-lg p-6 mb-12 flex items-center ">
//                         <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-12`}>
//                             <div className=" rounded-lg overflow-hidden shadow-md">
//                                 <div className={`object-cover w-full h-full ${feature.image}`} />
//                             </div>
//                             <div className="w-1/2 pl-6">
//                                 <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">{feature.title}</h2>
//                                 <div className="bg-gray-100 rounded-lg p-4">

//                                     <p className="text-gray-600 mt-2">{feature.description}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}



//                 <p className="text-lg text-gray-600 mt-12 text-center">
//                     We are committed to delivering innovative AI solutions that make teamwork efficient and enjoyable.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default About;



import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/user.context';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';

const About = () => {
    const dynamicTexts = [
        "Empowering collaboration with intelligent AI tools.",
        "Building the future of AI-driven project management.",
        "Innovating AI solutions for seamless teamwork.",
        "Transforming ideas into reality with AI-powered code.",
    ];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('fade-in');
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const textInterval = setInterval(() => {
            setAnimationClass('fade-out');
            setTimeout(() => {
                setCurrentTextIndex((prevIndex) => (prevIndex + 1) % dynamicTexts.length);
                setAnimationClass('fade-in');
            }, 500);
        }, 5000);

        return () => clearInterval(textInterval);
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get('/users/logout');
            localStorage.removeItem('user');
            setUser(null);
            navigate('/');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const features = [
        { title: "🚀 Real-Time Chat", description: "Seamlessly communicate with your team members in an instant.", image: "real-time-chat" },
        { title: "💡 AI-Powered Assistance", description: "Instant AI-generated responses and code suggestions with '@ai'.", image: "ai-assis" },
        { title: "📌 Project Management", description: "Easily create and manage projects with structured discussions.", image: "project-creation" },
        { title: "🤝 Collaborator Management", description: "Effortlessly add and manage team members for smooth collaboration.", image: "colaborater-management" },
        { title: "🔍 Smart Code Review", description: "AI-driven code analysis and improvements to enhance your projects.", image: "code-review" },
    ];

    return (
        <div className="min-h-screen font-sans text-gray-800 bg-gradient-to-b from-indigo-50 to-blue-100">
            
            {/* Navigation */}
            <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg p-4 sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="text-xl font-bold text-white tracking-tight">AI Agent</Link>
                        <div className="space-x-4 text-white">
                            <Link to="/" className="hover:text-indigo-200 transition">Home</Link>
                            <Link to="/about" className="hover:text-indigo-200 transition">About</Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/home" className="text-indigo-100 hover:text-white transition">Dashboard</Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-md"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="px-4 py-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-100 transition font-semibold">Login</Link>
                                <Link to="/register" className="px-4 py-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-100 transition font-semibold">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="p-6 max-w-5xl mx-auto mt-8 text-center">
                <h1 className="text-4xl font-bold text-blue-800 mb-4">About AI Chat & Code</h1>
                <p className={`text-lg mb-6 text-gray-600 transition-opacity duration-500 ${animationClass === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}>
                    {dynamicTexts[currentTextIndex]}
                </p>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">What We Offer</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 bg-white rounded-lg shadow-md border-t-4 border-indigo-600 transform hover:scale-105 transition">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Unique Section - Why Choose Us? */}
            <div className="bg-white py-12 px-6 shadow-md">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-blue-800 mb-6">Why Choose AI Chat & Code?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-blue-700 mb-3">🌍 Global Collaboration</h3>
                            <p className="text-gray-600">Work with your team from anywhere in real-time.</p>
                        </div>
                        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-blue-700 mb-3">🤖 AI-Powered Efficiency</h3>
                            <p className="text-gray-600">Leverage AI for smarter, faster decision-making.</p>
                        </div>
                        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-blue-700 mb-3">🔒 Secure & Reliable</h3>
                            <p className="text-gray-600">Keep your data safe with top-tier security measures.</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-lg text-gray-600 mt-12 text-center">
                We are committed to delivering innovative AI solutions that make teamwork efficient and enjoyable.
            </p>
        </div>
    );
};

export default About;
