// Initialize quotes array with all original categories
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only way to do great work is to love what you do.", category: "Career" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
  { text: "Stay hungry, stay foolish.", category: "Life" }
];

const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';

/**
 * Saves current quotes to Local Storage
 */
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

/**
 * Populate the category dropdown with unique values from the quotes array
 */
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  const lastSelectedFilter = localStorage.getItem('lastFilter') || 'all';

  // Clear existing options except 'All'
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  categoryFilter.value = lastSelectedFilter;
}

/**
 * Display a random quote based on the selected category
 */
function showRandomQuote() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(q => q.category === selectedCategory);

  const display = document.getElementById('quoteDisplay');

  if (filteredQuotes.length === 0) {
    display.innerHTML = "<p>No quotes available for this category.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];

  display.innerHTML = `
    <p><strong>"${quote.text}"</strong></p>
    <p><em>Category: ${quote.category}</em></p>
  `;

  // Session Storage: Track last viewed quote in this session
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

/**
 * Filter quotes and persist the filter choice
 */
function filterQuotes() {
  const selected = document.getElementById('categoryFilter').value;
  localStorage.setItem('lastFilter', selected);
  showRandomQuote();
}

/**
 * Create a new quote and sync it with the simulated server
 */
async function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    
    // Attempt to post to server
    await postQuoteToServer(newQuote);
    
    textInput.value = '';
    categoryInput.value = '';
    showRandomQuote();
  } else {
    alert("Please fill in both fields.");
  }
}

// --- Server Interaction & Syncing ---

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const data = await response.json();
    // Simulate server data mapping
    return data.slice(0, 3).map(item => ({
      text: item.title,
      category: "Server"
    }));
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

async function postQuoteToServer(quote) {
  try {
    await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote)
    });
  } catch (err) {
    console.error("Post error:", err);
  }
}

async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  if (!serverQuotes) return;

  let updated = false;
  serverQuotes.forEach(sQuote => {
    if (!quotes.some(lQuote => lQuote.text === sQuote.text)) {
      quotes.push(sQuote);
      updated = true;
    }
  });

  if (updated) {
    saveQuotes();
    populateCategories();
    showSyncNotification("Quotes synced with server!");
  }
}

function showSyncNotification(msg) {
  const status = document.getElementById('syncStatus');
  status.textContent = msg;
  status.style.display = 'block';
  setTimeout(() => { status.style.display = 'none'; }, 3500);
}

// --- Import/Export ---

function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      quotes.push(...imported);
      saveQuotes();
      populateCategories();
      alert('Import successful!');
    } catch (err) {
      alert('Invalid JSON file.');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initialization
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

window.onload = () => {
  populateCategories();
  showRandomQuote();
  // Start periodic sync (every 60 seconds)
  setInterval(syncQuotes, 60000);
};