
// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from '../config/axios';
// import { initializeSocket, receiveMessage, sendMessage } from '../config/socket';
// import { UserContext } from '../context/user.context';
// import Markdown from 'markdown-to-jsx';
// import { getWebContainer } from '../config/webcontainer';
// import hljs from 'highlight.js';
// // import 'highlight.js/styles/atom-one-dark.css'; // Or any other theme

// function SyntaxHighlightedCode(props) {
//     const ref = useRef(null)

//     React.useEffect(() => {
//         if (ref.current && props.className?.includes('lang-') && window.hljs) {
//             window.hljs.highlightElement(ref.current)

//             // hljs won't reprocess the element unless this attribute is removed
//             ref.current.removeAttribute('data-highlighted')
//         }
//     }, [props.className, props.children])

//     return <code {...props} ref={ref} />
// }



// const Project = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedUserId, setSelectedUserId] = useState(new Set());
//     const [project, setProject] = useState(location.state.project);
//     const [message, setMessage] = useState('');
//     const { user } = useContext(UserContext);
//     const messageBoxRef = React.createRef();

//     const [messages, setMessages] = useState([])
//     const [users, setUsers] = useState([]);
//     const [fileTree, setFileTree] = useState({})
//     // const [fileTree, setFileTree] = useState({})
//     const [isLoadingFileTree, setIsLoadingFileTree] = useState(false);

//     const [currentFile, setCurrentFile] = useState(null);
//     const [openFiles, setOpenFiles] = useState([]);

//     const [webContainer, setWebContainer] = useState(null)
//     const [iframeUrl, setIframeUrl] = useState(null);
//     const [runProcess, setRunProcess] = useState(null)






//     useEffect(() => {
//         initializeSocket(project._id);
//         if (!webContainer) {
//             getWebContainer().then(container => {
//                 setWebContainer(container)
//                 console.log("container started");
//             })
//         }



//         // receiveMessage('project-message', (data) => {
//         //     console.log(data);
//         //     // appendIncomingMessage(data);
//         //     // console.log(JSON.parse(data,message));
//         //     const message = JSON.parse(data.message)


//         //     console.log(message);

//         //     if (message.fileTree) {
//         //         setFileTree(message.fileTree)
//         //     }

//         //     setMessages(prevMessages => [...prevMessages, data])
//         // });


//         receiveMessage('project-message', data => {

//             // console.log(data)

//             if (data.sender._id == 'ai') {


//                 const message = JSON.parse(data.message)

//                 console.log(message)

//                 webContainer?.mount(message.fileTree)

//                 if (message.fileTree) {
//                     setFileTree(message.fileTree || {})
//                 }
//                 setMessages(prevMessages => [...prevMessages, data])
//             } else {


//                 setMessages(prevMessages => [...prevMessages, data])
//             }
//         })







//         axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {
//             setProject(res.data.project);
//             setFileTree(res.data.project.fileTree || {})
//             setMessages(res.data.project.chatHistory || []);
//         });

//         axios.get('/users/all').then(res => {
//             setUsers(res.data.users);
//         }).catch(err => {
//             console.log(err);
//         });
//     }, []);

//     // function saveFileTree(ft) {
//     //     axios.put('/projects/update-file-tree', {
//     //         projectId: project._id,
//     //         fileTree: ft
//     //     }).then(res => {
//     //         console.log(res.data);

//     //     }).catch(err => {
//     //         console.log(err);

//     //     })
//     // }

//     function saveFileTree(ft) {
//         axios.put('/projects/update-file-tree', {
//             projectId: project._id,
//             fileTree: ft
//         }).then(res => {
//             console.log(res.data)
//         }).catch(err => {
//             console.log(err)
//         })
//     }



//     function send() {
//         // if (!message.trim()) return;

//         sendMessage('project-message', {
//             message,
//             sender: user,
//         });
//         // console.log(message);


//         // appendOutgoingMessage(message);
//         setMessages(prevMessages => [...prevMessages, { sender: user, message }])
//         setMessage("");

//         saveChatMessage({ sender: user, message });
//     }


//     // const send = () => {
//     //     const newMessage = {
//     //         sender: {
//     //             _id: user._id,
//     //             email: user.email,
//     //         },
//     //         message: message,
//     //     };
//     //     setMessages(prevMessages => [...prevMessages, newMessage]);
//     //     setMessage('');
//     //     saveChatMessage(newMessage);
//     // };

//     const saveChatMessage = (msg) => {
//         axios.put('/projects/update-chat-history', {
//             projectId: project._id,
//             chatHistory: [...messages, msg],
//         }).then(() => {
//             console.log('Chat message saved');
//         }).catch(error => {
//             console.error('Error saving chat message:', error);
//         });
//     };





//     function addCollaborators() {

//         axios.put("/projects/add-user", {
//             projectId: location.state.project._id,
//             users: Array.from(selectedUserId)
//         }).then(res => {
//             console.log(res.data)
//             setIsModalOpen(false)

//         }).catch(err => {
//             console.log(err)
//         })

//     }

//     useEffect(() => {
//         if (messageBoxRef.current) {
//             messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
//         }
//     }, [messages]);


//     function WriteAiMessage(message) {

//         const messageObject = JSON.parse(message)

//         return (
//             <div
//                 className='overflow-auto bg-slate-950 text-white rounded-sm p-2'
//             >
//                 <Markdown
//                     children={messageObject.text}
//                     options={{
//                         overrides: {
//                             code: SyntaxHighlightedCode,
//                         },
//                     }}
//                 />
//             </div>)
//     }



//     return (
//         <main className='h-screen w-screen flex '>
//             {/* <section className='left relative flex flex-col  h-screen min-w-80 rounded-md'>
//                 <header className='flex justify-between items-center absolute z-10 p-2 px-5 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-md '>
//                     <button onClick={() => setIsModalOpen(true)} className='flex gap-2'>
//                         <i className="ri-add-fill mr-1"></i>
//                         <p>Add Collaborator</p>
//                     </button>
//                     <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2 rounded-full '>
//                         <i className="ri-group-fill"></i>
//                     </button>
//                 </header>


