const fetch = require('node-fetch');
const DROPBOX_API_URL = "https://api.dropboxapi.com/2/files/upload";
const DROPBOX_FILE_PATH = "/vercel_check.txt";

exports.handler = async function (event, context) {
  try {
    const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("Dropbox access token is not set");
    }

    // Get current time
    const currentTime = new Date().toISOString();

    // Check if the file exists and create/write to it
    const response = await fetch(DROPBOX_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: DROPBOX_FILE_PATH,
          mode: 'add',
        }),
        'Content-Type': 'application/octet-stream',
      },
      body: currentTime,
    });

    if (!response.ok) {
      throw new Error(`Failed to write to Dropbox file: ${response.statusText}`);
    }

    // Fetch the content of the file
    const fileContentResponse = await fetch(DROPBOX_API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer YOUR_DROPBOX_ACCESS_TOKEN`,
        'Dropbox-API-Arg': JSON.stringify({
          path: DROPBOX_FILE_PATH,
        }),
      },
    });

    if (!fileContentResponse.ok) {
      throw new Error(`Failed to read Dropbox file: ${fileContentResponse.statusText}`);
    }

    const fileContent = await fileContentResponse.text();
    return {
      statusCode: 200,
      body: fileContent,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};
