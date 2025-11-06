console.log("Moupriya Akter- CSE2302029125");

// ---- Show/hide loading animation ----
function showLoading(isLoading) {
  const loader = document.querySelector("#loading .loader"); // target inner loader div
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
}

// ---- DOM elements ----
const grid = document.getElementById('card-section');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let showingStatic = true; // track if initial static cards are visible

// ---- Fetch phones from API ----
async function fetchPhones(searchText) {
  showLoading(true); // show loader while fetching
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    displayProducts(data.data);
  } catch (err) {
    console.error(err);
    grid.innerHTML = '<p style="text-align:center;">Error loading data.</p>';
  }
  showLoading(false); // hide loader after fetching
}

// ---- Display products dynamically ----
function displayProducts(phones) {
  grid.innerHTML = ''; // clear previous cards
  showingStatic = false;

  if (!phones || phones.length === 0) {
    grid.innerHTML = '<p style="text-align:center;">No products found.</p>';
    return;
  }

  phones.forEach(phone => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-image">
        <img src="${phone.image}" alt="${phone.phone_name}" />
      </div>
      <h3 class="card-title">${phone.phone_name}</h3>
      <p class="card-description">${phone.brand}</p>
      <div class="card-price"><span>Slug:</span> ${phone.slug}</div>
      <div class="card-button">
        <button class="btn" onclick="alert('Showing details for ${phone.phone_name}')">Show Details</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ---- Handle search button click ----
function searchProducts() {
  const query = searchInput.value.trim().toLowerCase();
  if (query === '') {
    // reset page to initial static cards if input is empty
    if (!showingStatic) location.reload();
    return;
  }
  fetchPhones(query);
}

// ---- Event listener for search button only ----
searchBtn.addEventListener('click', searchProducts);

// Optional: Press Enter to search
searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchProducts();
});
