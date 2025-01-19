let books = []; // Store fetched books
const rowsPerPage = 500; // Number of rows per page
let currentPage = 1; // Current page

// Fetch data from books.json
fetch('books.json')
  .then(response => response.json())
  .then(data => {
    books = data;
    displayBooks(); // Display initial data
  })
  .catch(error => console.error('Error fetching books:', error));

// Display books with pagination
function displayBooks() {
  const bookTable = document.getElementById('bookTable');
  const pagination = document.getElementById('pagination');
  const filteredBooks = filterBooks();

  // Calculate pagination
  const totalPages = Math.ceil(filteredBooks.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageBooks = filteredBooks.slice(start, end);

  // Display books
  bookTable.innerHTML = '';
  if (pageBooks.length === 0) {
    bookTable.innerHTML = '<tr><td colspan="2" class="no-results">No results found</td></tr>';
  } else {
    pageBooks.forEach(book => {
      const row = `
        <tr>
          <td>${book.title}</td>
          <td>${book.author}</td>
        </tr>
      `;
      bookTable.innerHTML += row;
    });
  }

  // Display pagination
  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = i === currentPage ? 'active' : '';
    button.onclick = () => {
      currentPage = i;
      displayBooks();
    };
    pagination.appendChild(button);
  }
}

// Filter books based on search inputs
function filterBooks() {
  const titleQuery = document.getElementById('searchTitle').value.toLowerCase();
  const authorQuery = document.getElementById('searchAuthor').value.toLowerCase();

  return books.filter(book =>
    book.title.toLowerCase().includes(titleQuery) &&
    book.author.toLowerCase().includes(authorQuery)
  );
}

// Update book list on search
function searchBooks() {
  currentPage = 1; // Reset to first page
  displayBooks();
}