//                 <div className="conversation-area bg-gradient-to-br from-blue-50 to-blue-300 pt-14 pb-14 flex-grow flex flex-col h-full relative overflow-hidden">
//                     <div
//                         ref={messageBoxRef}
//                         className="message-box flex-grow flex flex-col m-1 gap-1 overflow-y-auto px-2 "
//                         style={{ maxHeight: "100%", minHeight: "0" }}
//                     >
//                         {messages.map((msg, index) => (
//                             <div key={index} className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'max-w-52'} ${msg.sender._id == user._id.toString() && 'ml-auto'}  message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}>
//                                 <small className='opacity-65 text-xs'>{msg.sender.email}</small>
//                                 <div className='text-sm'>
//                                     <div
//                                         className='m overflow-scroll'>

//                                         {msg.sender._id === 'ai' ?
//                                             WriteAiMessage(msg.message)
//                                             : <p>{msg.message}</p>}
//                                     </div>

//                                 </div>
//                             </div>
//                         ))}




//                         {messages.map((msg, index) => (
//                             <div key={index} className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'max-w-52'} ${msg.sender._id == user._id.toString() && 'ml-auto'}  message flex flex-col p-2 bg-blue-100 rounded-lg shadow-md w-fit`}>
//                                 <small className='opacity-65 text-xs'>{msg.sender.email}</small>
//                                 <div className='text-sm'>
//                                     {msg.sender._id === 'ai' ?
//                                         WriteAiMessage(msg.message)
//                                         : <p>{msg.message}</p>}
//                                 </div>
//                             </div>
//                         ))}

//                     </div>



//                     <div className="inputField w-full flex absolute bottom-0 bg-blue-400 border-t p-2">
//                         <input
//                             value={message}
//                             onKeyDown={(e) => {
//                                 if (e.key === 'Enter') {
//                                     send();
//                                 }
//                             }}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className='flex-grow p-2 px-3 border bg-white rounded-lg outline-none text-gray-800 shadow-sm'
//                             type="text"
//                             placeholder='Enter Message'
//                         />
//                         <button
//                             onClick={send}
//                             className='p-2 bg-blue-200 text-black rounded-lg ml-2'>
//                             <i className="ri-send-plane-fill"></i>
//                         </button>
//                     </div>
//                 </div>


//                 <div className={`sidepanel flex flex-col gap-2 w-full h-full bg-blue-100 shadow-lg absolute transition-all duration-300 ${isSidePanelOpen ? 'left-0' : '-left-full'} top-0`}>
//                     <header className='flex justify-between items-center p-4 px-5 w-full bg-slate-300'>
//                         <h2 className='font-semibold text-blue-800'>Collaborators</h2>
//                         <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
//                             <i className="ri-close-line"></i>
//                         </button>
//                     </header>

//                     <div className="user flex flex-col gap-2 cursor-pointer p-2 overflow-auto">
//                         {project.users && project.users.map(user => (
//                             <div key={user.email} className="flex gap-2  items-center hover:bg-blue-50 rounded-xl p-2 transition-colors duration-200">
//                                 <div className='aspect-square rounded-full p-4 text-blue-600 w-fit h-fit items-center justify-center bg-blue-200'>
//                                     <i className="ri-user-fill"></i>
//                                 </div>
//                                 <h2 className='font-semibold text-lg '>{user.email}</h2>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section> */}



//             <section className="left relative flex flex-col h-screen min-w-80 rounded-md bg-gray-50 shadow-lg">

//                 <header className="flex justify-between items-center absolute z-10 p-3 px-5 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-md shadow-md">
//                     <button
//                         onClick={() => setIsModalOpen(true)}
//                         className="flex gap-2 items-center bg-white bg-opacity-20 px-3 py-1 rounded-lg transition hover:bg-opacity-30"
//                     >
//                         <i className="ri-add-fill"></i>
//                         <p>Add Collaborator</p>
//                     </button>
//                     <button
//                         onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
//                         className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
//                     >
//                         <i className="ri-group-fill"></i>
//                     </button>
//                 </header>


//                 <div className="conversation-area bg-gradient-to-br from-blue-50 to-blue-200 pt-16 pb-16 flex-grow flex flex-col h-full overflow-hidden">
//                     <div
//                         ref={messageBoxRef}
//                         className="message-box flex-grow flex flex-col m-2 gap-2 overflow-y-auto px-3"
//                     >
//                         {messages.map((msg, index) => (
//                             <div
//                                 key={index}
//                                 className={`p-3 rounded-xl shadow-md w-fit ${msg.sender._id === 'ai'
//                                     ? "bg-gradient-to-r from-gray-100 to-gray-200 max-w-80 text-gray-800"
//                                     : "bg-gradient-to-r from-blue-500 to-blue-600 text-white max-w-60"
//                                     }  ${msg.sender._id == user._id.toString() && 'ml-auto'} `}
//                             >
//                                 <small className="opacity-70 text-xs block">{msg.sender.email}</small>
//                                 <div className="text-sm mt-1">
//                                     {msg.sender._id === 'ai' ? WriteAiMessage(msg.message) : <p>{msg.message}</p>}
//                                 </div>
//                             </div>
//                         ))}



//                         {/* {messages.map((msg, index) => (
//                             <div key={index} className={`p-3 rounded-xl shadow-md w-fit ${msg.sender._id === 'ai' ? "bg-gradient-to-r from-gray-100 to-gray-200 max-w-80 text-gray-800" : "bg-gradient-to-r from-blue-500 to-blue-600 text-white max-w-60 ml-auto"}`}>
//                                 <small className="opacity-70 text-xs block">{msg.sender.email}</small>
//                                 <div className="text-sm mt-1">
//                                     {msg.sender._id === 'ai' ? WriteAiMessage(msg.message) : <p>{msg.message}</p>}
//                                 </div>
//                             </div>
//                         ))} */}
//                     </div>


