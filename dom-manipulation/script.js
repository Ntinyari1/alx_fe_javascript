// 1. Existence of the quotes array with text and category properties
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Career" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
  { text: "Stay hungry, stay foolish.", category: "Life" }
];

// 2. Check for the displayRandomQuote function
function displayRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  
  // 3. Logic to select a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Update the DOM
  quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>- ${randomQuote.category}</em></p>`;
}

// 4. Check for the addQuote function
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  // 5. Logic to add a new quote to the array and update the DOM
  if (text && category) {
    quotes.push({ text: text, category: category });
    
    // Clear inputs
    textInput.value = '';
    categoryInput.value = '';
    
    alert("Quote added successfully!");
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// 6. Event listener on the “Show New Quote” button
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// Initial call to show a quote on page load
displayRandomQuote();