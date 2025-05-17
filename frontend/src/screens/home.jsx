
// import React, { useContext, useState, useEffect } from 'react';
// import { UserContext } from '../context/user.context';
// import axios from '../config/axios';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const { user } = useContext(UserContext);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [projectName, setProjectName] = useState('');
//   const [project, setProject] = useState([]);
//   const navigate = useNavigate();

//   function createProject(e) {
//     e.preventDefault();
//     axios
//       .post('/projects/create', { name: projectName })
//       .then((res) => {
//         setProject([...project, res.data.project]);
//         setIsModalOpen(false);
//         setProjectName('');
//       })
//       .catch((error) => console.log(error));
//   }

//   useEffect(() => {
//     axios
//       .get('/projects/all')
//       .then((res) => {
//         if (res.data && res.data.projects) setProject(res.data.projects);
//       })
//       .catch((err) => console.log('Error fetching projects:', err));
//   }, []);

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* New Project Button at the Top */}
//         <div className="mb-8">
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center gap-2"
//           >
//             <i className="ri-add-line"></i> New Project
//           </button>
//         </div>

//         {/* Project Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {project.map((project) => (
//             <div
//               key={project._id}
//               onClick={() => navigate(`/project`, { state: { project } })}
//               className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-105"
//             >
//               <h2 className="text-xl font-semibold mb-3 text-blue-300">{project?.name}</h2>
//               <div className="flex items-center gap-2 text-gray-400">
//                 <i className="ri-user-line"></i>
//                 <p>
//                   <small>Collaborators: {project.users ? project.users.length : 0}</small>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
//             <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-1/3 max-w-md">
//               <h2 className="text-2xl font-semibold mb-6 text-blue-300">Create New Project</h2>
//               <form onSubmit={createProject}>
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
//                   <input
//                     onChange={(e) => setProjectName(e.target.value)}
//                     value={projectName}
//                     type="text"
//                     className="mt-1 block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="flex justify-end gap-3">
//                   <button
//                     type="button"
//                     className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors duration-300"
//                     onClick={() => setIsModalOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     onClick={()=>navigate('/login')}
//                     className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300"
//                   >
//                     Create
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default Home;




//1st


// import React, { useContext, useState, useEffect } from 'react';
// import { UserContext } from '../context/user.context';
// import axios from '../config/axios';
// import { useNavigate, Link } from 'react-router-dom';

// const Home = () => {
//     // const { user } = useContext(UserContext);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [projectName, setProjectName] = useState(null);
//     const [projects, setProjects] = useState([]);
//     const navigate = useNavigate();
//     const { user, setUser } = useContext(UserContext);
//     const [userData, setUserData] = useState(null);
//     const [error, setError] = useState(null);


//     const createProject = (e) => {
//         e.preventDefault();
//         axios.post('/projects/create', { 
//             name: projectName
//          })
//             .then((res) => {
//                 setProjects([...projects, res.data.project]);
//                 setIsModalOpen(false);
//                 setProjectName('');
//             })
//             .catch((error) => console.log(error));
//     };

//     useEffect(() => {
//         axios.get('/projects/all')
//             .then((res) => {
//                 if (res.data && res.data.projects) setProjects(res.data.projects);
//             })
//             .catch((err) => console.log('Error fetching projects:', err));
//     }, []);





//     const handleLogout = async () => {
//         try {
//             await axios.get('/users/logout');
//             localStorage.removeItem('user');
//             localStorage.removeItem('token');
//             setUser(null);
//             setUserData(null);

//             navigate('/');
//         } catch (err) {
//             console.error('Logout failed:', err);
//             setError('Logout failed. Please try again.');
//         }
//     };

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

//     return (
//         <main className="min-h-screen font-sans bg-[#f4f3ef] text-gray-800">

//             {/* <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
//                 <div className="container mx-auto flex justify-between items-center">
//                     <div className="flex items-center">
//                         <span className="text-lg font-semibold text-blue-600">AI Agent</span>
//                         <div className="ml-8 space-x-4">
//                             <span onClick={()=>{navigate('/')}} className="hover:text-blue-500 cursor-pointer">Home</span>
//                         </div>
//                     </div>
//                     <div className="flex items-center">
//                         {user && user.email && (
//                             <span className="mr-4 font-semibold text-gray-700">
//                                 <i className="ri-user-fill p-3 border-b-2 rounded-full bg-slate-300"></i> {user.email}
//                             </span>
//                         )}
//                     </div>
//                 </div>
//             </nav> */}
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

//             <div className="p-6 max-w-4xl mx-auto mt-8">
//                 {/* New Project Button - Consistent Styling */}
//                 <div className="mb-8">
//                     <button
//                         onClick={() => setIsModalOpen(true)}
//                         className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300 shadow-md"
//                     >
//                         <i className="ri-add-line mr-2"></i> New Project
//                     </button>
//                 </div>


