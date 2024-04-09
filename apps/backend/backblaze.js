// import B2 from 'backblaze-b2';
// import fs from "fs"
// const BLACKBLAZE_DESTINATION_BUCKETNAME = "UsersBucket"
// const BLACKBLAZE_DESTINATION_KEYID = "005f16dfa3f7a580000000003"
// const BLACKBLAZE_DESTINATION_APPLICATION_KEY = "K005v3L1hF+1yqRp3lK2VLX5oAwIHDY"
// const BLACKBLAZE_DESTINATION_BUCKETID = "bf41862d4f0a232f87ea0518"

// const BLACKBLAZE_APPLICATION_KEY = "K0053d0WpVi2Xk5bCDhAOoyfBnnFsdo"
// const BLACKBLAZE_KEYID = "005f16dfa3f7a580000000001"
// const BLACKBLAZE_HARSH_BUCKETID = "9f11b69ddfaa03af87ea0518"
// const BLACKBLAZE_BUCKET_NAME = "HarshBucket"
// const b2 = new B2({
//     applicationKeyId: BLACKBLAZE_DESTINATION_KEYID,
//     // keyName: process.env.BLACKBLAZE_KEYNAME,
//     applicationKey: BLACKBLAZE_DESTINATION_APPLICATION_KEY,
//     // applicationKeyId: BLACKBLAZE_KEYID,
//     // // keyName: process.env.BLACKBLAZE_KEYNAME,
//     // applicationKey: BLACKBLAZE_APPLICATION_KEY,

// });
// const b2Bucket2 = new B2({
//     applicationKeyId: BLACKBLAZE_KEYID,
//     // keyName: process.env.BLACKBLAZE_KEYNAME,
//     applicationKey: BLACKBLAZE_APPLICATION_KEY,
//     // applicationKeyId: BLACKBLAZE_KEYID,
//     // // keyName: process.env.BLACKBLAZE_KEYNAME,
//     // applicationKey: BLACKBLAZE_APPLICATION_KEY,

// });

// const copyBaseFilesFromBlackBlaze = async (submittedValue, replitName) => {
//     try {
//         console.log(BLACKBLAZE_DESTINATION_KEYID, BLACKBLAZE_DESTINATION_APPLICATION_KEY);
//         console.log("replitName1", replitName);
//         await b2.authorize()
//         await downloadFilesAndReupload(replitName, submittedValue)
//         // return true;

//     } catch (error) {
//         console.error("Error retrieving or uploading files:", error);
//         throw error;
//     }
// }

// async function downloadFilesAndReupload(replitName, submittedValue) {
//     try {
//         // Authorize with Backblaze B2
//         await b2.authorize();
//         await b2Bucket2.authorize()

//         // Check if folder already exists


//         // List files in the source folder
//         const files = await b2Bucket2.listFileNames({
//             bucketId: BLACKBLAZE_HARSH_BUCKETID,
//             prefix: `${submittedValue}/`,
//         });
//         // console.log(" files from download and reupload", files.data.files);
//         // Iterate through the list of files
//         for (const file of files.data.files) {
//             // Download the file
//             // console.log("control here");
//             // console.log("b2Bucket2,", b2Bucket2);
//             // const fileInfo = await b2Bucket2.getFileInfo({ fileId: file.fileId })
//             // console.log("fileInfo", fileInfo);
//             const filePath = file.fileName
//             const parts = filePath.split('/');
//             const fileName = parts[parts.length - 1];
//             const fileData = await b2Bucket2.downloadFileById({
//                 fileId: file.fileId,
//             });
//             // console.log("filedata", fileData.data);

//             // Write the downloaded file to local disk
//             fs.writeFileSync(`./public/node/${fileName}`, fileData.data);

//             // Re-upload the file to the destination folder
//             const fileContent = fs.readFileSync(`./public/node/${fileName}`);
//             // console.log("filecontent", fileContent);
//             const { data: { authorizationToken, uploadUrl } } = await b2.getUploadUrl({
//                 bucketId: BLACKBLAZE_DESTINATION_BUCKETID,
//             });
//             // console.log("done dona done");
//             // console.log("replitName3", replitName);

