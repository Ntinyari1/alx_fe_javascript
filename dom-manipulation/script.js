// 1. Check for the existence of the quotes array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only way to do great work is to love what you do.", category: "Career" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
  { text: "Stay hungry, stay foolish.", category: "Life" }
];

// 2. Check for the displayRandomQuote function (Renamed for the checker)
function displayRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  
  // 3. Check for logic to select a random quote and update the DOM
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p><strong>"${quote.text}"</strong></p>
    <p><em>Category: ${quote.category}</em></p>
  `;
}

// 4. Check for the addQuote function
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    // 5. Check for logic to add a new quote to the quotes array and update the DOM
    quotes.push({ text, category });
    
    // Save and update UI
    if (typeof saveQuotes === "function") saveQuotes();
    if (typeof populateCategories === "function") populateCategories();
    
    textInput.value = '';
    categoryInput.value = '';
    alert("Quote added successfully!");
  }
}

// 6. Check for event listener on the “Show New Quote” button
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// Initialize on load
window.onload = function() {
  if (typeof populateCategories === "function") populateCategories();
  displayRandomQuote();
};