// // // Coding.jsx
// // import React, { useEffect } from 'react';
// // import { io } from 'socket.io-client';
// // import { useSelectedValue } from '../SelectedValueContext';

// // const useSocket = (replitName) => {
// //     const socket = io('http://localhost:8000/', {
// //         query: {
// //             replitName,
// //         }
// //     });
// //     console.log("is'nt connected ");
// //     useEffect(() => {
// //         socket.on("connect", () => { console.log("connected", socket.id); })

// //         socket.on("welcome", (s) => console.log(` ${s}`));

// //         return () => {
// //             socket.disconnect();
// //         };
// //     }, []);
// // };

// // function Coding() {
// //     const { selectedValue } = useSelectedValue();
// //     console.log("selectedValue", selectedValue);
// //     useSocket(selectedValue);
// //     return <div>Coding</div>;
// // }

// // export default Coding;


// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { useLocation } from 'react-router-dom'; // Importing useLocation hook


// // const [rootFilesAndFolders, setrootFilesAndFolders] = useState([])
// const useSocket = (replitName, setrootFilesAndFolders) => {
//     const socket = io('http://localhost:8000/', {
//         query: {
//             replitName,
//         }
//     });

//     console.log("is'nt connected ");
//     socket.on("connect", () => { console.log("connecteddbroooooo", socket.id); })
//     useEffect(() => {
//         console.log("hellobroorbhai");
//         socket.on("connect", () => { console.log("connected", socket.id); })
//         console.log("kyahogya");
//         socket.on('init-files', (rootFilesAndFolders) => {
//             //recieving rootfilesandfolders
//             console.log('Received root files and folders:', rootFilesAndFolders);
//             // Process the received data as needed
//             setrootFilesAndFolders(rootFilesAndFolders)
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [replitName, setrootFilesAndFolders]);
// };

// function Coding() {

//     const location = useLocation(); // Accessing location state
//     const { selectedValue, inputLable, userName } = location.state || {}; // Destructuring variables from location state
//     const [rootFilesAndFolders, setrootFilesAndFolders] = useState([])
//     if (!inputLable) {
//         console.error("No input label provided");
//         throw new Error("Input Label not provided")
//     }
//     console.log("selectedValue", inputLable);
//     useSocket(inputLable, setrootFilesAndFolders);

//     // Now you can use selectedValue, inputLabel, and userName in your component

//     return <div className="flex h-screen">
//         <FileExplorer filesAndFolders={rootFilesAndFolders} />
//         <CodeEditor />
//         <Terminal />
//     </div>

// }



// function FileExplorer({ filesAndFolders }) {
//     return (
//         <div className="w-1/3 h-full border-r border-gray-300 overflow-y-auto">
//             <h2 className="text-lg font-semibold p-4">File Explorer</h2>
//             <div className="p-4">
//                 {filesAndFolders.map(item => (
//                     <div key={item.name} className="flex items-center mb-2">
//                         <img src={item.type === 'file' ? "file-icon.png" : "folder-icon.png"} alt="Icon" className="w-6 h-6 mr-2" />
//                         <span>{item.name}</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// function CodeEditor() {
//     const [code, setCode] = useState('');

//     return (
//         <div className="w-1/3 h-full border-r border-l border-gray-300">
//             <h2 className="text-lg font-semibold p-4">Code Editor</h2>
//             <textarea
//                 value={code}
//                 onChange={e => setCode(e.target.value)}
//                 className="w-full h-full p-4 outline-none resize-none"
//                 placeholder="Write your code here..."
//             ></textarea>
//         </div>
//     );
// }

// function Terminal() {
//     const [output, setOutput] = useState('');

//     useEffect(() => {
//         // Code to listen for terminal output
//     }, []);

//     return (
//         <div className="w-1/3 h-full border-l border-gray-300">
//             <h2 className="text-lg font-semibold p-4">Terminal</h2>
//             <div className="p-4 overflow-y-auto">
//                 {/* Render terminal output here */}
//             </div>
//         </div>
//     );
// }

// export default Coding;

// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { useLocation } from 'react-router-dom'; // Importing useLocation hook


// // const [rootFilesAndFolders, setrootFilesAndFolders] = useState([])
// const useSocket = (replitName, setrootFilesAndFolders) => {
//     const [socket, setSocket] = useState()
//     useEffect(() => {
//         const socket = io('http://localhost:8000/', {
//             query: {
//                 replitName,
//             }
//         });
//         setSocket(socket);