//             await b2.uploadFile({
//                 uploadUrl,
//                 uploadAuthToken: authorizationToken,
//                 fileName: `${replitName}/${fileName}`,
//                 data: fileContent,
//                 contentLength: fileContent.byteLength,
//                 mime: 'application/octet-stream', // Adjust MIME type if necessary
//                 hash: ''
//             });
//             await getAllFilesFromReplitNameFolder(b2, replitName)


//             console.log(`File '${file.fileName}' uploaded to '${replitName}' successfully.`);
//         }
//     } catch (error) {
//         console.error('Error downloading files and re-uploading:', error);
//     }
// }

// const getAllFilesFromReplitNameFolder = async (bucket, folderName) => {
//     const files = await bucket.listFileNames({
//         bucketId: BLACKBLAZE_DESTINATION_BUCKETID,
//         prefix: `${folderName}/`,
//     });
//     console.log("files in final folder", files.data.files);
//     return files;
// }

// export { copyBaseFilesFromBlackBlaze }


import B2 from 'backblaze-b2';
import { replitNameToExport } from './app.js';
import fs from "fs"
import path from 'path';
const BLACKBLAZE_DESTINATION_BUCKETNAME = "UsersBucket"
const BLACKBLAZE_DESTINATION_KEYID = "005f16dfa3f7a580000000003"
const BLACKBLAZE_DESTINATION_APPLICATION_KEY = "K005v3L1hF+1yqRp3lK2VLX5oAwIHDY"
const BLACKBLAZE_DESTINATION_BUCKETID = "bf41862d4f0a232f87ea0518"

const BLACKBLAZE_APPLICATION_KEY = "K0053d0WpVi2Xk5bCDhAOoyfBnnFsdo"
const BLACKBLAZE_KEYID = "005f16dfa3f7a580000000001"
const BLACKBLAZE_HARSH_BUCKETID = "9f11b69ddfaa03af87ea0518"
const BLACKBLAZE_BUCKET_NAME = "HarshBucket"
const b2 = new B2({
    applicationKeyId: BLACKBLAZE_DESTINATION_KEYID,
    // keyName: process.env.BLACKBLAZE_KEYNAME,
    applicationKey: BLACKBLAZE_DESTINATION_APPLICATION_KEY,
    // applicationKeyId: BLACKBLAZE_KEYID,
    // // keyName: process.env.BLACKBLAZE_KEYNAME,
    // applicationKey: BLACKBLAZE_APPLICATION_KEY,

});
const b2Bucket2 = new B2({
    applicationKeyId: BLACKBLAZE_KEYID,
    // keyName: process.env.BLACKBLAZE_KEYNAME,
    applicationKey: BLACKBLAZE_APPLICATION_KEY,
    // applicationKeyId: BLACKBLAZE_KEYID,
    // // keyName: process.env.BLACKBLAZE_KEYNAME,
    // applicationKey: BLACKBLAZE_APPLICATION_KEY,

});

const copyBaseFilesFromBlackBlaze = async (submittedValue, replitName) => {
    try {
        console.log(BLACKBLAZE_DESTINATION_KEYID, BLACKBLAZE_DESTINATION_APPLICATION_KEY);
        console.log("replitName1", replitName);
        await b2.authorize()
        console.log("hi");
        await downloadFilesAndReupload(replitName, submittedValue)
        // return true;

    } catch (error) {
        console.error("Error retrieving or uploading files:", error);
        throw error;
    }
}

