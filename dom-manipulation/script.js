// 1. Array of quote objects with text and category
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only way to do great work is to love what you do.", category: "Career" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
  { text: "Stay hungry, stay foolish.", category: "Life" }
];

// 2. Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// 3. Function to show a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
  // Update the DOM
  quoteDisplay.innerHTML = `<p>"${quote.text}"</p><p><em>- ${quote.category}</em></p>`;
}

// 4. Function to add a new quote
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes(); // Persistence
    
    // Clear inputs
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    
    alert("Quote added successfully!");
  }
}

// 5. Function to create the add quote form dynamically
function createAddQuoteForm() {
  const container = document.createElement('div');
  container.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  `;
  document.body.appendChild(container);
}

// 6. JSON Export Function
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'quotes.json');
  link.click();
}

// 7. JSON Import Function (Requirement from Task 1)
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event Listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initialization
window.onload = () => {
  showRandomQuote();
};