//         // console.log("is'nt connected ");
//         // socket.on("connect", () => { console.log("connecteddbroooooo", socket.id); })

//         // console.log("hellobroorbhai");
//         // socket.on("connect", () => { console.log("connected", socket.id); })

//         // console.log("kyahogya");
//         socket.on('init-files', (rootFilesAndFolders) => {
//             //recieving rootfilesandfolders
//             // console.log('Received root files and folders:', rootFilesAndFolders);
//             // Process the received data as needed
//             setrootFilesAndFolders(rootFilesAndFolders)
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [replitName, setrootFilesAndFolders]);
//     return socket;
// };


// function Coding() {

//     const location = useLocation(); // Accessing location state
//     const { selectedValue, inputLable, userName } = location.state || {}; // Destructuring variables from location state
//     const [rootFilesAndFolders, setrootFilesAndFolders] = useState([])


//     if (!inputLable) {
//         console.error("No input label provided");
//         throw new Error("Input Label not provided")
//     }
//     // console.log("selectedValue", inputLable);
//     const socket = useSocket(inputLable, setrootFilesAndFolders);

//     // Now you can use selectedValue, inputLabel, and userName in your component

//     return <div className="flex h-screen">
//         <FileExplorer socket={socket} filesAndFolders={rootFilesAndFolders} inputLable={inputLable} />
//         <CodeEditor />
//         <Terminal />
//     </div>

// }

// function handleFileOrFolderClick(item, currentDir, setCurrentDir, socket) {

//     if (item.type === 'file') {
//         // path = `/${item.name}`;
//         // Request file content from the backend
//         socket.emit("get-file-content", item); // Assuming item has a filePath property
//     } else if (item.type === 'folder') {
//         // Request folder contents from the backend
//         console.log("currentDirbefore", currentDir);
//         setCurrentDir(`$ ${currentDir}/${item.name}`)
//         console.log("currentDirafter", currentDir);
//         // path = `/${item.name}`;
//         socket.emit("get-folder-contents", `${currentDir}/${item.name}`); // Assuming item has a folderPath property
//     }
//     // Use type as needed
// }



// function FileExplorer({ filesAndFolders, inputLable, socket }) {
//     const rootDir = `./public/${inputLable}`
//     const [currentDir, setCurrentDir] = useState(rootDir)
//     console.log("currentdir", currentDir);
//     if ((filesAndFolders === null) || !filesAndFolders || filesAndFolders.length === 0) {
//         return (
//             <div className="w-1/3 h-full border-r border-gray-300 overflow-y-auto">
//                 <h2 className="text-lg font-semibold p-4">File Explorer</h2>
//                 <div className="p-4 flex justify-center items-center h-full">
//                     Loading...
//                 </div>
//             </div>
//         );
//     }

//     return (

//         <div className="w-1/3 h-full border-r border-gray-300 overflow-y-auto">
//             <h2 className="text-lg font-semibold p-4">File Explorer</h2>
//             <div className="p-4">
//                 {filesAndFolders.map(item => (
//                     <div key={item.name} className="flex items-center mb-2 cursor-pointer" onClick={() => handleFileOrFolderClick(item, currentDir, setCurrentDir, socket)}>
//                         <img src={item.type === 'file' ? "file-icon.png" : "folder-icon.png"} alt="Icon" className="w-6 h-6 mr-2" />
//                         <span>{item.name}</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


// function CodeEditor() {
//     const [code, setCode] = useState('');

//     return (
//         <div className="w-1/3 h-full border-r border-l border-gray-300">
//             <h2 className="text-lg font-semibold p-4">Code Editor</h2>
//             <textarea
//                 value={code}
//                 onChange={e => setCode(e.target.value)}
//                 className="w-full h-full p-4 outline-none resize-none"
//                 placeholder="Write your code here..."
//             ></textarea>
//         </div>
//     );
// }

// function Terminal() {
//     const [output, setOutput] = useState('');

//     useEffect(() => {
//         // Code to listen for terminal output
//     }, []);