//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {
//                         projects.map((project) => (
//                             <div key={project._id}
//                                 onClick={() => {
//                                     navigate(`/project`, {
//                                         state: { project }
//                                     })
//                                 }}
//                                 className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
//                                 <h2
//                                     className='font-semibold text-blue-700'
//                                 >{project.name}</h2>

//                                 <div className="flex gap-2 text-gray-600">
//                                     <p> <small> <i className="ri-user-line"></i> Collaborators</small> :</p>
//                                     {project.users.length}
//                                 </div>

//                             </div>
//                         ))
//                     }
//                 </div>


//                 {isModalOpen && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
//                         <div className="bg-white rounded-lg shadow-2xl p-8 w-1/3 max-w-md">
//                             <h2 className="text-2xl font-semibold mb-6 text-blue-700">Create New Project</h2>
//                             <form onSubmit={createProject}>
//                                 <div className="mb-6">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
//                                     <input
//                                         onChange={(e) => setProjectName(e.target.value)}
//                                         value={projectName}
//                                         type="text"
//                                         className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="flex justify-end gap-3">
//                                     <button
//                                         type="button"
//                                         className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors duration-300"
//                                         onClick={() => setIsModalOpen(false)}
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         onClick={() => { navigate('/') }}
//                                         className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
//                                     >
//                                         Create
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </main>
//     );
// };

// export default Home;


//2nd

import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user.context';
import axios from '../config/axios';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    // const createProject = (e) => {
    //     e.preventDefault();
    //     axios
    //         .post('/projects/create', { name: projectName })
    //         .then((res) => {
    //             setProjects([...projects, res.data.project]);
    //             setIsModalOpen(false);
    //             setProjectName('');
    //         })
    //         .catch((error) => console.log(error));
    // };

    const createProject = (e) => {
        e.preventDefault();
        axios
            .post('/projects/create', { name: projectName })
            .then((res) => {
                setProjects([...projects, res.data.project]);
                setIsModalOpen(false);
                setProjectName('');
            })
            .catch((error) => console.log(error));
    };

    // useEffect(() => {
    //     axios
    //         .get('/projects/all')
    //         .then((res) => {
    //             if (res.data && res.data.projects) setProjects(res.data.projects);
    //         })
    //         .catch((err) => console.log('Error fetching projects:', err));
    // }, []);

    useEffect(() => {
        axios.get('/projects/all').then((res) => {
            setProjects(res.data.projects)

        }).catch(err => {
            console.log(err)
        })

    }, [])


   

    const handleLogout = async () => {
        try {
            await axios.get('/users/logout');
            localStorage.removeItem('user');
            localStorage.removeItem("token");
            setUser(null);
            setUserData(null);
            navigate('/');
        } catch (err) {
            console.error('Logout failed:', err);
            setError('Logout failed. Please try again.');
        }
    };


    

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            fetchUserData(JSON.parse(storedUser).id);
        }
    }, [setUser]);

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

    return (
        <main className="min-h-screen font-poppins bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">

            <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg p-4 sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="text-xl font-bold text-white tracking-tight">
                            AI Agent
                        </Link>
                        <div className="space-x-4 text-white">
                            <Link to="/" className="hover:text-indigo-200 transition-colors">Home</Link>
                            <Link to="/about" className="hover:text-indigo-200 transition-colors">About</Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>

                                <Link to="/home" className="text-indigo-100 hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-md"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-100 transition-all duration-300 font-semibold"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-100 transition-all duration-300 font-semibold"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        {user && user.email && <span className="mr-4 font-semibold text-gray-300 "><i className="ri-user-fill mr-2 p-2 bg-white bg-opacity-30 rounded-full"></i> {user.email}</span>}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="p-6 max-w-5xl mx-auto mt-8">
                {/* New Project Button */}
                <div className="mb-8">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 text-white rounded-full bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        <i className="ri-add-line mr-2"></i> New Project
                    </button>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            onClick={() => navigate('/project', { state: { project } })}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 bg-gradient-to-bl from-blue-300  via-violet-200 to-purple-200"
                        >
                            <h2 className="font-semibold text-indigo-600 text-lg mb-2">{project.name}</h2>
                            <div className="flex items-center text-gray-600 text-sm">
                                <i className="ri-user-line mr-1"></i>
                                <span>Collaborators: {project.users.length}</span>
                            </div>
                        </div>
                    ))}
                </div>


                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
                        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Create New Project</h2>
                            <form onSubmit={createProject}>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Project Name
                                    </label>
                                    <input
                                        onChange={(e) => setProjectName(e.target.value)}
                                        value={projectName}
                                        type="text"
                                        className="w-full p-3 bg-gray-50 text-gray-800 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all duration-300"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={() => navigate('/')}
                                        className="px-6 py-2 text-white rounded-full bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 shadow-md"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Home;

