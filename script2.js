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
    const coordinates = document.getElementById('readCoordinates').value;

    const response = await fetch('/api/dropbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'read', coordinates })
    });

    const result = await response.json();
    document.getElementById('output').value = result.text;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('readButton').addEventListener('click', readText);
    document.getElementById('writeButton').addEventListener('click', writeText);
});