//     return (
//         <div className="w-1/3 h-full border-l border-gray-300">
//             <h2 className="text-lg font-semibold p-4">Terminal</h2>
//             <div className="p-4 overflow-y-auto">
//                 {/* Render terminal output here */}
//             </div>
//         </div>
//     );
// }

// export default Coding;




// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { useLocation } from 'react-router-dom'; // Importing useLocation hook

// const useSocket = (replitName, setrootFilesAndFolders, setfileContent, setfolderContent) => {
//     const [socket, setSocket] = useState();
//     useEffect(() => {
//         const socket = io('http://localhost:8000/', {
//             query: {
//                 replitName,
//             }
//         });
//         setSocket(socket);

//         socket.on('init-files', (rootFilesAndFolders) => {
//             setrootFilesAndFolders(rootFilesAndFolders);
//         });
//         socket.on('file-content', (content) => {
//             setfileContent(content);
//             console.log(`Received content for file `, content);
//             // Handle the received content as needed
//         });
//         socket.on('folder-contents', (content) => {
//             setfolderContent(content);
//             console.log(`Received content for file '`, content);
//             // Handle the received content as needed
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [replitName, setrootFilesAndFolders]);

//     return socket;
// };

// function Coding() {
//     const location = useLocation(); // Accessing location state
//     const { inputLable } = location.state || {}; // Destructuring variables from location state
//     const [rootFilesAndFolders, setrootFilesAndFolders] = useState([]);
//     const [fileContent, setfileContent] = useState([]);
//     const [folderContent, setfolderContent] = useState([]);
//     const socket = useSocket(inputLable, setrootFilesAndFolders, setfileContent, setfolderContent);

//     if (!inputLable) {
//         console.error("No input label provided");
//         throw new Error("Input Label not provided");
//     }

//     return (
//         <div className="flex h-screen">
//             <FileExplorer socket={socket} filesAndFolders={rootFilesAndFolders} inputLable={inputLable} folderContent={folderContent} />
//             <CodeEditor />
//             <Terminal />
//         </div>
//     );
// }

// function handleFileClick(item, socket) {
//     // if (item.type === 'file') {
//     // Request file content from the backend
//     socket.emit("get-file-content", item.name); // Assuming item has a filePath property

//     // Use type as needed
// }
// function handleFolderClick(item, socket, setSelectedFolder) {
//     console.log("item", item);
//     // if (item.type === 'file') {
//     // Request file content from the backend
//     // socket.emit("get-file-content", item.name); // Assuming item has a filePath property
//     // } else if (item.type === 'folder') {
//     socket.emit("get-folder-contents", item.name); // Assuming item has a folderPath property
//     setSelectedFolder(item)
//     // }
//     // Use type as needed
// }
// function handleSubFolderClick(item, socket, setSelectedFolder) {
//     console.log("item", item);
//     // if (item.type === 'file') {
//     // Request file content from the backend
//     // socket.emit("get-file-content", item.name); // Assuming item has a filePath property
//     // } else if (item.type === 'folder') {
//     socket.emit("get-folder-contents", item.name); // Assuming item has a folderPath property
//     // setSelectedFolder(item)
//     // }
//     // Use type as needed
// }

// function FileExplorer({ filesAndFolders, inputLable, socket, folderContent }) {
//     const rootDir = `./public/${inputLable}`;
//     const [selectedParentFolder, setSelectedParentFolder] = useState(null);
//     const [currentDir, setCurrentDir] = useState(rootDir);

//     if (!filesAndFolders || filesAndFolders.length === 0) {
//         return (
//             <div className="w-1/3 h-full border-r border-gray-300 overflow-y-auto">
//                 <h2 className="text-lg font-semibold p-4">File Explorer</h2>
//                 <div className="p-4 flex justify-center items-center h-full">
//                     Loading...
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="w-1/3 h-full border-r border-gray-300 overflow-y-auto">
//             <h2 className="text-lg font-semibold p-4">File Explorer</h2>
//             <div className="p-4">
//                 {filesAndFolders.map(item => {
//                     if (item.type === 'folder') {
//                         // Render select component for folders
//                         return (
//                             <div key={item.name} className="flex items-center mb-2 cursor-pointer" >
//                                 <div className=''>
//                                     <img src="file-icon.png" alt="File Icon" className="w-6 h-6 mr-2" />
//                                     <span onClick={() => handleFolderClick(item, socket, setSelectedParentFolder)}>{item.name}</span>

