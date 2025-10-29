document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("quranContainer");
  const searchInput = document.getElementById("quranSearch");
  const surahSelect = document.getElementById("surah-select");

  try {
    const response = await fetch("../data/full_quran.json");
    const surahs = await response.json();

    // ✅ Populate dropdown with Arabic + Urdu and English + English translation
surahs.forEach((surah, i) => {
  const option = document.createElement("option");
  option.value = i;

  // Arabic + Urdu (right) — English + English translation (left)
  option.textContent = `${surah.name} (${surah.translationUr}) — ${surah.englishName} (${surah.translationEn})`;

  // Optional: show full name on hover
  option.title = option.textContent;

  surahSelect.appendChild(option);
});


    // ✅ Display all Surahs initially
    displaySurahs(surahs);

    // ✅ Dropdown change
    surahSelect.addEventListener("change", () => {
      const selectedIndex = parseInt(surahSelect.value);
      scrollToSurah(selectedIndex);
    });

    // ✅ Search filter
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = surahs.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          (s.englishName && s.englishName.toLowerCase().includes(term))
      );
      displaySurahs(filtered);
    });

    // ✅ Scroll to specific surah
    function scrollToSurah(index) {
      const target = document.querySelector(`[data-surah-index="${index}"]`);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: "smooth",
        });
      }
    }

    // ✅ Display all surahs
    function displaySurahs(list) {
      container.innerHTML = "";

      list.forEach((surah, index) => {
        const surahBlock = document.createElement("div");
        surahBlock.classList.add("surah-block");
        surahBlock.setAttribute("data-surah-index", index);

        // Title
        const title = document.createElement("h3");
        title.classList.add("surah-title");
        title.textContent = `${surah.name} (${surah.englishName})`;

        // Divider line above each surah
        const divider = document.createElement("hr");
        divider.classList.add("surah-divider");

        // Bismillah (skip Surah 1 and 9)
        let bismillah = "";
        if (index !== 0 && index !== 8) {
          bismillah = `<div class="bismillah">﷽</div>`;
        }

        // Ayahs
        const ayahsHTML = surah.ayahs
          .map(
            (a, i) =>
              `<span class="ayah">${a.text} <span class="ayah-num">۝${i + 1}</span></span>`
          )
          .join(" ");

        const ayahContainer = document.createElement("div");
        ayahContainer.classList.add("ayah-container");
        ayahContainer.innerHTML = bismillah + ayahsHTML;

        surahBlock.append(title, divider, ayahContainer);
        container.appendChild(surahBlock);
      });
    }
  } catch (err) {
    console.error("❌ Failed to load Qur’an:", err);
    container.innerHTML = "<p>❌ Failed to load Qur’an.</p>";
  }
});

const hamburger = document.querySelector('.hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('active'); // show/hide menu on mobile
});