//                     <div className="inputField w-full flex absolute bottom-0 bg-white shadow-md border-t p-3 items-center">
//                         <input
//                             value={message}
//                             onKeyDown={(e) => e.key === "Enter" && send()}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="flex-grow p-3 px-4 border bg-gray-100 rounded-full outline-none text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400"
//                             type="text"
//                             placeholder="Type a message..."
//                         />
//                         <button
//                             onClick={send}
//                             className="p-3 bg-blue-500 text-white rounded-full ml-2 shadow-md hover:bg-blue-600 transition"
//                         >
//                             <i className="ri-send-plane-fill"></i>
//                         </button>
//                     </div>
//                 </div>


//                 <div
//                     className={`sidepanel flex flex-col gap-2 w-full h-full bg-gray-100 shadow-lg absolute transition-all duration-300 ${isSidePanelOpen ? "left-0" : "-left-full"
//                         } top-0`}
//                 >
//                     <header className="flex justify-between items-center p-4 px-5 w-full bg-blue-500 text-white shadow-md">
//                         <h2 className="font-semibold">Collaborators</h2>
//                         <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
//                             <i className="ri-close-line"></i>
//                         </button>
//                     </header>

//                     <div className="user-list flex flex-col gap-2 p-3 overflow-auto">
//                         {project.users && project.users.map(user => (
//                             <div
//                                 key={user.email}
//                                 className="flex gap-3 items-center hover:bg-blue-100 rounded-lg p-3 transition duration-200 cursor-pointer"
//                             >
//                                 <div className="w-10 h-10 flex items-center justify-center bg-blue-300 text-blue-800 rounded-full">
//                                     <i className="ri-user-fill"></i>
//                                 </div>
//                                 <h2 className="font-semibold text-blue-800">{user.email}</h2>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>


//             <section className="right bg-gradient-to-r  from-blue-200 to-blue-500 flex-grow h-full flex">
//                 {/* <div className="explrer h-full max-w-64 p-1  bg-blue-300 border-blue-200 border-2 rounded-lg min-w-48 shadow-md ">
//                     <div className="file-tree">
//                         {
//                             Object.keys(fileTree).map((file, index) => (
//                                 <div
//                                     onClick={() => {
//                                         setCurrentFile(file)
//                                         setOpenFiles([...new Set([...openFiles, file])])
//                                     }}
//                                     className="tree-elment cursor-pointer my-2 p-2 px-4 flex items-center gap-2 bg-sky-100 hover:bg-blue-200 rounded-md transition-colors duration-200">
//                                     <p
//                                         className='font-semibold text-lg'>
//                                         {file}</p>
//                                 </div>
//                             ))
//                         }
//                     </div>

//                 </div> */}

//                 <div className="explorer h-full max-w-64 min-w-48 p-3 bg-gradient-to-br from-blue-500 to-blue-700 border border-blue-300 rounded-lg shadow-lg text-white">
//                     <h2 className="font-semibold text-lg text-center mb-3"><i class="ri-folder-3-fill"></i> File Explorer</h2>

//                     <div className="file-tree space-y-2">
//                         {Object.keys(fileTree).map((file, index) => (
//                             <div
//                                 key={index}
//                                 onClick={() => {
//                                     setCurrentFile(file);
//                                     setOpenFiles([...new Set([...openFiles, file])]);
//                                 }}
//                                 className="tree-element cursor-pointer p-3 flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition duration-200 shadow-md"
//                             >
//                                 <i className="ri-file-text-line text-xl"></i>
//                                 <p className="font-medium text-white">{file}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>



//                 <div className="code-editer flex flex-col flex-grow h-full px-2">
//                     {/* <div className="top flex py-2 justify-between w-full ">
//                         <div className="files flex">

//                             {
//                                 openFiles.map((file, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => setCurrentFile(file)

//                                         }
//                                         className={`open-file cursor-pointer p-2 px-4 flex items-center w-fit gap-2 bg-blue-300 rounded-md mx-1 ${currentFile === file ? 'bg-blue-800/70 rounded-md' : ''}`}>
//                                         <p
//                                             className='font-semibold text-lg'
//                                         >{file}</p>
//                                     </button>
//                                 ))
//                             }

//                         </div>

//                         <div className="actions flex gap-2">
//                             <button
//                                 onClick={async()=>{
//                                    const installProcess = await webContainer.spawn("npm" , ["install"])
//                                     installProcess.output.pipeTo(new WritableStream({
//                                         write(chunk){
//                                             console.log(chunk);

//                                         }
//                                     }))

//                                    const runProcess = await webContainer.spawn("npm" , ["start"])
//                                    runProcess.output.pipeTo(new WritableStream({
//                                     write(chunk){
//                                         console.log(chunk);

//                                     }
//                                    }))
//                                 }}
//                                 className='p-2 px-4 bg-slate-500 text-black'
//                                 >
//                                     ls
//                                 </button>




//                             <button
//                                 onClick={async () => {
//                                     await webContainer.mount(fileTree)


//                                     const installProcess = await webContainer.spawn("npm", ["install"])



//                                     installProcess.output.pipeTo(new WritableStream({
//                                         write(chunk) {
//                                             console.log(chunk)
//                                         }
//                                     }))

//                                     if (runProcess) {
//                                         runProcess.kill()
//                                     }

//                                     let tempRunProcess = await webContainer.spawn("npm", ["start"]);

//                                     tempRunProcess.output.pipeTo(new WritableStream({
//                                         write(chunk) {
//                                             console.log(chunk)
//                                         }
//                                     }))

//                                     setRunProcess(tempRunProcess)

//                                     webContainer.on('server-ready', (port, url) => {
//                                         console.log(port, url)
//                                         setIframeUrl(url)
//                                     })

//                                 }}
//                                 className='p-2 px-4 bg-slate-500 text-white rounded-md'
//                             >
//                                 run
//                             </button>






//                         </div>

//                     </div> */}

//                     {/* <div className="bottom flex flex-grow max-w-full shrink overflow-auto">

