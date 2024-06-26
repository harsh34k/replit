import { Server } from "socket.io";
import { getRootFilesAndFolders, getFileContent, getFolderContents, traverseDirectory } from "./wsHandler.js";
import { getAllFilesFromReplitNameFolder, createNewFolder, createNewFile } from "./backblaze.js";
import path from 'path';
import fs from 'fs';
import { log } from "console";

export default function initWs(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            transports: ['websocket', 'polling'],
            credentials: true,
        }
    });

    io.on("connection", async (socket) => {
        console.log(socket.id + " connected");
        const files = [];
        const folders = [];

        const replId = socket.handshake.query.replitName;
        if (!replId) {
            socket.disconnect();
            return;
        }
        await getAllFilesFromReplitNameFolder(replId)
        traverseDirectory(`./public/${replId}`, files, folders) // it will create a array of all folders and files

        console.log('Files:', files);
        console.log('Folders:', folders);


        // Send root-level files and folders when client connects
        const rootFilesAndFolders = getRootFilesAndFolders(`./public/${replId}`);
        console.log("rootfilesnadfolderder", rootFilesAndFolders);
        socket.emit('init-files', rootFilesAndFolders);

        socket.on("get-file-content", async (fileName) => {
            // const { name, type } = file;
            const { path: desiredPath } = files.find(file => file.name === fileName);
            const content = getFileContent(desiredPath);
            console.log("contentsoffile", content);
            if (content) {
                socket.emit('file-content', content //emit mtlb data bhejna or on matlb dusri trf data lena
                );
            } else {
                socket.emit('file-not-found', filePath);
            }
        });

        socket.on("get-folder-contents", async (folderName) => {
            console.log("atleast reaching here");
            const { path: desiredPath } = folders.find(folder => folder.name === folderName);
            console.log("folderPath", desiredPath);
            const contents = await getFolderContents(desiredPath);
            console.log("contentsoffolder", contents);
            socket.emit('folder-contents', contents);
        });

        socket.on("create-folder", async ({ folderName, currentOpenedFolder }) => {
            createNewFolder(folderName, currentOpenedFolder, folders)

        })
        socket.on("create-file", async ({ fileName, currentOpenedFolder }) => {
            createNewFile(fileName, currentOpenedFolder, files, folders)

        })

        socket.on("disconnect", () => {
            console.log(socket.id + " disconnected");
        });
    });
}

// async function  createNewFolder (){
//     await b2.authorize();
//     if (folders.some(folder => folder.name === folderName)) {
//         return socket.emit('existing-folder');
//     }
//     const { path } = folders.find(folder => folder.name === currentOpenedFolder)
//     console.log("path", path);
//     const newFolderPath = `${path}/${folderName}`;
//     // create new .bzEmpty file inside newFolderPath
//     fs.writeFileSync(`${newFolderPath}/.bzEmpty`, "This is an empty folder.");
//     const content = fs.readFileSync(`${newFolderPath}/.bzEmpty`, 'utf-8');
//     console.log("foldername", folderName);
//     console.log("parentFolder", currentOpenedFolder);
// }


// // import { Server, Socket } from "socket.io";
// import { Server as HttpServer } from "http";
// import path from "path";
// import { getAllFilesFromReplitNameFolder } from "./backblaze.js";

// export default function initWs(httpServer) {

//     const io = new Server(httpServer, {
//         cors: {
//             origin: "*",  // change to your domain
//             methods: ["GET", "POST"],
//             transports: ['websocket', 'polling'],
//             credentials: true,
//         }
//     })
//     // console.log(io);
//     // io.on("connection", (socket) => {
//     //     socket.emit("welcome", "Welcome!");
//     //     console.log(new Date(), "connected");
//     // })

//     io.on("connection", async (socket) => {
//         console.log(socket.id + " connected");
//         console.log("hello i think it is connected");
//         const replId = socket.handshake.query.replitName;
//         console.log("replitid", replId);
//         await getAllFilesFromReplitNameFolder(replId)
//         // .then((files) => {
//         //     if (!files || files.length == 0) return;
//         //     let fileData = {};
//         //     for (let f of files) {
//         //         fileData[f.file_name] = f.content;
//         //     }
//         //     socket.emit('init-data', fileData);
//         // });

//         // socket.on("disconnect", () => {
//         //     console.log(socket.id + " disconnected");
//         // });

//         // socket.on("saveFile", ({ filename, content }, callback) => {
//         //     try {
//         //         fs.writeFileSync(filename, content);
//         //         callback({ success: true });
//         //     } catch (err) {
//         //         callback({ success: false, error: err.toString() });
//         //     }
//         // });
//         // socket.on("", () => {
//         //     console.log("user disconnected");
//         // });

//         if (!replId) {
//             socket.disconnect();
//             return;
//         }
//         socket.on("disconnect", () => {
//             console.log("user disconnected");
//         });
//     })
// }

