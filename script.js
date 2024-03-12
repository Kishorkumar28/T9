let data; // Variable to store fetched data
let currentPage = 1;
let itemsPerPage = 5; // Default number of items per page

// Fetch data from the provided URL
fetch('https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    displayData();
  })
  .catch(error => console.error('Error fetching data:', error));

function displayData() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  const dataBody = document.getElementById('dataBody');
  dataBody.innerHTML = '';

  paginatedData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>

    `;
    dataBody.appendChild(row);
  });

  createPagination();
}

function createPagination() {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginationContainer = document.getElementById('buttons');
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const listItem = document.createElement('li');
    if (i === currentPage) {
      listItem.classList.add('active');
    }
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = i;
    link.addEventListener('click', function(event) {
      event.preventDefault();
      currentPage = i;
      displayData();
    });
    listItem.appendChild(link);
    paginationContainer.appendChild(listItem);
  }
}

function updatePagination() {
  itemsPerPage = parseInt(document.getElementById('itemsPerPage').value);
  currentPage = 1; // Reset to the first page
  displayData();
}