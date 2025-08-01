document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('searchBar');
  const genreDropdown = document.getElementById('genreDropdown');
  const dramaListDiv = document.getElementById('dramaList');
   
  let dramas = [];

   fetch('asset.json')
    .then(res => res.json())
    .then(data => {
      dramas = data;
      renderList(dramas);
    })
    .catch(err => {
      console.error('Failed to load asset.json:', err);
      dramaListDiv.innerHTML = '<p>Failed to load dramas.</p>';
    });

    
  function renderList(list) {
    if (!list.length) {
      dramaListDiv.innerHTML = '<p>No dramas match your filters.</p>';
      return;
    }
    dramaListDiv.innerHTML = list.map(d => `
      <div class="drama-card">
        <img src="${d.poster}" alt="${d.title} poster" loading="lazy">
        <h3>${d.title}</h3>
        <p>${d.year} • ${d.country}</p>
       <div>
          ${d.genres.map(g => `<span class="badge">${g}</span>`).join('')}
          ${d.tropes.map(t => `<span class="badge">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  function filterDramas() {
    const term = searchBar.value.trim().toLowerCase();
    const selectedGenre = genreDropdown.value;
    const selectedTropes = [...document.querySelectorAll('input[data-group="trope"]:checked')].map(cb => cb.value);

    const filtered = dramas.filter(d => {
      const matchesSearch =
        d.title.toLowerCase().includes(term) ||
        d.genres.some(g => g.toLowerCase().includes(term));
      const matchesGenre = !selectedGenre || d.genres.includes(selectedGenre);
      const matchesTropes = selectedTropes.every(t => d.tropes.includes(t));
      return matchesSearch && matchesGenre && matchesTropes;
    });

    renderList(filtered);
  }

  searchBar.addEventListener('input', filterDramas);
  genreDropdown.addEventListener('change', filterDramas);
  document.getElementById('filters').addEventListener('change', e => {
    if (e.target.matches('input[data-group="trope"]')) filterDramas();
  });
});