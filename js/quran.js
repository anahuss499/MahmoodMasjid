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

// 📱 Mobile-friendly dropdown popup with Arabic + Urdu + English
if (window.innerWidth <= 768) {
  const select = document.getElementById("surah-select");

  // Create open button
  const openBtn = document.createElement("button");
  openBtn.textContent = "Select Surah ▼";
  openBtn.classList.add("mobile-open-btn");
  select.parentElement.appendChild(openBtn);

  // Popup container
  const popup = document.createElement("div");
  popup.classList.add("mobile-dropdown");
  document.body.appendChild(popup);

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close ✖";
  closeBtn.classList.add("close-btn");
  popup.appendChild(closeBtn);

  const title = document.createElement("h3");
  title.textContent = "Select a Surah";
  popup.appendChild(title);

  // ✅ Each Surah option (Arabic | Urdu | English)
 const surahTranslations = [
  { arabic: "الفاتحة", urdu: "الفاتحہ", english: "Al-Fatihah (The Opening)" },
  { arabic: "البقرة", urdu: "البقرہ", english: "Al-Baqarah (The Cow)" },
  { arabic: "آل عمران", urdu: "آل عمران", english: "Aal-Imran (The Family of Imran)" },
  { arabic: "النساء", urdu: "النساء", english: "An-Nisa (The Women)" },
  { arabic: "المائدة", urdu: "المائدہ", english: "Al-Ma’idah (The Table Spread)" },
  { arabic: "الأنعام", urdu: "الأنعام", english: "Al-An’am (The Cattle)" },
  { arabic: "الأعراف", urdu: "الأَعْرَاف", english: "Al-A’raf (The Heights)" },
  { arabic: "الأنفال", urdu: "الأنفال", english: "Al-Anfal (The Spoils of War)" },
  { arabic: "التوبة", urdu: "التوبہ", english: "At-Tawbah (The Repentance)" },
  { arabic: "يونس", urdu: "یونس", english: "Yunus (Jonah)" },
  { arabic: "هود", urdu: "ہود", english: "Hud" },
  { arabic: "يس", urdu: "یوسف", english: "Yusuf (Joseph)" },
  { arabic: "الرعد", urdu: "الرعد", english: "Ar-Ra’d (The Thunder)" },
  { arabic: "إبراهيم", urdu: "ابراہیم", english: "Ibrahim (Abraham)" },
  { arabic: "الحجر", urdu: "الحجر", english: "Al-Hijr (The Rocky Tract)" },
  { arabic: "النحل", urdu: "النحل", english: "An-Nahl (The Bee)" },
  { arabic: "الإسراء", urdu: "الإسراء", english: "Al-Isra’ / Bani Isra’il (The Night Journey)" },
  { arabic: "الكهف", urdu: "الکهف", english: "Al-Kahf (The Cave)" },
  { arabic: "مريم", urdu: "مریم", english: "Maryam (Mary)" },
  { arabic: "طه", urdu: "طہ", english: "Ta-Ha" },
  { arabic: "الأنبياء", urdu: "الأنبیاء", english: "Al-Anbiya (The Prophets)" },
  { arabic: "الحج", urdu: "الحج", english: "Al-Hajj (The Pilgrimage)" },
  { arabic: "المؤمنون", urdu: "المؤمنون", english: "Al-Mu’minun (The Believers)" },
  { arabic: "النور", urdu: "النور", english: "An-Nur (The Light)" },
  { arabic: "الفرقان", urdu: "الفرقان", english: "Al-Furqan (The Criterion)" },
  { arabic: "الشعراء", urdu: "الشعرا", english: "Ash-Shu’ara (The Poets)" },
  { arabic: "النمل", urdu: "النمل", english: "An-Naml (The Ant)" },
  { arabic: "القصص", urdu: "القصص", english: "Al-Qasas (The Stories)" },
  { arabic: "العنكبوت", urdu: "العنکبوت", english: "Al-Ankabut (The Spider)" },
  { arabic: "الروم", urdu: "الروم", english: "Ar-Rum (The Romans)" },
  { arabic: "لقمان", urdu: "لقمان", english: "Luqman" },
  { arabic: "السجدة", urdu: "السجدة", english: "As-Sajdah (The Prostration)" },
  { arabic: "الأحزاب", urdu: "الأحزاب", english: "Al-Ahzab (The Combined Forces)" },
  { arabic: "سبأ", urdu: "سبأ", english: "Saba (Sheba)" },
  { arabic: "فاطر", urdu: "فاطر", english: "Fatir (The Originator)" },
  { arabic: "يس", urdu: "یس", english: "Ya-Sin" },
  { arabic: "الصافات", urdu: "الصافات", english: "As-Saffat (Those Ranged in Ranks)" },
  { arabic: "ص", urdu: "صاد", english: "Sad" },
  { arabic: "الزمر", urdu: "الزمر", english: "Az-Zumar (The Groups)" },
  { arabic: "غافر", urdu: "غافر", english: "Ghafir (The Forgiver)" },
  { arabic: "فصّلت", urdu: "فصّلت", english: "Fussilat (Explained in Detail)" },
  { arabic: "الشورى", urdu: "الشورى", english: "Ash-Shura (The Consultation)" },
  { arabic: "الزخرف", urdu: "الزخرف", english: "Az-Zukhruf (The Ornaments of Gold)" },
  { arabic: "الدخان", urdu: "الدخان", english: "Ad-Dukhan (The Smoke)" },
  { arabic: "الجاثية", urdu: "الجاثية", english: "Al-Jathiyah (The Crouching)" },
  { arabic: "الأحقاف", urdu: "الأحقاف", english: "Al-Ahqaf (The Wind-Curved Sandhills)" },
  { arabic: "محمد", urdu: "محمد", english: "Muhammad" },
  { arabic: "الفتح", urdu: "الفتح", english: "Al-Fath (The Victory)" },
  { arabic: "الحجرات", urdu: "الحجرات", english: "Al-Hujurat (The Rooms)" },
  { arabic: "ق", urdu: "قاف", english: "Qaf" },
  { arabic: "الذاريات", urdu: "الذاريات", english: "Ad-Dhariyat (The Winnowing Winds)" },
  { arabic: "الطور", urdu: "الطور", english: "At-Tur (The Mount)" },
  { arabic: "النجم", urdu: "النجم", english: "An-Najm (The Star)" },
  { arabic: "القمر", urdu: "القمر", english: "Al-Qamar (The Moon)" },
  { arabic: "الرحمن", urdu: "الرحمن", english: "Ar-Rahman (The Beneficent)" },
  { arabic: "الواقعة", urdu: "الواقعة", english: "Al-Waqi’ah (The Inevitable)" },
  { arabic: "الحديد", urdu: "الحدید", english: "Al-Hadid (The Iron)" },
  { arabic: "المجادلة", urdu: "المجادلة", english: "Al-Mujadila (The Pleading Woman)" },
  { arabic: "الحشر", urdu: "الحشر", english: "Al-Hashr (The Exile)" },
  { arabic: "الممتحنة", urdu: "الممتحنة", english: "Al-Mumtahanah (The Examined One)" },
  { arabic: "الصف", urdu: "الصف", english: "As-Saff (The Ranks)" },
  { arabic: "الجمعة", urdu: "الجمعة", english: "Al-Jumu’ah (The Congregation)" },
  { arabic: "المنافقون", urdu: "المنافقون", english: "Al-Munafiqun (The Hypocrites)" },
  { arabic: "التغابن", urdu: "التغابن", english: "At-Taghabun (Mutual Loss and Gain)" },
  { arabic: "الطلاق", urdu: "الطلاق", english: "At-Talaq (Divorce)" },
  { arabic: "التحريم", urdu: "التحریم", english: "At-Tahrim (The Prohibition)" },
  { arabic: "الملك", urdu: "الملک", english: "Al-Mulk (The Sovereignty)" },
  { arabic: "القلم", urdu: "القلم", english: "Al-Qalam (The Pen)" },
  { arabic: "الحاقة", urdu: "الحاقة", english: "Al-Haqqah (The Reality)" },
  { arabic: "المعارج", urdu: "المعارج", english: "Al-Ma’arij (The Ascending Stairways)" },
  { arabic: "نوح", urdu: "نوح", english: "Nuh (Noah)" },
  { arabic: "الجن", urdu: "الجن", english: "Al-Jinn (The Jinn)" },
  { arabic: "المزمل", urdu: "المزمل", english: "Al-Muzzammil (The Enshrouded One)" },
  { arabic: "المدثر", urdu: "المدثر", english: "Al-Muddaththir (The Cloaked One)" },
  { arabic: "القیامة", urdu: "القیامَة", english: "Al-Qiyamah (The Resurrection)" },
  { arabic: "الانسان", urdu: "الانسان", english: "Al-Insan (Man)" },
  { arabic: "المرسلٰت", urdu: "المرسلات", english: "Al-Mursalat (The Emissaries)" },
  { arabic: "النبأ", urdu: "النبأ", english: "An-Naba (The Tidings)" },
  { arabic: "النازعات", urdu: "النازعات", english: "An-Nazi’at (Those Who Drag Forth)" },
  { arabic: "عبس", urdu: "عبس", english: "Abasa (He Frowned)" },
  { arabic: "التكوير", urdu: "التكویر", english: "At-Takwir (The Overthrowing)" },
  { arabic: "الانفطار", urdu: "الانفطار", english: "Al-Infitar (The Cleaving)" },
  { arabic: "المطففين", urdu: "المطفّفین", english: "Al-Mutaffifin (Defrauding)" },
  { arabic: "الانشقاق", urdu: "الانشقاق", english: "Al-Inshiqaq (The Splitting Open)" },
  { arabic: "البروج", urdu: "البروج", english: "Al-Buruj (The Mansions of the Stars)" },
  { arabic: "الطارق", urdu: "الطارق", english: "At-Tariq (The Morning Star)" },
  { arabic: "الأعلى", urdu: "الأعلى", english: "Al-A'la (The Most High)" },
  { arabic: "الغاشية", urdu: "الغاشیہ", english: "Al-Ghashiyah (The Overwhelming)" },
  { arabic: "الفجر", urdu: "الفجر", english: "Al-Fajr (The Dawn)" },
  { arabic: "البلد", urdu: "البلد", english: "Al-Balad (The City)" },
  { arabic: "الشمس", urdu: "الشمس", english: "Ash-Shams (The Sun)" },
  { arabic: "اللیل", urdu: "اللیل", english: "Al-Layl (The Night)" },
  { arabic: "الضحی", urdu: "الضحی", english: "Ad-Dhuha (The Morning Hours)" },
  { arabic: "الشرح", urdu: "الشرح", english: "Ash-Sharh / Al-Inshirah (The Relief)" },
  { arabic: "التین", urdu: "التین", english: "At-Tin (The Fig)" },
  { arabic: "العلق", urdu: "العلق", english: "Al-Alaq (The Clot)" },
  { arabic: "القدر", urdu: "القدر", english: "Al-Qadr (The Power)" },
  { arabic: "البينة", urdu: "البینہ", english: "Al-Bayyinah (The Clear Evidence)" },
  { arabic: "الزلزلة", urdu: "الزلزلة", english: "Az-Zalzalah (The Earthquake)" },
  { arabic: "العادیات", urdu: "العادیات", english: "Al-Adiyat (The Courser)" },
  { arabic: "القارعة", urdu: "القاریعہ", english: "Al-Qari’ah (The Calamity)" },
  { arabic: "التكاثر", urdu: "التکاثر", english: "At-Takathur (Rivalry in world increase)" },
  { arabic: "العصر", urdu: "ال-عصر", english: "Al-Asr (Time / The Declining Day)" },
  { arabic: "الهمزة", urdu: "الهمزة", english: "Al-Humazah (The Traducer)" },
  { arabic: "الفیل", urdu: "الفیل", english: "Al-Fil (The Elephant)" },
  { arabic: "قریش", urdu: "قریش", english: "Al-Quraish" },
  { arabic: "الماعون", urdu: "الماعون", english: "Al-Ma’un (Small Kindnesses)" },
  { arabic: "الکوثر", urdu: "الکوثر", english: "Al-Kawthar (Abundance)" },
  { arabic: "الکافرون", urdu: "الکافرون", english: "Al-Kafirun (The Disbelievers)" },
  { arabic: "النصر", urdu: "النصر", english: "An-Nasr (Divine Support)" },
  { arabic: "المسد", urdu: "المسد", english: "Al-Masad / Al-Lahab (The Palm Fiber)" },
  { arabic: "الإخلاص", urdu: "الإخلاص", english: "Al-Ikhlas (Sincerity)" },
  { arabic: "الفلق", urdu: "الفلق", english: "Al-Falaq (The Daybreak)" },
  { arabic: "الناس", urdu: "الناس", english: "An-Nas (The Mankind)" }
];


  surahTranslations.forEach((surah, index) => {
    const item = document.createElement("button");
    item.classList.add("surah-item");
    item.innerHTML = `
      <div class="surah-name">
        <div class="arabic">${surah.arabic}</div>
        <div class="urdu">${surah.urdu}</div>
        <div class="english">${surah.english}</div>
      </div>
    `;
    item.addEventListener("click", () => {
      select.selectedIndex = index;
      select.dispatchEvent(new Event("change"));
      popup.style.display = "none";
    });
    popup.appendChild(item);
  });

  // Button actions
  openBtn.addEventListener("click", () => (popup.style.display = "flex"));
  closeBtn.addEventListener("click", () => (popup.style.display = "none"));
}