//                                     {selectedParentFolder && selectedParentFolder.name == item.name ? (
//                                         <div>
//                                             <h3>Contents of {selectedParentFolder.name}:</h3>
//                                             <ul>
//                                                 {folderContent.map((item, index) => (
//                                                     console.log("itemofitem", item),
//                                                     item.type === "folder" ?
//                                                         <div key={index}>
//                                                             <img src="file-icon.png" alt="File Icon" className="w-6 h-6 mr-2" />
//                                                             <span onClick={() => handleSubFolderClick(item, socket, setSelectedFolder)}>{item.name}</span>
//                                                         </div>
//                                                         : <div key={index}>
//                                                             <img src="file-icon.png" alt="File Icon" className="w-6 h-6 mr-2" />
//                                                             <span >{item.name}</span>
//                                                         </div>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     ) : ""}
//                                 </div>
//                                 {/* {selectedFolder && (
//                                     <div>
//                                         <h3>Contents of {selectedFolder.name}:</h3>
//                                         <ul>
//                                             {folderContent.map((item, index) => (
//                                                 <li key={index}>{item.name}</li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )} */}

//                             </div>


//                         );
//                     } else {
//                         // Render div for files
//                         return (
//                             <div key={item.name} className="flex items-center mb-2 cursor-pointer" onClick={() => handleFileClick(item, socket)}>
//                                 <img src="file-icon.png" alt="File Icon" className="w-6 h-6 mr-2" />
//                                 <span>{item.name}</span>
//                             </div>
//                         );
//                     }
//                 })}
//                 {/* <div className="w-1/3 h-full border-r border-gray-300 overflow-y-auto">
//             <h2 className="text-lg font-semibold p-4">File Explorer</h2>
//             <div className="p-4">
//                 {filesAndFolders.map(item => (

//                     <div key={item.name} className="flex items-center mb-2 cursor-pointer" onClick={() => handleFileOrFolderClick(item, currentDir, setCurrentDir, socket)}>
//                         <img src={item.type === 'file' ? "file-icon.png" : "folder-icon.png"} alt="Icon" className="w-6 h-6 mr-2" />
//                         <span>{item.name}</span>
//                     </div>
//                 ))}
//             </div>
//         </div> */}
//             </div>
//         </div>
//     );
// }

// function CodeEditor() {
//     const [code, setCode] = useState('');

//     return (
//         <div className="w-1/3 h-full border-r border-l border-gray-300">
//             <h2 className="text-lg font-semibold p-4">Code Editor</h2>
//             <textarea
//                 value={code}
//                 onChange={e => setCode(e.target.value)}
//                 className="w-full h-full p-4 outline-none resize-none"
//                 placeholder="Write your code here..."
//             ></textarea>
//         </div>
//     );
// }

// function Terminal() {
//     const [output, setOutput] = useState('');

//     useEffect(() => {
//         // Code to listen for terminal output
//     }, []);

//     return (
//         <div className="w-1/3 h-full border-l border-gray-300">
//             <h2 className="text-lg font-semibold p-4">Terminal</h2>
//             <div className="p-4 overflow-y-auto">
//                 {/* Render terminal output here */}
//             </div>
//         </div>
//     );
// }

// export default Coding;



import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom'; // Importing useLocation hook

const useSocket = (replitName, setrootFilesAndFolders, setfileContent, setfolderContent) => {
    const [socket, setSocket] = useState();
    useEffect(() => {
        const socket = io('http://localhost:8000/', {
            query: {
                replitName,
            }
        });
        setSocket(socket);

        socket.on('init-files', (rootFilesAndFolders) => {
            setrootFilesAndFolders(rootFilesAndFolders);
        });
        socket.on('file-content', (content) => {
            setfileContent(content);
            console.log(`Received content for file `, content);
            // Handle the received content as needed
        });
        socket.on('folder-contents', (content) => {
            setfolderContent(content);
            console.log(`Received content for file '`, content);
            // Handle the received content as needed
        });

        return () => {
            socket.disconnect();
        };
    }, [replitName, setrootFilesAndFolders]);

    return socket;
};

