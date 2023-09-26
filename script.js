async function writeText() {
    const coordinates = document.getElementById('coordinates').value;
    const text = document.getElementById('text').value;

    const response = await fetch('/api/dropbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'write', coordinates, text })
    });

    const result = await response.json();
    // Handle the response
}

async function readText() {
    // Get the coordinates from the input box
    const coordinates = document.getElementById('readCoordinates').value;

    // Call your serverless function (Vercel function) to read text from Excel
    const response = await fetch('/api/dropbox', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'read', coordinates: coordinates }),
    });

    // Parse the response from the serverless function
    const result = await response.json();

    // Update the "output" text box with the loaded text
    document.getElementById('output').value = result.text;
}

// Attach the readText function to the corresponding button
document.getElementById('readButton').addEventListener('click', readText);