//                         {fileTree[currentFile] && (
//                                 <textarea
//                                     value={fileTree[currentFile].content}
//                                     onChange={(e) => {
//                                         setFileTree({
//                                             ...fileTree,
//                                             [currentFile]: {
//                                                 content: e.target.value,
//                                             },
//                                         });
//                                     }}
//                                     className='w-full h-full'
//                                 ></textarea>
//                             )}



//                         {
//                             fileTree[currentFile] && (
//                                 <div className="code-editor-area h-full overflow-auto flex-grow bg-slate-50">
//                                     <pre
//                                         className="hljs h-full">
//                                         <code
//                                             className="hljs h-full outline-none"
//                                             contentEditable
//                                             suppressContentEditableWarning
//                                             onBlur={(e) => {
//                                                 const updatedContent = e.target.innerText;
//                                                 const ft = {
//                                                     ...fileTree,
//                                                     [currentFile]: {
//                                                         file: {
//                                                             contents: updatedContent
//                                                         }
//                                                     }
//                                                 }
//                                                 setFileTree(ft)
//                                                 saveFileTree(ft)
//                                             }}
//                                             dangerouslySetInnerHTML={{ __html: hljs.highlight('javascript', fileTree[currentFile].file.contents).value }}
//                                             style={{
//                                                 whiteSpace: 'pre-wrap',
//                                                 paddingBottom: '25rem',
//                                                 counterSet: 'line-numbering',
//                                             }}
//                                         />
//                                     </pre>
//                                 </div>
//                             )
//                         }


//                     </div> */}


//                     <div className="bottom flex flex-grow max-w-full shrink overflow-auto m-2 bg-gray-900/55 rounded-lg shadow-lg p-3 relative">
//                         {fileTree[currentFile] && (
//                             <div className="code-editor-area h-full overflow-auto flex-grow bg-gray-900 text-white rounded-lg relative">

//                                 <div className="flex justify-between items-center bg-gray-800 text-gray-300 p-2 px-4 rounded-t-lg">
//                                     <span className="text-sm font-semibold">{currentFile}</span>
//                                     <button
//                                         onClick={() => navigator.clipboard.writeText(fileTree[currentFile].file.contents)}
//                                         className="text-gray-400 hover:text-white transition"
//                                     >
//                                         <i className="ri-file-copy-line"></i>
//                                     </button>
//                                 </div>


//                                 <pre className="relative p-4 overflow-auto text-sm leading-6 rounded-b-lg">
//                                     <code
//                                         className="hljs block outline-none"
//                                         contentEditable
//                                         suppressContentEditableWarning
//                                         onBlur={(e) => {
//                                             const updatedContent = e.target.innerText;
//                                             const ft = {
//                                                 ...fileTree,
//                                                 [currentFile]: {
//                                                     file: {
//                                                         contents: updatedContent
//                                                     }
//                                                 }
//                                             };
//                                             setFileTree(ft);
//                                             saveFileTree(ft);
//                                         }}
//                                         dangerouslySetInnerHTML={{
//                                             __html: hljs.highlight("javascript", fileTree[currentFile].file.contents).value
//                                         }}
//                                         style={{
//                                             whiteSpace: "pre-wrap",
//                                             counterSet: "line-numbering",
//                                             paddingBottom: "4rem"
//                                         }}
//                                     />
//                                 </pre>
//                             </div>
//                         )}
//                     </div>







//                 </div>

//                 {iframeUrl && webContainer &&
//                     (<div className="flex min-w-60 flex-col h-full ">
//                         <div className="address-bar">
//                             <input type="text"
//                                 onChange={(e) => setIframeUrl(e.target.value)}
//                                 value={iframeUrl} className="w-full p-2 px-4 bg-slate-200" />
//                         </div>
//                         <iframe src={iframeUrl} className="w-60 h-full bg-blue-200 text-white"></iframe>
//                     </div>)
//                 }

//             </section>


//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
//                     <div className="bg-white p-4 rounded-lg w-96 max-w-full relative">
//                         <header className="flex justify-between items-center mb-4">
//                             <h2 className="text-xl font-semibold">Select User</h2>
//                             <button onClick={() => setIsModalOpen(false)} className="p-2">
//                                 <i className="ri-close-fill"></i>
//                             </button>
//                         </header>
//                         <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
//                             {users.map((user) => (
//                                 <div
//                                     key={user.id}
//                                     className={`user cursor-pointer  hover:bg-blue-100  rounded-full ${selectedUserId.has(user._id) ? 'bg-blue-300' : ''
//                                         } p-2 flex gap-2 items-center`}
//                                     onClick={() => {
//                                         setSelectedUserId(prev => {
//                                             const newSet = new Set(prev);
//                                             newSet.has(user._id) ? newSet.delete(user._id) : newSet.add(user._id);
//                                             return newSet;
//                                         });
//                                     }}
//                                 >
//                                     <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-blue-600 bg-blue-200">
//                                         <i className="ri-user-fill absolute"></i>
//                                     </div>
//                                     <h1 className="font-semibold text-lg">{user.email}</h1>
//                                 </div>
//                             ))}
//                         </div>
//                         <button onClick={addCollaborators} className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
//                             Add Collaborators
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </main>
//     );
// };

// export default Project;




//****************** */

// import React, { useState, useEffect, useContext, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "../config/axios";
// import { initializeSocket, receiveMessage, sendMessage } from "../config/socket";
// import { UserContext } from "../context/user.context";
// import Markdown from "markdown-to-jsx";
// import { getWebContainer } from "../config/webcontainer";
// import hljs from "highlight.js";
// // import "highlight.js/styles/monokai-sublime.css";
// import "highlight.js/styles/github-dark.css"


// function SyntaxHighlightedCode(props) {
//   const ref = useRef(null);

//   React.useEffect(() => {
//     if (ref.current && props.className?.includes("lang-") && window.hljs) {
//       window.hljs.highlightElement(ref.current);
//       ref.current.removeAttribute("data-highlighted");
//     }
//   }, [props.className, props.children]);

//   return <code {...props} ref={ref} />;
// }

