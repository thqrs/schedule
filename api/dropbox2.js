const Dropbox = require('dropbox').Dropbox;
const fetch = require('node-fetch');

const filePath = "/YourDropboxFolderPath/YourExcelFileName.xlsx";

module.exports = async (req, res) => {
    try {
        console.log('Function Invoked');
        console.log('Request Body:', req.body);
        
        const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch: fetch });
        console.log('Dropbox Instance Created');
        
        const { action, coordinates, text } = req.body;
        console.log('Action:', action);

        if (action === 'read') {
            console.log('Reading from Excel');
            // Implement logic to read from the Excel file
            res.status(200).send({ success: true, message: "Read action received!" });
        } else if (action === 'write') {
            console.log('Writing to Excel');
            // Implement logic to write to the Excel file
            res.status(200).send({ success: true, message: "Write action received!" });
        } else {
            console.log('Invalid Action');
            res.status(400).send({ success: false, message: "Invalid action!" });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send({ error: error.message });
    }
};
