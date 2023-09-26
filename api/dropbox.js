// api/dropbox.js
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // Get the access token from environment variables
    const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
    const fileName = 'vercel_check.txt';

    // Check if the file exists
    let fileList;
    try {
      fileList = await axios.post('https://api.dropboxapi.com/2/files/list_folder', {
        path: '',
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      return res.status(500).send('Error listing Dropbox folder.');
    }

    // Get the current timestamp
    const currentTime = new Date().toISOString();

    // Check if the file "vercel_check.txt" exists in the root folder
    const fileExists = fileList.data.entries.some(entry => entry.name === fileName);

    if (!fileExists) {
      // If the file does not exist, create it
      await axios.post('https://content.dropboxapi.com/2/files/upload', currentTime, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Dropbox-API-Arg': JSON.stringify({
            path: `/${fileName}`,
            mode: 'add',
          }),
          'Content-Type': 'application/octet-stream',
        },
      });
    } else {
      // If the file exists, append the current timestamp
      await axios.post('https://content.dropboxapi.com/2/files/upload', `\n${currentTime}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Dropbox-API-Arg': JSON.stringify({
            path: `/${fileName}`,
            mode: 'overwrite',
          }),
          'Content-Type': 'application/octet-stream',
        },
      });
    }

    // Retrieve the updated content of the file
    const fileContentResponse = await axios.post('https://content.dropboxapi.com/2/files/download', null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: `/${fileName}`,
        }),
      },
    });

    // Send the file content as response
    res.setHeader('Access-Control-Allow-Origin', '*'); // Add this line
    res.status(200).send(fileContentResponse.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error.');
  }
};
