// app.js

let books = [];
let filteredBooks = [];
let currentPage = 1;
const itemsPerPage = 5; // Adjust items per page as needed

// Fetch the dataset
fetch('books.json')
  .then(response => response.json())
  .then(data => {
    books = data;
    filteredBooks = books; // Initialize with the full dataset
    displayBooks();
    setupPagination();
  })
  .catch(error => console.error('Error fetching books:', error));

// Function to display books on the current page
function displayBooks() {
  const bookTable = document.getElementById('bookTable');
  bookTable.innerHTML = ''; // Clear previous results

  // Calculate start and end indices
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get books for the current page
  const booksToDisplay = filteredBooks.slice(startIndex, endIndex);

  if (booksToDisplay.length === 0) {
    bookTable.innerHTML = '<tr><td colspan="2" class="no-results">No results found</td></tr>';
    return;
  }

  // Add rows for each book
  booksToDisplay.forEach(book => {
    const row = `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
      </tr>
    `;
    bookTable.innerHTML += row;
  });
}

// Function to filter books based on search input
function searchBooks() {
  const titleQuery = document.getElementById('titleSearch').value.toLowerCase();
  const authorQuery = document.getElementById('authorSearch').value.toLowerCase();

  filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(titleQuery) &&
    book.author.toLowerCase().includes(authorQuery)
  );

  currentPage = 1; // Reset to the first page
  displayBooks();
  setupPagination();
}

// Function to set up pagination controls
function setupPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = ''; // Clear previous pagination buttons

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.classList.add(i === currentPage ? 'active' : '');
    button.addEventListener('click', () => {
      currentPage = i;
      displayBooks();
      setupPagination();
    });
    pagination.appendChild(button);
  }
}
