// Initialize quotes: Load from Local Storage or use defaults if empty
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Quality is not an act, it is a habit.", category: "Motivation" }
];

/**
 * Saves the current quotes array to Local Storage
 */
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

/**
 * Displays a random quote and saves the 'last viewed quote' to Session Storage
 */
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><p><em>- ${quote.category}</em></p>`;

    // Session Storage: Store the last viewed quote for the duration of the tab session
    sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

/**
 * Adds a new quote and persists it to Local Storage
 */
function addQuote() {
    const text = document.getElementById('newQuoteText').value;
    const category = document.getElementById('newQuoteCategory').value;

    if (text && category) {
        quotes.push({ text, category });
        saveQuotes(); // Persistence
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert("Quote added!");
    }
}

/**
 * Exports quotes to a JSON file
 */
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const exportFileDefaultName = 'quotes.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

/**
 * Imports quotes from a JSON file
 */
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            alert('Quotes imported successfully!');
            showRandomQuote(); // Optional: Refresh display
        } catch (error) {
            alert('Error parsing JSON file.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Initial setup
document.getElementById('newQuote').addEventListener('click', showRandomQuote);