function Coding() {
    const location = useLocation(); // Accessing location state
    const { inputLable } = location.state || {}; // Destructuring variables from location state
    const [rootFilesAndFolders, setrootFilesAndFolders] = useState([]);
    const [fileContent, setfileContent] = useState([]);
    const [folderContent, setfolderContent] = useState([]);
    const socket = useSocket(inputLable, setrootFilesAndFolders, setfileContent, setfolderContent);

    if (!inputLable) {
        console.error("No input label provided");
        throw new Error("Input Label not provided");
    }

    return (
        <div className="flex h-screen">
            <FileExplorer socket={socket} filesAndFolders={rootFilesAndFolders} inputLable={inputLable} folderContent={folderContent} />
            <CodeEditor />
            <Terminal />
        </div>
    );
}

function handleFileClick(item, socket) {
    // if (item.type === 'file') {
    // Request file content from the backend
    socket.emit("get-file-content", item.name); // Assuming item has a filePath property

    // Use type as needed
}
function handleParentFolderClick(item, socket, setSelectedFolder) {
    console.log("item", item);
    // if (item.type === 'file') {
    // Request file content from the backend
    // socket.emit("get-file-content", item.name); // Assuming item has a filePath property
    // } else if (item.type === 'folder') {
    socket.emit("get-folder-contents", item.name); // Assuming item has a folderPath property
    setSelectedFolder(item)
    // }
    // Use type as needed
}
function handleSubFolderClick(item, setShowSubFolderContent, setSelectedChildFolder) {
    // console.log("item", item);
    // // if (item.type === 'file') {
    // // Request file content from the backend
    // // socket.emit("get-file-content", item.name); // Assuming item has a filePath property
    // // } else if (item.type === 'folder') {
    // socket.emit("get-folder-contents", item.name); // Assuming item has a folderPath property
    setShowSubFolderContent(true),
        setSelectedChildFolder(item)

    // }
    // Use type as needed
}

