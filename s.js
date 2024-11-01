// JavaScript to load links from links.txt and insert them into .content div
document.addEventListener("DOMContentLoaded", () => {
    // Fetch the links.txt file
    fetch('links.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const lines = data.split('\n'); // Split file content by line breaks
            const contentDiv = document.querySelector('.content'); // Get the content div

            lines.forEach((line, index) => {
                if (line.trim()) { // Check if line is not empty
                    if (index > 0) {
                        // Add two line breaks before each link except the first one
                        contentDiv.appendChild(document.createElement('br'));
                        contentDiv.appendChild(document.createElement('br'));
                    }

                    // Create a new anchor element for the link
                    const link = document.createElement('a');
                    link.href = line; // Set href to the line's URL
                    link.textContent = line; // Set the display text of the link

                    // Append the link to the content div
                    contentDiv.appendChild(link);
                }
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
