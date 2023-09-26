const Dropbox = require('dropbox').Dropbox;
const fetch = require('node-fetch');

// Define the path to your Excel file in Dropbox
const filePath = "/YourDropboxFolderPath/YourExcelFileName.xlsx";
module.exports = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
    const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch: fetch });
    const { action, coordinates, text } = req.body;

    if (action === 'read') {
        // Use filePath when reading the Excel file from Dropbox
        // Implement logic to read from the Excel file at the specified filePath
        res.status(200).send({ success: true, message: "Read action received!" });
    } else if (action === 'write') {
        // Use filePath when writing to the Excel file in Dropbox
        // Implement logic to write to the Excel file at the specified filePath
        res.status(200).send({ success: true, message: "Write action received!" });
    } else {
        res.status(400).send({ success: false, message: "Invalid action!" });
    }
            } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send({ error: error.message });
    }
};