function FileExplorer({ filesAndFolders, inputLable, socket, folderContent }) {
    const rootDir = `./public/${inputLable}`;
    const [selectedParentFolder, setSelectedParentFolder] = useState(null);
    const [showSubFolderContent, setShowSubFolderContent] = useState(false);
    const [selectedChildFolder, setSelectedChildFolder] = useState(null);
    const [currentDir, setCurrentDir] = useState(rootDir);

    if (!filesAndFolders || filesAndFolders.length === 0) {
        return (
            <div className="w-1/3 h-full border-r border-gray-300 overflow-y-auto">
                <h2 className="text-lg font-semibold p-4">File Explorer</h2>
                <div className="p-4 flex justify-center items-center h-full">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="w-1/3 h-full border-r border-gray-300 overflow-y-auto">
            <h2 className="text-lg font-semibold p-4">File Explorer</h2>
            <div className="p-4">
                {filesAndFolders.map(item => {
                    if (item.type === 'folder') {
                        // Render select component for folders
                        return (
                            <div key={item.name} className="flex items-center mb-2 cursor-pointer" >
                                <div className=''>
                                    <img src="file-icon.png" alt="File Icon" className="w-6 h-6 mr-2" />
                                    <span onClick={() => handleParentFolderClick(item, socket, setSelectedParentFolder)}>{item.name}</span>

                                    {selectedParentFolder && selectedParentFolder.name == item.name ? (
                                        <div>
                                            {/* <h3>Contents of {selectedParentFolder.name}:</h3> */}
                                            <ul>
                                                {folderContent.map((item, index) => (
                                                    console.log("itemofitem", item),
                                                    item.type === "folder" ?
                                                        <div key={index}>
                                                            <img src="file-icon.png" alt="File Icon" className="w-6 h-6 mr-2" />
                                                            <span onClick={() => handleSubFolderClick(item, setShowSubFolderContent, setSelectedChildFolder)}>{item.name}</span>
                                                            {console.log("selectedChild folder", selectedChildFolder?.children)}
                                                            {console.log("showSubFolderContent", showSubFolderContent)}

                                                            {showSubFolderContent ?
                                                                //  console.log("selected child folder", selectedChildFolder)
                                                                selectedChildFolder?.children.map((item, index) => {
                                                                    return <div key={index}>
                                                                        <img src="file-icon.png" alt="File Icon" className="w-6 h-6 mr-2" />
                                                                        <span onClick={() => handleSubFolderClick(item, setShowSubFolderContent, setSelectedChildFolder)} >{item.name}</span>
                                                                    </div>
                                                                })

                                                                : ""}
                                                        </div>
                                                        : <div key={index}>
                                                            <img src="file-icon.png" alt="File Icon" className="w-6 h-6 mr-2" />
                                                            <span >{item.name}</span>
                                                        </div>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : ""}
                                </div>
                                {/* {selectedFolder && (
                                    <div>
                                        <h3>Contents of {selectedFolder.name}:</h3>
                                        <ul>
                                            {folderContent.map((item, index) => (
                                                <li key={index}>{item.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )} */}

                            </div>


                        );
                    } else {
                        // Render div for files
                        return (
                            <div key={item.name} className="flex items-center mb-2 cursor-pointer" onClick={() => handleFileClick(item, socket)}>
                                <img src="file-icon.png" alt="File Icon" className="w-6 h-6 mr-2" />
                                <span>{item.name}</span>
                            </div>
                        );
                    }
                })}
                {/* <div className="w-1/3 h-full border-r border-gray-300 overflow-y-auto">
            <h2 className="text-lg font-semibold p-4">File Explorer</h2>
            <div className="p-4">
                {filesAndFolders.map(item => (

                    <div key={item.name} className="flex items-center mb-2 cursor-pointer" onClick={() => handleFileOrFolderClick(item, currentDir, setCurrentDir, socket)}>
                        <img src={item.type === 'file' ? "file-icon.png" : "folder-icon.png"} alt="Icon" className="w-6 h-6 mr-2" />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div> */}
            </div>
        </div>
    );
}

// function FileExplorer({ filesAndFolders, socket, folderContent }) {
//     const [expandedFolders, setExpandedFolders] = useState([]);


//     const handleFolderClick = (folderName, socket) => {

//         socket.emit("get-folder-contents", folderName)
//         console.log("fodlercaontent", folderContent);


//         if (expandedFolders.includes(folderName)) {
//             setExpandedFolders(expandedFolders.filter(name => name !== folderName));
//         } else {
//             setExpandedFolders([...expandedFolders, folderName]);
//         }
//     };

//     const renderContents = (items) => {
//         console.log("items", items);
//         return items.map(item => {
//             if (item?.type === 'folder') {
//                 console.log("itemhaiyar", item);
//                 const isExpanded = expandedFolders.includes(item.name);
//                 console.log("isExpanded", isExpanded);
//                 console.log("foldercontent", folderContent);
//                 return (
//                     <div key={item.name}>
//                         <div className="flex items-center mb-2 cursor-pointer" onClick={() => handleFolderClick(item.name, socket)}>
//                             <img src="file-icon.png" alt="File Icon" className="w-6 h-6 mr-2" />
//                             <span>{item.name}</span>
//                         </div>
//                         {console.log("itemdekhleyar", item)}
//                         {isExpanded && renderContents(item)}
//                     </div>
//                 );
//             } else {
//                 return (
//                     <div key={item.name} className="flex items-center mb-2 cursor-pointer" onClick={() => handleFileClick(item, socket)}>
//                         <img src="file-icon.png" alt="File Icon" className="w-6 h-6 mr-2" />
//                         <span>{item.name}</span>
//                     </div>
//                 );
//             }
//         });
//     };

//     return (
//         <div className="w-1/3 h-full border-r border-gray-300 overflow-y-auto">
//             <h2 className="text-lg font-semibold p-4">File Explorer</h2>
//             <div className="p-4">
//                 {console.log("filesand folders", filesAndFolders)}
//                 {renderContents(filesAndFolders)}
//             </div>
//         </div>
//     );
// }


function CodeEditor() {
    const [code, setCode] = useState('');

    return (
        <div className="w-1/3 h-full border-r border-l border-gray-300">
            <h2 className="text-lg font-semibold p-4">Code Editor</h2>
            <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full h-full p-4 outline-none resize-none"
                placeholder="Write your code here..."
            ></textarea>
        </div>
    );
}

function Terminal() {
    const [output, setOutput] = useState('');

    useEffect(() => {
        // Code to listen for terminal output
    }, []);

    return (
        <div className="w-1/3 h-full border-l border-gray-300">
            <h2 className="text-lg font-semibold p-4">Terminal</h2>
            <div className="p-4 overflow-y-auto">
                {/* Render terminal output here */}
            </div>
        </div>
    );
}

export default Coding;