
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
            {console.log("foldercontentfromparent", folderContent)}
            <FileExplorer socket={socket} filesAndFolders={rootFilesAndFolders} inputLable={inputLable} folderContent={folderContent} />
            <CodeEditor />
            <Terminal />
        </div>
    );
}

function handleFileClick(item, socket) {

    // Request file content from the backend
    socket.emit("get-file-content", item.name); // Assuming item has a filePath property

    // Use type as needed
}




const FileExplorer = ({ filesAndFolders, inputLable, socket, folderContent }) => {
    console.log("foldercontentfromchild", folderContent);
    const [currentFolder, setCurrentFolder] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    // const [folderContent1, setFolderContent1] = useState([]); // State to track folder click count
    const folderContent1 = folderContent ? folderContent : [];
    // setFolderContent1(folderContent)

    console.log("foldercontent1", folderContent1);
    console.log("realfoldercontent", folderContent);

    // Function to handle click on a folder
    const toggleFolder = (folder) => {
        socket.emit("get-folder-contents", folder.name);
        setIsOpen(!isOpen);
        setCurrentFolder(folder.name)
    };

    // Function to recursively render folder contents
    const renderContents = (items) => {
        return items?.map(item => {
            if (item.type === 'folder') {
                return (

                    <div key={item.name} id='' className=" mb-2 cursor-pointer"  >
                        <img src="folder-icon.png" alt="Folder Icon" className="w-6 h-6 mr-2" />
                        <span onClick={() => toggleFolder(item)}>{item.name}</span>
                        {isOpen && (currentFolder === item.name) && (


                            <Tree data={folderContent1} />




                        )}
                    </div>

                );
            } else {
                return (
                    <div key={item.name} className="flex items-center mb-2 cursor-pointer" onClick={() => handleFileClick(item, socket)}>
                        <img src="file-icon.png" alt="File Icon" className="w-6 h-6 mr-2" />
                        <div>{item.name}</div>
                    </div>
                );
            }
        });
    };

    return (
        <div className="w-1/3 h-full border-r border-gray-300 overflow-y-auto">
            <h2 className="text-lg font-semibold p-4">File Explorer</h2>
            <div className="p-4">

                {console.log("filesandfolders", filesAndFolders)}
                {renderContents(filesAndFolders)}
            </div>
        </div>
    );
};


function Tree({ data }) {
    return (
        <div>
            {data.map(node => (
                <TreeNode key={node.name} node={node} />
            ))}
        </div>
    );
}

function TreeNode({ node }) {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div onClick={toggleOpen}>
                {node.type === 'folder' && (
                    <span>{isOpen ? '[-] ' : '[+] '}</span>
                )}
                {node.name}
            </div>
            {isOpen && node.children && node.children.length > 0 && (
                <div style={{ marginLeft: '20px' }}>
                    {node.children.map(child => (
                        <TreeNode key={child.name} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
}


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