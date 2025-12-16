// Array to store quote objects
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Career" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
  { text: "Stay hungry, stay foolish.", category: "Life" }
];

/**
 * Displays a random quote from the quotes array.
 */
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  
  // Logic to pick a random index
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];

  // Using innerHTML to clear previous and show new structure
  quoteDisplay.innerHTML = `
    <p><strong>"${selectedQuote.text}"</strong></p>
    <p><em>Category: ${selectedQuote.category}</em></p>
  `;
}

/**
 * Adds a new quote to the array and clears the input fields.
 */
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text === "" || category === "") {
    alert("Please fill in both the quote and the category.");
    return;
  }

  // Add to the data source
  quotes.push({ text, category });

  // Clear inputs for the next entry
  textInput.value = "";
  categoryInput.value = "";

  alert("Quote added successfully!");
}

/**
 * Dynamically creates the form for adding new quotes and appends it to the DOM.
 */
function createAddQuoteForm() {
  const formDiv = document.createElement('div');
  formDiv.style.marginTop = "20px";
  formDiv.style.borderTop = "1px solid #ccc";
  formDiv.style.paddingTop = "10px";

  formDiv.innerHTML = `
    <h3>Add a New Quote</h3>
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteBtn">Add Quote</button>
  `;

  document.body.appendChild(formDiv);

  // Attach event listener to the newly created button
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
}

// Event Listeners and Initializations
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initialize the form and display a quote on startup
createAddQuoteForm();
showRandomQuote();