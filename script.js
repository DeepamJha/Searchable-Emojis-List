const emojis = []; // This will hold the emoji data from the API
const apiKey = 'a5f7562e55532dd5c88b69f53b8fa7b23e22a4ed'; // Your API key

// Function to fetch emojis from the Emoji API
async function fetchEmojis() {
    try {
        console.log("Fetching emojis...");
        const response = await fetch(`https://emoji-api.com/emojis?access_key=${apiKey}`);
        console.log("Response status:", response.status); // Log the response status

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Fetched emojis:", data); // Log the fetched emojis
        emojis.push(...data);
        displayEmojis(emojis);
    } catch (error) {
        console.error('Error fetching emojis:', error);
    }
}


// Function to display emojis
function displayEmojis(filteredEmojis) {
    const emojiList = document.getElementById('emojiList');
    emojiList.innerHTML = ''; // Clear previous results
    filteredEmojis.forEach(emoji => {
        const emojiDiv = document.createElement('div');
        emojiDiv.className = 'emoji-item';
        
        // Display emoji character and a more friendly name or description
        emojiDiv.innerText = `${emoji.character} - ${emoji.name || emoji.slug.replace(/-/g, ' ')}`; // Replace hyphens with spaces for readability

        const copyBtn = document.createElement('button');
        copyBtn.innerText = 'Copy';
        copyBtn.className = 'copy-btn';
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(emoji.character);
            alert('Copied to clipboard!');
        };

        emojiDiv.appendChild(copyBtn);
        emojiList.appendChild(emojiDiv);
    });
}


// Function to handle search
function handleSearch() {
    const searchTerm = document.getElementById('emojiSearch').value.toLowerCase();
    const filteredEmojis = emojis.filter(emoji => {
        const matchesName = emoji.slug.toLowerCase().includes(searchTerm); // Using slug for searching
        return matchesName;
    });
    displayEmojis(filteredEmojis);
}

// Event listeners
document.getElementById('emojiSearch').addEventListener('input', handleSearch);

// Fetch emojis on page load
fetchEmojis();
