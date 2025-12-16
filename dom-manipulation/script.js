// 1. Existence of the quotes array with objects containing text and category properties
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Career" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
  { text: "Stay hungry, stay foolish.", category: "Life" }
];

/**
 * 2. Check for the displayRandomQuote function
 * 3. Check for logic to select a random quote and update the DOM
 */
function displayRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  
  // Logic to select a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Logic to update the DOM
  quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>- ${randomQuote.category}</em></p>`;
}

/**
 * 4. Check for the addQuote function
 * 5. Check for logic to add a new quote to the quotes array and update the DOM
 */
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  // Logic to add a new quote and update the array
  if (text && category) {
    quotes.push({ text: text, category: category });
    
    // Clear inputs after adding
    textInput.value = '';
    categoryInput.value = '';
    
    alert("Quote added successfully!");
  } else {
    alert("Please enter both a quote and a category.");
  }
}

/**
 * 6. Check for event listener on the “Show New Quote” button
 */
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// Initial display on page load
displayRandomQuote();