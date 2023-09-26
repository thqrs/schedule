const axios = require('axios');
const DROPBOX_API_URL = "https://api.dropboxapi.com/2/files/upload";
const DROPBOX_DOWNLOAD_URL = "https://content.dropboxapi.com/2/files/download";
const DROPBOX_FILE_PATH = "/vercel_check.txt";

exports.handler = async function (event, context) {
  try {
    const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("Dropbox access token is not set");
    }

    // Get current time
    const currentTime = new Date().toISOString();

    // Write to the file
    await axios.post(DROPBOX_API_URL, null, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: DROPBOX_FILE_PATH,
          mode: 'overwrite',
        }),
        'Content-Type': 'application/octet-stream',
      },
      data: currentTime,
    });

    // Fetch the content of the file
    const fileContentResponse = await axios.post(DROPBOX_DOWNLOAD_URL, null, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: DROPBOX_FILE_PATH,
        }),
      },
    });

    const fileContent = fileContentResponse.data;
    return {
      statusCode: 200,
      body: fileContent,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: error.message || 'Internal Server Error',
    };
  }
};
