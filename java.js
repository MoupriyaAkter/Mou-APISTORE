console.log("Moupriya Akter- CSE2302029125");
function handle_search(){
	const get_input_search=document.getElementById('searchInput');
	const diplay_value=get_input_search.value;
	console.log(diplay_value);
	
}
/*another format of Function
const functionname=(parameter)=>{
	function description
}*/

const grid = document.getElementById('card-section');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let showingStatic = true; // to track if initial HTML cards are visible

// ---- Function to display phones dynamically ----
function displayProducts(phones) {
  grid.innerHTML = ''; // clear old content
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

// ---- Function to show temporary loading animation ----
function showLoading() {
  grid.innerHTML = `
    <div class="loading" style="text-align:center; padding:50px; font-size:18px;">
      Loading...
    </div>
  `;
}

// ---- Fetch phones from API ----
async function fetchPhones(searchText) {
  showLoading(); // show loading first
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    displayProducts(data.data);
  } catch (error) {
    console.error(error);
    grid.innerHTML = '<p style="text-align:center;">Error loading data.</p>';
  }
}

// ---- Search logic ----
function searchProducts() {
  const query = searchInput.value.trim().toLowerCase();
  if (query === '') {
    // if input is empty, reset to show static HTML cards again
    if (!showingStatic) location.reload(); 
    return;
  }
  fetchPhones(query);
}

// ---- Event listeners ----
searchBtn.addEventListener('click', searchProducts);
searchInput.addEventListener('focus', () => {
  // optional: show loading immediately when user clicks search bar
  if (searchInput.value.trim() !== '') showLoading();
});
searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchProducts();
});
