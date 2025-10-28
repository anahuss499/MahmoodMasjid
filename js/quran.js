
const quranContainer = document.getElementById("quranContainer");
const quranSearch = document.getElementById("quranSearch");

let surahs = [];

// Load all surahs from JSON
async function loadQuran() {
  try {
    const res = await fetch("data/surahs.json");
    surahs = await res.json();
    displaySurahs(surahs);
  } catch (err) {
    console.error(err);
    quranContainer.innerHTML = "<p>Failed to load Qur’an.</p>";
  }
}

// Display surahs
function displaySurahs(list) {
  if (list.length === 0) {
    quranContainer.innerHTML = "<p>No surahs found.</p>";
    return;
  }

  quranContainer.innerHTML = "";
  list.forEach(surah => {
    const surahDiv = document.createElement("div");
    surahDiv.classList.add("surah");

    const title = document.createElement("div");
    title.classList.add("surah-title");
    title.innerHTML = `${surah.name_ar} - ${surah.name_en}`;
    surahDiv.appendChild(title);

    const ayahsDiv = document.createElement("div");
    ayahsDiv.classList.add("ayahs");
    surah.ayahs.forEach(ayah => {
      const p = document.createElement("p");
      p.classList.add("ayah");
      p.textContent = ayah.text; // Arabic text
      ayahsDiv.appendChild(p);
    });

    surahDiv.appendChild(ayahsDiv);

    // Toggle ayahs on click
    title.addEventListener("click", () => {
      ayahsDiv.style.display = ayahsDiv.style.display === "block" ? "none" : "block";
    });

    quranContainer.appendChild(surahDiv);
  });
}

// Search functionality
quranSearch.addEventListener("input", () => {
  const query = quranSearch.value.toLowerCase();
  const filtered = surahs.filter(
    s => s.name_ar.includes(query) || s.name_en.toLowerCase().includes(query)
  );
  displaySurahs(filtered);
});

// Initialize
loadQuran();