// const Project = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);
//   const messageBoxRef = useRef(null);

//   const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState(new Set());
//   const [project, setProject] = useState(location.state.project);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [fileTree, setFileTree] = useState({});
//   const [currentFile, setCurrentFile] = useState(null);
//   const [openFiles, setOpenFiles] = useState([]);
//   const [webContainer, setWebContainer] = useState(null);
//   const [iframeUrl, setIframeUrl] = useState(null);
//   const [runProcess, setRunProcess] = useState(null);
//   const [isCopied, setIsCopied] = useState(false); // State for copy feedback

//   useEffect(() => {
//     initializeSocket(project._id);
//     if (!webContainer) {
//       getWebContainer().then((container) => {
//         setWebContainer(container);
//         console.log("Container started");
//       });
//     }

//     receiveMessage("project-message", (data) => {
//       if (data.sender._id === "ai") {
//         const message = JSON.parse(data.message);
//         webContainer?.mount(message.fileTree);
//         if (message.fileTree) setFileTree(message.fileTree || {});
//         setMessages((prev) => [...prev, data]);
//       } else {
//         setMessages((prev) => [...prev, data]);
//       }
//     });

//     axios.get(`/projects/get-project/${project._id}`).then((res) => {
//       setProject(res.data.project);
//       setFileTree(res.data.project.fileTree || {});
//       setMessages(res.data.project.chatHistory || []);
//     });

//     axios
//       .get("/users/all")
//       .then((res) => setUsers(res.data.users))
//       .catch((err) => console.log(err));
//   }, [project._id, webContainer]);

//   useEffect(() => {
//     if (messageBoxRef.current) {
//       messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const saveFileTree = (ft) => {
//     axios
//       .put("/projects/update-file-tree", {
//         projectId: project._id,
//         fileTree: ft,
//       })
//       .then((res) => console.log(res.data))
//       .catch((err) => console.log(err));
//   };

//   const send = () => {
//     if (!message.trim()) return;
//     sendMessage("project-message", { message, sender: user });
//     setMessages((prev) => [...prev, { sender: user, message }]);
//     setMessage("");
//     saveChatMessage({ sender: user, message });
//   };

//   const saveChatMessage = (msg) => {
//     axios
//       .put("/projects/update-chat-history", {
//         projectId: project._id,
//         chatHistory: [...messages, msg],
//       })
//       .then(() => console.log("Chat message saved"))
//       .catch((err) => console.error("Error saving chat message:", err));
//   };

