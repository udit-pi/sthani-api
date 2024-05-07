


const connSettings  = require('../config/server');
const { Client: SSHClient } = require('ssh2');
const fs = require('fs');
const crypto = require('crypto');


const generateRandomFileName = () => {
    const randomString = crypto.randomBytes(4).toString('hex');
    return `${randomString}.pdf`; // You can change the extension as needed
  };



const uploadFileToServer = async (file, clientFolderName) => {
    console.log("Hello server")
    return new Promise((resolve, reject) => {
 
      const remoteFilePath = `/var/www/html/media/${clientFolderName}`;
  
     
      
      const sshClient = new SSHClient();
  
      sshClient.on('ready', () => {
        console.log('Connected');
  
        sshClient.sftp((err, sftp) => {
          if (err) {
            console.error('SFTP session error:', err);
            sshClient.end();
            reject('Internal Server Error');
          }
  
          const writeStream = sftp.createWriteStream(remoteFilePath);
  
          // Pipe the file stream to the SFTP write stream
          fs.createReadStream(file.path)
            .pipe(writeStream)
            .on('close', () => {
              console.log('File uploaded successfully');
              sshClient.end();
              resolve(randomFileName);
            })
            .on('error', (uploadErr) => {
              console.error('Error uploading file:', uploadErr);
              sshClient.end();
              reject('Internal Server Error');
            });
        });
      }).connect(connSettings);
    });
  };


  module.exports = uploadFileToServer;