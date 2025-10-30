const container = document.getElementById("azkarContainer");
const searchInput = document.getElementById("azkarSearch");
const categorySelect = document.getElementById("categorySelect");

let azkarData = [];

// Fetch Azkar
fetch("../data/azkar.json")
  .then(res => res.json())
  .then(data => {
    azkarData = data;
    displayAzkar(data);
  });

// Display Azkar Cards
function displayAzkar(data) {
  if (!data.length) {
    container.innerHTML = "<p>No Azkar found.</p>";
    return;
  }

  container.innerHTML = data.map(item => `
    <div class="azkar-card">
      <h3>${capitalizeCategory(item.category)}</h3>
      <p class="arabic">${item.arabic}</p>
      <p class="translation">${item.translation}</p>
    </div>
  `).join("");
}

// Capitalize first letter of category
function capitalizeCategory(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).replace("_", " ");
}

// Filter/search
searchInput.addEventListener("input", () => filterAzkar());
categorySelect.addEventListener("change", () => filterAzkar());

function filterAzkar() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  const filtered = azkarData.filter(item => {
    const text = `${item.arabic} ${item.translation}`.toLowerCase();
    const matchesSearch = text.includes(searchTerm);
    const matchesCategory = category === "all" ? true : item.category === category;
    return matchesSearch && matchesCategory;
  });

  displayAzkar(filtered);
}