//   const addCollaborators = () => {
//     axios
//       .put("/projects/add-user", {
//         projectId: project._id,
//         users: Array.from(selectedUserId),
//       })
//       .then((res) => {
//         console.log(res.data);
//         setIsModalOpen(false);
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleCopy = () => {
//     if (fileTree[currentFile]) {
//       navigator.clipboard.writeText(fileTree[currentFile].file.contents);
//       setIsCopied(true);
//       setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
//     }
//   };

//   const WriteAiMessage = (message) => {
//     const messageObject = JSON.parse(message);
//     return (
//       <div className="overflow-auto bg-[#2A3B5A] text-white rounded-md p-3 shadow-sm">
//         <Markdown
//           children={messageObject.text}
//           options={{ overrides: { code: SyntaxHighlightedCode } }}
//         />
//       </div>
//     );
//   };

//   return (
//     <main className="h-screen w-screen flex bg-[#F5F6F5]">

//       <section className="relative flex flex-col h-screen min-w-80 rounded-md shadow-lg bg-white">
//         <header className="flex justify-between items-center p-4 px-6 w-full bg-[#1A2A44] text-white rounded-t-md shadow-md">
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="flex gap-2 items-center bg-[#FF6F61] px-4 py-2 rounded-lg hover:bg-[#FF8A7A] transition"
//           >
//             <i className="ri-add-fill"></i> Add Collaborator
//           </button>
//           <button
//             onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
//             className="p-3 bg-[#FF6F61] rounded-full hover:bg-[#FF8A7A] transition"
//           >
//             <i className="ri-group-fill"></i>
//           </button>
//         </header>

//         <div className="conversation-area flex-grow flex flex-col h-full overflow-hidden bg-[#F5F6F5]  pb-20">
//           <div
//             ref={messageBoxRef}
//             className="message-box flex-grow flex flex-col m-4 gap-3 overflow-y-auto px-4"
//           >
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-4 rounded-xl shadow-md w-fit ${msg.sender._id === "ai"
//                     ? "bg-[#2A3B5A] max-w-80 text-white"
//                     : "bg-[#1A2A44] text-white max-w-60 " +
//                     (msg.sender._id === user._id.toString() ? "ml-auto" : "")
//                   }`}
//               >
//                 <small className="opacity-70 text-xs block">{msg.sender.email}</small>
//                 <div className="text-sm mt-2">
//                   {msg.sender._id === "ai" ? WriteAiMessage(msg.message) : <p>{msg.message}</p>}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="inputField w-full flex absolute bottom-0 bg-white shadow-md border-t p-4 items-center">
//             <input
//               value={message}
//               onKeyDown={(e) => e.key === "Enter" && send()}
//               onChange={(e) => setMessage(e.target.value)}
//               className="flex-grow p-3 px-5 border bg-[#F5F6F5] text-[#1A2A44] rounded-full outline-none shadow-sm focus:ring-2 focus:ring-[#FF6F61]"
//               type="text"
//               placeholder="Type a message..."
//             />
//             <button
//               onClick={send}
//               className="p-3 bg-[#FF6F61] text-white rounded-full ml-3 shadow-md hover:bg-[#FF8A7A] transition"
//             >
//               <i className="ri-send-plane-fill"></i>
//             </button>
//           </div>
//         </div>

//         <div
//           className={`sidepanel flex flex-col gap-3 w-full h-full bg-[#F5F6F5] shadow-lg absolute transition-all duration-300 ${isSidePanelOpen ? "left-0" : "-left-full"
//             } top-0`}
//         >
//           <header className="flex justify-between items-center p-4 px-6 w-full bg-[#1A2A44] text-white shadow-md">
//             <h2 className="font-semibold text-lg">Collaborators</h2>
//             <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
//               <i className="ri-close-line"></i>
//             </button>
//           </header>
//           <div className="user-list flex flex-col gap-3 p-4 overflow-auto">
//             {project.users &&
//               project.users.map((user) => (
//                 <div
//                   key={user.email}
//                   className="flex gap-4 items-center hover:bg-[#E8ECEF] rounded-lg p-3 transition duration-200 cursor-pointer"
//                 >
//                   <div className="w-10 h-10 flex items-center justify-center bg-[#FF6F61] text-white rounded-full">
//                     <i className="ri-user-fill"></i>
//                   </div>
//                   <h2 className="font-semibold text-[#1A2A44]">{user.email}</h2>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </section>


//       <section className="flex-grow h-full flex bg-[#E8ECEF] p-4">
//         <div className="explorer h-full max-w-72 min-w-56 p-4 bg-[#6291dc] border border-[#2A3B5A] rounded-lg shadow-lg text-white">
//           <h2 className="font-semibold text-lg text-center mb-4">
//             <i className="ri-folder-3-fill mr-2"></i>File Explorer
//           </h2>
//           <div className="file-tree space-y-3">
//             {Object.keys(fileTree).map((file, index) => (
//               <div
//                 key={index}
//                 onClick={() => {
//                   setCurrentFile(file);
//                   setOpenFiles([...new Set([...openFiles, file])]);
//                 }}
//                 className="tree-element cursor-pointer p-3 flex items-center gap-3 bg-[#2A3B5A] hover:bg-[#3B4C6F] rounded-lg transition duration-200 shadow-md"
//               >
//                 <i className="ri-file-text-line text-xl"></i>
//                 <p className="font-medium">{file}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="code-editor flex flex-col flex-grow h-full ml-4">
//           <div className="bottom flex flex-grow max-w-full shrink overflow-auto bg-[#6291dc] rounded-lg shadow-lg p-4 relative">
//             {fileTree[currentFile] ? (
//               <div className="code-editor-area h-full overflow-auto flex-grow bg-[#2A3B5A] text-white rounded-lg relative">
//                 <div className="flex  justify-between items-center bg-[#1A2A44] p-3 px-5 rounded-t-lg">
//                   <span className="text-sm font-semibold">{currentFile}</span>
//                   <button
//                     onClick={handleCopy}
//                     className="flex items-center gap-2 text-[#ffffff] hover:text-[#858585] transition"
//                   >
//                     {isCopied ? (
//                       <>
//                         <i className="ri-check-line"></i>
//                         <span className="text-sm">Copied</span>
//                       </>
//                     ) : (
//                       <i className="ri-file-copy-line"></i>
//                     )}
//                   </button>
//                 </div>
//                 <pre className="relative p-5 overflow-auto text-sm leading-6 rounded-b-lg">
//                   <code
//                     className="hljs block outline-none"
//                     contentEditable
//                     suppressContentEditableWarning
//                     onBlur={(e) => {
//                       const updatedContent = e.target.innerText;
//                       const ft = {
//                         ...fileTree,
//                         [currentFile]: { file: { contents: updatedContent } },
//                       };
//                       setFileTree(ft);
//                       saveFileTree(ft);
//                     }}
//                     dangerouslySetInnerHTML={{
//                       __html: hljs.highlight("javascript", fileTree[currentFile].file.contents).value,
//                     }}
//                     style={{ whiteSpace: "pre-wrap", paddingBottom: "6rem" }}
//                   />
//                 </pre>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-full w-full text-[#000000] animate-pulse">
//                 <span className="text-lg font-semibold opacity-75">
//                   Code is waiting...
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {iframeUrl && webContainer && (
//           <div className="flex min-w-64 flex-col h-full ml-4">
//             <div className="address-bar">
//               <input
//                 type="text"
//                 onChange={(e) => setIframeUrl(e.target.value)}
//                 value={iframeUrl}
//                 className="w-full p-3 px-5 bg-[#2A3B5A] text-white rounded-t-lg"
//               />
//             </div>
//             <iframe src={iframeUrl} className="w-full h-full bg-[#F5F6F5] rounded-b-lg" />
//           </div>
//         )}
//       </section>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="p-6 rounded-lg w-96 max-w-full relative bg-white text-[#1A2A44] shadow-lg">
//             <header className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold">Select User</h2>
//               <button onClick={() => setIsModalOpen(false)} className="p-2">
//                 <i className="ri-close-fill"></i>
//               </button>
//             </header>
//             <div className="users-list flex flex-col gap-3 mb-16 max-h-96 overflow-auto">
//               {users.map((user) => (
//                 <div
//                   key={user.id}
//                   className={`user cursor-pointer hover:bg-[#E8ECEF] rounded-full p-3 flex gap-3 items-center ${selectedUserId.has(user._id) ? "bg-[#FF6F61] text-white" : ""
//                     }`}
//                   onClick={() => {
//                     setSelectedUserId((prev) => {
//                       const newSet = new Set(prev);
//                       newSet.has(user._id) ? newSet.delete(user._id) : newSet.add(user._id);
//                       return newSet;
//                     });
//                   }}
//                 >
//                   <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 bg-[#FF6F61] text-white">
//                     <i className="ri-user-fill"></i>
//                   </div>
//                   <h1 className="font-semibold text-lg">{user.email}</h1>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={addCollaborators}
//               className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-5 py-2 bg-[#FF6F61] text-white rounded-md hover:bg-[#FF8A7A] transition"
//             >
//               Add Collaborators
//             </button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default Project;






import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../config/axios";
import { initializeSocket, receiveMessage, sendMessage } from "../config/socket";
import { UserContext } from "../context/user.context";
import Markdown from "markdown-to-jsx";
import { getWebContainer } from "../config/webcontainer";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

function SyntaxHighlightedCode(props) {
  const ref = useRef(null);

  React.useEffect(() => {
    if (ref.current && props.className?.includes("lang-") && window.hljs) {
      window.hljs.highlightElement(ref.current);
      ref.current.removeAttribute("data-highlighted");
    }
  }, [props.className, props.children]);

  return <code {...props} ref={ref} />;
}

const Project = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const messageBoxRef = useRef(null);

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(new Set());
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [fileTree, setFileTree] = useState({});
  const [currentFile, setCurrentFile] = useState(null);
  const [openFiles, setOpenFiles] = useState([]);
  const [webContainer, setWebContainer] = useState(null);
  const [iframeUrl, setIframeUrl] = useState(null);
  const [runProcess, setRunProcess] = useState(null);
  const [isCopied, setIsCopied] = useState(false);



  // const [text, setText] = useState("");

  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Set language
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setMessage(speechText); // Set text input with speech
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
  };





  useEffect(() => {
    initializeSocket(project._id);
    if (!webContainer) {
      getWebContainer().then((container) => {
        setWebContainer(container);
        console.log("Container started");
      });
    }


    receiveMessage('project-message', data => {

      // console.log(data)

      if (data.sender._id == 'ai') {


        const message = JSON.parse(data.message)

        console.log(message)

        webContainer?.mount(message.fileTree)

        if (message.fileTree) {
          setFileTree(message.fileTree || {})
        }
        setMessages(prevMessages => [...prevMessages, data])
      } else {


        setMessages(prevMessages => [...prevMessages, data])
      }
    })


    axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {
      setProject(res.data.project);
      setFileTree(res.data.project.fileTree || {})
      setMessages(res.data.project.chatHistory || []);
    });

    axios.get('/users/all').then(res => {
      setUsers(res.data.users);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  function saveFileTree(ft) {
    axios.put('/projects/update-file-tree', {
      projectId: project._id,
      fileTree: ft
    }).then(res => {
      console.log(res.data);

    }).catch(err => {
      console.log(err);

    })
  }

  



  function send() {
    // if (!message.trim()) return;

    sendMessage('project-message', {
      message,
      sender: user,
    });
    // console.log(message);


    // appendOutgoingMessage(message);
    setMessages(prevMessages => [...prevMessages, { sender: user, message }])
    setMessage("");

    saveChatMessage({ sender: user, message });
  }


  // const send = () => {
  //     const newMessage = {
  //         sender: {
  //             _id: user._id,
  //             email: user.email,
  //         },
  //         message: message,
  //     };
  //     setMessages(prevMessages => [...prevMessages, newMessage]);
  //     setMessage('');
  //     saveChatMessage(newMessage);
  // };

  const saveChatMessage = (msg) => {
    axios.put('/projects/update-chat-history', {
      projectId: project._id,
      chatHistory: [...messages, msg],
    }).then(() => {
      console.log('Chat message saved');
    }).catch(error => {
      console.error('Error saving chat message:', error);
    });
  };


  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const addCollaborators = () => {
    axios
      .put("/projects/add-user", {
        projectId: project._id,
        users: Array.from(selectedUserId),
      })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCopy = () => {
    if (fileTree[currentFile]) {
      navigator.clipboard.writeText(fileTree[currentFile].file.contents);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const WriteAiMessage = (message) => {
    const messageObject = JSON.parse(message);
    return (
      <div className="overflow-auto bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl p-4 shadow-md">
        <Markdown
          children={messageObject.text}
          options={{ overrides: { code: SyntaxHighlightedCode } }}
        />
      </div>
    );
  };

  return (
    <main className="h-screen w-screen flex font-poppins bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Chat Section */}
      <section className="relative flex flex-col h-screen min-w-96 bg-white rounded-xl shadow-lg">
        <header className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow-md">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex gap-2 items-center px-4 py-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-100 transition-all duration-300 font-semibold"
          >
            <i className="ri-add-fill"></i> Add Collaborator
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-3 bg-white text-indigo-600 rounded-full hover:bg-indigo-100 transition-all duration-300"
          >
            <i className="ri-group-fill"></i>
          </button>
        </header>

        <div className="conversation-area flex-grow flex flex-col h-full overflow-hidden bg-gray-50 pb-20">
          <div
            ref={messageBoxRef}
            className="message-box flex-grow flex flex-col m-4 gap-3 overflow-y-auto px-4"
          >
            {/* {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl shadow-md w-fit max-w-xs ${msg.sender._id === "ai"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
                  : "bg-gradient-to-r from-gray-700 to-gray-600 text-white " +
                  (msg.sender._id === user._id.toString() ? "ml-auto" : "")
                  }`}
              >
                <small className="opacity-70 text-xs block">{msg.sender.email}</small>
                <div className="text-sm mt-2">
                  {msg.sender._id === "ai" ? WriteAiMessage(msg.message) : <p>{msg.message}</p>}
                </div>
              </div>
            ))} */}
            {messages.map((msg, index) => (
  <div
    key={index}
    className={`p-4 rounded-lg shadow-md w-fit max-w-sm transition-all duration-300 hover:shadow-lg ${
      msg.sender._id === "ai"
        ? "bg-gradient-to-r from-indigo-700 to-blue-600 text-white"
        : msg.sender._id === user._id.toString()
        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white ml-auto"
        : "bg-gradient-to-r from-gray-800 to-gray-600 text-white"
    } animate-fade-in`}
  >
    <small className="opacity-70 text-xs block">{msg.sender.email}</small>
    <div className="text-sm mt-2">
      {msg.sender._id === "ai" ? WriteAiMessage(msg.message) : <p>{msg.message}</p>}
    </div>
  </div>
))}
          </div>

          <div className="inputField w-full flex absolute bottom-0 bg-white shadow-md border-t p-4 items-center">
            <input
              value={message}
              onKeyDown={(e) => e.key === "Enter" && send()}
              onChange={(e) => setMessage(e.target.value)

              }

              className="flex-grow p-3 bg-gray-50 text-gray-800 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              type="text"
              placeholder="Type a message..."
            />
            <button
              onClick={startListening}
              className={`ml-2 p-2 rounded-full ${isListening ? "bg-gradient-to-r from-red-600 to-red-400" : "bg-gradient-to-r from-indigo-500 to-blue-400"
                } text-white`}
            >
              <i class="ri-mic-line"></i>

            </button>

            <button
              onClick={send}
              className="p-3 bg-gradient-to-r from-indigo-500 to-blue-400 text-white rounded-full ml-3 shadow-md hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"
            >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        <div
          className={`sidepanel flex flex-col gap-3 w-full h-full bg-gray-50 shadow-lg absolute transition-all duration-300 ${isSidePanelOpen ? "left-0" : "-left-full"
            } top-0 rounded-xl`}
        >
          <header className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md rounded-t-xl">
            <h2 className="font-semibold text-lg">Collaborators</h2>
            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className="text-white">
              <i className="ri-close-line"></i>
            </button>
          </header>
          <div className="user-list flex flex-col gap-3 p-4 overflow-auto">
            {project.users &&
              project.users.map((user) => (
                <div
                  key={user.email}
                  className="flex gap-4 items-center hover:bg-gray-200 rounded-xl p-3 transition duration-200 cursor-pointer"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-full">
                    <i className="ri-user-fill"></i>
                  </div>
                  <h2 className="font-semibold text-gray-800">{user.email}</h2>
                </div>
              ))}
          </div>
        </div>
      </section>


      <section className="flex-grow h-full flex p-4">
        <div className="explorer h-full max-w-72 min-w-56 p-4 bg-gradient-to-br from-indigo-500 to-blue-400 border border-indigo-600 rounded-xl shadow-lg text-white">
          <h2 className="font-semibold text-lg text-center mb-4">
            <i className="ri-folder-3-fill mr-2"></i>File Explorer
          </h2>
          <div className="file-tree space-y-3">
            {Object.keys(fileTree).map((file, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentFile(file);
                  setOpenFiles([...new Set([...openFiles, file])]);
                }}
                className="tree-element cursor-pointer p-3 flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition duration-200 shadow-md"
              >
                <i className="ri-file-text-line text-xl"></i>
                <p className="font-medium">{file}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="code-editor flex flex-col flex-grow h-full ml-4">
          <div className="bottom flex flex-grow max-w-full shrink overflow-auto bg-indigo-500 rounded-xl shadow-lg p-4 relative">
            <svg
              className="absolute bottom-0 left-0 w-full h-24 text-blue-200/60"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="currentColor"
                d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,197.3C960,171,1056,117,1152,106.7C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
            {fileTree[currentFile] ? (
              <div className="code-editor-area h-full overflow-auto flex-grow bg-gray-800 text-white rounded-xl relative">
                <div className="flex justify-between items-center bg-gradient-to-r from-gray-700 to-gray-600 p-3 px-5 rounded-t-xl">
                  <span className="text-sm font-semibold text-white">{currentFile}</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-white hover:text-gray-300 transition"
                  >
                    {isCopied ? (
                      <>
                        <i className="ri-check-line"></i>
                        <span className="text-sm">Copied</span>
                      </>
                    ) : (
                      <i className="ri-file-copy-line"></i>
                    )}
                  </button>
                </div>
                <pre className="relative p-4 overflow-auto text-sm leading-6 rounded-b-lg">
                  <code
                    className="hljs block outline-none"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const updatedContent = e.target.innerText;
                      const ft = {
                        ...fileTree,
                        [currentFile]: {
                          file: {
                            contents: updatedContent
                          }
                        }
                      };
                      setFileTree(ft);
                      saveFileTree(ft);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: hljs.highlight("javascript", fileTree[currentFile].file.contents).value
                    }}
                    style={{
                      whiteSpace: "pre-wrap",
                      counterSet: "line-numbering",
                      paddingBottom: "4rem"
                    }}
                  />
                </pre>
                {/* <pre className="relative p-5 overflow-auto text-sm leading-6 rounded-b-xl">
                  <code
                    className="hljs block outline-none"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const updatedContent = e.target.innerText;
                      const ft = {
                        ...fileTree,
                        [currentFile]: { file: { contents: updatedContent } },
                      };
                      setFileTree(ft);
                      saveFileTree(ft);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: hljs.highlight("javascript", fileTree[currentFile].file.contents).value,
                    }}
                    style={{ whiteSpace: "pre-wrap", paddingBottom: "6rem" }}
                  />
                </pre> */}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full w-full text-white animate-pulse">
                <span className="text-lg font-semibold opacity-75">
                  Code is waiting...
                </span>
              </div>
            )}
          </div>
        </div>

        {iframeUrl && webContainer && (
          <div className="flex min-w-64 flex-col h-full ml-4">
            <div className="address-bar">
              <input
                type="text"
                onChange={(e) => setIframeUrl(e.target.value)}
                value={iframeUrl}
                className="w-full p-3 px-5 bg-gray-700 text-white rounded-t-xl"
              />
            </div>
            <iframe src={iframeUrl} className="w-full h-full bg-gray-50 rounded-b-xl" />
          </div>
        )}
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
            <header className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-indigo-600">Select User</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-600 hover:text-gray-800">
                <i className="ri-close-fill"></i>
              </button>
            </header>
            <div className="users-list flex flex-col gap-3 mb-16 max-h-96 overflow-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`user cursor-pointer hover:bg-gray-100 rounded-xl p-3 flex gap-3 items-center ${selectedUserId.has(user._id) ? "bg-indigo-500 text-white" : ""
                    }`}
                  onClick={() => {
                    setSelectedUserId((prev) => {
                      const newSet = new Set(prev);
                      newSet.has(user._id) ? newSet.delete(user._id) : newSet.add(user._id);
                      return newSet;
                    });
                  }}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-full">
                    <i className="ri-user-fill"></i>
                  </div>
                  <h1 className="font-semibold text-lg">{user.email}</h1>
                </div>
              ))}
            </div>
            <button
              onClick={addCollaborators}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-2 text-white rounded-full bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 shadow-md"
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;