// Initialize quotes array from Local Storage or default values
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Career" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "Stay hungry, stay foolish.", category: "Life" }
];

/**
 * Saves the current quotes array to Local Storage
 */
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

/**
 * Dynamically populates the category dropdown menu
 */
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

    // Preserve the 'All Categories' option
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected filter from Local Storage
    const lastFilter = localStorage.getItem('lastSelectedFilter') || 'all';
    categoryFilter.value = lastFilter;
}

/**
 * Displays a random quote based on the current filter
 */
function showRandomQuote() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const filteredQuotes = categoryFilter === 'all' 
        ? quotes 
        : quotes.filter(q => q.category === categoryFilter);

    const quoteDisplay = document.getElementById('quoteDisplay');

    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes found for this category.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];

    quoteDisplay.innerHTML = `
        <p><strong>"${quote.text}"</strong></p>
        <p><em>Category: ${quote.category}</em></p>
    `;

    // Session Storage: Remember the last viewed quote in this session
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

/**
 * Filters quotes and saves the preference to Local Storage
 */
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastSelectedFilter', selectedCategory);
    showRandomQuote();
}

/**
 * Adds a new quote, updates the UI, and persists to Local Storage
 */
function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
        quotes.push({ text, category });
        saveQuotes();
        populateCategories(); // Update dropdown if new category added
        
        textInput.value = '';
        categoryInput.value = '';
        alert("Quote added successfully!");
    } else {
        alert("Please enter both a quote and a category.");
    }
}

/**
 * Exports the quotes array as a JSON file
 */
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    link.click();
}

/**
 * Imports quotes from a JSON file and merges them with existing ones
 */
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            populateCategories();
            alert('Quotes imported successfully!');
        } catch (e) {
            alert('Error importing JSON. Please check the file format.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event Listeners & Initialization
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

window.onload = function() {
    populateCategories();
    filterQuotes(); // Automatically displays a quote and applies the saved filter
};