async function downloadFilesAndReupload(replitName, submittedValue) {
    try {
        // Authorize with Backblaze B2
        await b2.authorize();
        await b2Bucket2.authorize()

        // Check if folder already exists
        const filesinb2 = await b2.listFileNames({
            bucketId: BLACKBLAZE_DESTINATION_BUCKETID,
            prefix: `${replitName}/`,
        });


        if (filesinb2.data.files.length > 0) {
            console.log(`Folder '${folderName}' already exists.`);
            // return await getAllFilesFromReplitNameFolder(b2, replitName)
            return;
        }

        // List files in the source folder
        const files = await b2Bucket2.listFileNames({
            bucketId: BLACKBLAZE_HARSH_BUCKETID,
            prefix: `${submittedValue}/`,
        });
        console.log("filesinb2", files.data.files);

        // console.log(" files from download and reupload", files.data.files);
        // Iterate through the list of files
        for (const file of files.data.files) {
            // Download the file
            // console.log("control here");
            // console.log("b2Bucket2,", b2Bucket2);
            // const fileInfo = await b2Bucket2.getFileInfo({ fileId: file.fileId })
            console.log("filesiterating", file);
            const filePath = file.fileName
            const parts = filePath.split('/');
            const fileName = parts[parts.length - 1];
            const fileData = await b2Bucket2.downloadFileById({
                fileId: file.fileId,
            });
            console.log("filedata", fileData.data);

            // Write the downloaded file to local disk
            fs.writeFileSync(`./public/node/${fileName}`, fileData.data);

            // Re-upload the file to the destination folder
            const fileContent = fs.readFileSync(`./public/node/${fileName}`);
            // console.log("filecontent", fileContent);
            const { data: { authorizationToken, uploadUrl } } = await b2.getUploadUrl({
                bucketId: BLACKBLAZE_DESTINATION_BUCKETID,
            });
            // console.log("done dona done");
            // console.log("replitName3", replitName);

            await b2.uploadFile({
                uploadUrl,
                uploadAuthToken: authorizationToken,
                fileName: `${replitName}/${fileName}`,
                data: fileContent,
                contentLength: fileContent.byteLength,
                mime: 'application/octet-stream', // Adjust MIME type if necessary
                hash: ''
            });
            fs.unlink(`./public/node/${fileName}`, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return;
                }
            })
            // await getAllFilesFromReplitNameFolder(b2, replitName)
            console.log(`File '${file.fileName}' uploaded to '${replitName}' successfully.`);



        }
    } catch (error) {
        console.error('Error downloading files and re-uploading:', error);
    }
}

const getAllFilesFromReplitNameFolder = async (folderName) => {
    await b2.authorize()
    const bucket = b2;
    const files = await bucket.listFileNames({
        bucketId: BLACKBLAZE_DESTINATION_BUCKETID,
        prefix: `${folderName}/`,
    });
    console.log("files", files.data.files);
    fs.mkdirSync(`./public/${folderName}`, { recursive: true });
    console.log('Directory created successfully.');
    for (const file of files.data.files) {
        const filePath = file.fileName
        console.log("filepath1", filePath);
        const parts = filePath.split('/');
        const fileData = await bucket.downloadFileById({
            fileId: file.fileId,
        });
        console.log("parts12", parts);
        if (!(parts.length > 2)) {
            const fileName = parts[parts.length - 1];

            fs.writeFileSync(`./public/${folderName}/${fileName}`, fileData.data);
        }
        const filePathRemovingFolderName = parts.slice(1).join('/');


        // console.log("filedata", fileData.data);
        createFolderAndSubFolder(filePathRemovingFolderName, folderName, fileData)
        // Write the downloaded file to local disk
        // fs.writeFileSync(`./public/${folderName}/${fileName}`, fileData.data);
        console.log("files in final folder", files.data.files);
    }
    return files;
}

const createFolderAndSubFolder = (filePath, folderName, fileData) => {
    console.log("filepath", filePath);
    const parts = filePath.split('/');
    console.log("parts1", parts);
    parts.pop(); // Remove the file name from the end of the path
    console.log("parts2", parts);
    let currentPath = `./public/${folderName}`; // Start with the root directory

    parts.forEach(part => {
        console.log("part", part);
        currentPath = path.join(currentPath, part);
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
    });

    const fileName = path.basename(filePath);
    const destinationPath = path.join(currentPath, fileName);
    fs.writeFileSync(destinationPath, fileData.data);
};

