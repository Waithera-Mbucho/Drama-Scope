let dramas = [];

// 1) Load your JSON data
fetch('../asset.json')
  .then(res => {
    if (!res.ok) throw new Error("Failed to load asset.json");
    return res.json();
  })
  .then(data => {
    dramas = data;            // now dramas is your array from asset.json
    initFilters();            // build checkboxes & initial render
  })
  .catch(err => console.error(err));

// 2) Move your UI init into a function
function initFilters() {
  genreFiltersDiv.innerHTML = coreGenres.map(g => createCheckbox(g, "genre")).join("");
  tropeFiltersDiv.innerHTML = tropes.map(t => createCheckbox(t, "trope")).join("");

  renderList(dramas);        // show everything at first load
  attachEventListeners();    // wire up search + filter events
}

// … your existing renderList, filterDramas, attachEventListeners, etc. …

/* ---------- CONSTANTS ---------- */
{
"coreGenres" = [
  "Romance", "Comedy / Romantic Comedy (Rom-Com)", "Melodrama", "Fantasy",
  "Historical / Period Drama (Sageuk in Korean)", "Modern Slice of Life", "Action / Thriller / Suspense",
  "Mystery / Crime", "Supernatural", "Horror / Psychological"
];
}
const tropes = [
  "Revenge / Vendetta", "Tragic Love", "Love Triangle", "Secret Identity",
  "Love After Betrayal", "Reincarnation / Past Lives", "Time Travel",
  "Parallel Universes", "Immortals / Mythical Beings", "Body Swapping",
  "Strong Female Lead", "Cold Male Lead / Tsundere", "Chaebol / CEO Romance",
  "Poor Girl x Rich Guy", "Boys’ Love (BL)", "School / Campus Drama",
  "Office Romance", "Celebrity & Idol Industry", "Contract Marriage / Fake Relationship",
  "Noona Romance (Older Woman / Younger Man)", "Palace Politics", "Medical / Legal Dramas"
];

// Wrap everything so it only runs once the page is ready//
document.addEventListener("DOMContentLoaded", () => {
  // 1) DOM references – make sure these IDs exist in your drama.html
  const searchBar       = document.getElementById("searchBar");
  const genreFiltersDiv = document.getElementById("genreFilters");
  const tropeFiltersDiv = document.getElementById("tropeFilters");
  const dramaListDiv    = document.getElementById("dramaList");

  // 2) Your filter options
  const coreGenres = [ /* …same list you used before… */ ];
  const tropes     = [ /* …same list… */ ];

  // 3) Helper to create checkbox HTML
  function createCheckbox(name, group) {
    const id = `${group}-${name}`.replace(/\s+/g, "-");
    return `<label style="display:block;">
      <input type="checkbox" value="${name}" data-group="${group}" id="${id}" />
      ${name}
    </label>`;
  }

  // 4) Our data array – starts empty until fetch completes
  let dramas = [];

  // 5) Fetch your JSON file (adjust the path if script.js lives in docs/script/)
  fetch("../asset.json")
    .then(res => {
      console.log("asset.json status:", res.status);
      return res.json();
    })
    .then(data => {
      dramas = data;
      console.log("Loaded dramas:", dramas);
      initUI();               // build filters & initial render
    })
    .catch(err => console.error("Failed to load dramas:", err));

  // 6) Build filter checkboxes, render full list, attach events
  function initUI() {
    genreFiltersDiv .innerHTML = coreGenres.map(g => createCheckbox(g, "genre")).join("");
    tropeFiltersDiv .innerHTML = tropes    .map(t => createCheckbox(t, "trope")).join("");
    renderList(dramas);
    attachEventListeners();
  }

  // 7) Render a list of drama objects as cards
  function renderList(list) {
    if (!list.length) {
      dramaListDiv.innerHTML = "<p>No dramas match your filters.</p>";
      return;
    }
    dramaListDiv.innerHTML = list.map(d => `
      <div class="drama-card">
        <img src="${d.poster}" alt="${d.title} poster" loading="lazy">
        <h3>${d.title}</h3>
        <p>${d.year} • ${d.country}</p>
        ${d.genres.map(g => `<span class="badge genre">${g}</span>`).join("")}
        ${d.tropes.map(t => `<span class="badge trope">${t}</span>`).join("")}
      </div>
    `).join("");
  }

  // 8) Filter logic: title search + genre & trope AND‑filter
  function filterDramas() {
    const term = searchBar.value.trim().toLowerCase();
    const selectedGenres = [...document.querySelectorAll('input[data-group="genre"]:checked')].map(cb => cb.value);
    const selectedTropes = [...document.querySelectorAll('input[data-group="trope"]:checked')].map(cb => cb.value);

    const filtered = dramas.filter(d => {
      const matchesSearch = d.title.toLowerCase().includes(term);
      const matchesGenres = selectedGenres.every(g => d.genres.includes(g));
      const matchesTropes = selectedTropes.every(t => d.tropes.includes(t));
      return matchesSearch && matchesGenres && matchesTropes;
    });

    renderList(filtered);
  }

  // 9) Hook up the live search + checkbox changes
  function attachEventListeners() {
    searchBar.addEventListener("input", filterDramas);
    document.getElementById("filters").addEventListener("change", e => {
      if (e.target.matches('input[type="checkbox"]')) filterDramas();
    });
  }
});