// ==== Qur’an Data & Elements ====
const quranContainer = document.getElementById('quranContainer');
const surahSelect = document.getElementById('surah-select');
const searchInput = document.getElementById('quranSearch');

// Mobile dropdown
const mobileDropdown = document.createElement('div');
mobileDropdown.className = 'mobile-dropdown';
document.body.appendChild(mobileDropdown);

const closeBtn = document.createElement('button');
closeBtn.className = 'close-btn';
closeBtn.textContent = 'Close';
mobileDropdown.appendChild(closeBtn);

const mobileTitle = document.createElement('h3');
mobileTitle.textContent = 'Select Surah';
mobileDropdown.appendChild(mobileTitle);

const mobileList = document.createElement('div');
mobileList.className = 'mobile-surah-list';
mobileDropdown.appendChild(mobileList);

closeBtn.addEventListener('click', () => {
  mobileDropdown.style.display = 'none';
});

// ==== Load Qur’an JSON ====
let quran = [];
fetch('data/full_quran.json')
  .then(res => res.json())
  .then(data => {
    quran = data;

    // Populate desktop dropdown
    quran.forEach((surah, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${surah.englishName} (${surah.name})`;
      surahSelect.appendChild(option);

      // Mobile buttons
      const btn = document.createElement('button');
      btn.className = 'surah-item';
      btn.innerHTML = `
        <div class="surah-name">
          <span class="arabic">${surah.name}</span>
          ${surah.urduName ? `<span class="urdu">${surah.urduName}</span>` : ''}
          <span class="english">${surah.englishName}</span>
        </div>`;
      btn.addEventListener('click', () => {
        displaySurah(surah);
        mobileDropdown.style.display = 'none';
      });
      mobileList.appendChild(btn);
    });

    // Show first Surah by default
    displaySurah(quran[0]);
  });

// ==== Display Surah Function ====
function displaySurah(surah) {
  quranContainer.innerHTML = ''; 
  const surahBlock = document.createElement('div');
  surahBlock.className = 'surah-block';

  const title = document.createElement('h2');
  title.className = 'surah-title';
  title.textContent = `${surah.englishName} (${surah.name})`;
  surahBlock.appendChild(title);

  if (surah.number !== 9) {
    const bismillah = document.createElement('p');
    bismillah.className = 'bismillah';
    bismillah.textContent = 'بسم الله الرحمن الرحيم';
    surahBlock.appendChild(bismillah);
  }

  const ayahContainer = document.createElement('div');
  ayahContainer.className = 'ayah-container';
  surah.ayahs.forEach((ayah, index) => {
    const ayahElem = document.createElement('span');
    ayahElem.className = 'ayah';
    ayahElem.innerHTML = `${ayah.text} <span class="ayah-num">(${index + 1})</span>`;
    ayahContainer.appendChild(ayahElem);
  });
  surahBlock.appendChild(ayahContainer);

  quranContainer.appendChild(surahBlock);
}

// ==== Desktop Dropdown Change ====
surahSelect.addEventListener('change', () => {
  const selectedSurah = quran[surahSelect.value];
  displaySurah(selectedSurah);
});

// ==== Mobile Dropdown Trigger ====
surahSelect.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    e.preventDefault();
    mobileDropdown.style.display = 'flex';
  }
});

// ==== Live Multilingual Search ====
const searchResults = document.createElement('div');
searchResults.className = 'search-results';
searchResults.style.position = 'absolute';
searchResults.style.top = '100%';
searchResults.style.left = '0';
searchResults.style.width = '100%';
searchResults.style.background = '#fff';
searchResults.style.border = '1px solid #0a8754';
searchResults.style.maxHeight = '300px';
searchResults.style.overflowY = 'auto';
searchResults.style.zIndex = '1002';
searchResults.style.display = 'none';
searchInput.parentElement.appendChild(searchResults);

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = '';

  if (!query) {
    searchResults.style.display = 'none';
    return;
  }

  const matches = quran.filter(surah =>
    surah.name.includes(query) ||
    (surah.englishName && surah.englishName.toLowerCase().includes(query)) ||
    (surah.urduName && surah.urduName.includes(query))
  );

  if (matches.length === 0) {
    const noRes = document.createElement('div');
    noRes.textContent = 'No results found';
    noRes.style.padding = '10px';
    searchResults.appendChild(noRes);
  } else {
    matches.forEach(surah => {
      const item = document.createElement('div');
      item.className = 'search-item';
      item.style.padding = '10px';
      item.style.cursor = 'pointer';
      item.style.borderBottom = '1px solid #0a8754';
      item.innerHTML = `
        <div class="surah-name">
          <span class="arabic">${surah.name}</span>
          ${surah.urduName ? `<span class="urdu">${surah.urduName}</span>` : ''}
          <span class="english">${surah.englishName}</span>
        </div>`;
      item.addEventListener('click', () => {
        displaySurah(surah);
        surahSelect.value = quran.indexOf(surah);
        searchResults.style.display = 'none';
        searchInput.value = '';
      });
      searchResults.appendChild(item);
    });
  }

  searchResults.style.display = 'block';
});

// Close search results if clicked outside
document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.style.display = 'none';
  }
});