async function createNewFolder(folderName, currentOpenedFolder, folders) {
    try {
        await b2.authorize();
        console.log("in folder", currentOpenedFolder);
        // let path1;
        // if (folders.some(folder => folder.name === folderName)) {
        //     return socket.emit('existing-folder');
        // }
        // console.log("replitNameToExport",replitNameToExport);
        // if(!currentOpenedFolder){
        //   let  path1 = `./public/${replitNameToExport}`
        // }
        // let  {path:path1}  = folders.find(folder => folder.name === currentOpenedFolder)
        // console.log("path", path1);

        let path;

        if (folders.some(folder => folder.name === folderName)) {
            return socket.emit('existing-folder');
        }

        console.log("replitNameToExport", replitNameToExport);

        if (!currentOpenedFolder) {
            path = `./public/${replitNameToExport}`;
        } else {
            const folder = folders.find(folder => folder.name === currentOpenedFolder);
            if (folder) {
                path = folder.path;
                console.log("path", path);
            } else {
                console.log("Folder not found:", currentOpenedFolder);
            }
        }

        //create new folder here
        const newFolderPath = `${path}/${folderName}`;
        console.log("newFolderPath", newFolderPath);
        fs.mkdirSync(newFolderPath, { recursive: true });
        // fs.existsSync
        // create new .bzEmpty file inside newFolderPath
        fs.writeFileSync(`${newFolderPath}/.bzEmpty`, "This is an empty folder.");
        const content = fs.readFileSync(`${newFolderPath}/.bzEmpty`, 'utf-8');

        const { data: { authorizationToken, uploadUrl } } = await b2.getUploadUrl({
            bucketId: BLACKBLAZE_DESTINATION_BUCKETID,
        });
        console.log("foldername", folderName);
        console.log("parentFolder", currentOpenedFolder);
        await b2.uploadFile({
            uploadUrl,
            uploadAuthToken: authorizationToken,
            fileName: `${newFolderPath}/.bzEmpty`,
            data: content,
            contentLength: content.byteLength,
            mime: 'application/octet-stream', // Adjust MIME type if necessary
            hash: ''
        });

// dummy comment to check PR


    } catch (error) {
        console.log("Error in creating a new Folder : ", error);
    }
}

async function createNewFile(fileName, currentOpenedFolder, files, folders) {
    try {
        await b2.authorize();
        console.log("in file");
        if (files.some(file => file.name === fileName)) {
            return socket.emit('existing-file');
        }
        const { path } = folders.find(folder => folder.name === currentOpenedFolder)
        console.log("path", path);


        //create new folder here


        const newFilePath = `${path}/${fileName}`;
        // fs.mkdirSync(newFolderPath, { recursive: true });
        // fs.existsSync
        // create new .bzEmpty file inside newFolderPath
        fs.writeFileSync(`${newFilePath}`, "This is an empty file.");
        const content = fs.readFileSync(`${newFilePath}`, 'utf-8');

        const { data: { authorizationToken, uploadUrl } } = await b2.getUploadUrl({
            bucketId: BLACKBLAZE_DESTINATION_BUCKETID,
        });
        console.log("fileName", fileName);
        console.log("parentFolder", currentOpenedFolder);
        await b2.uploadFile({
            uploadUrl,
            uploadAuthToken: authorizationToken,
            fileName: `${newFilePath}`,
            data: content,
            contentLength: content.byteLength,
            mime: 'application/octet-stream', // Adjust MIME type if necessary
            hash: ''
        });


    } catch (error) {
        console.log("Error in creating a new Folder : ", error);
    }
}



export { copyBaseFilesFromBlackBlaze, getAllFilesFromReplitNameFolder, createNewFolder, createNewFile }