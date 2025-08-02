document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('searchBar');
  const genreDropdown = document.getElementById('genreDropdown');
  const dramaListDiv = document.getElementById('dramaList');
  const carouselTrack = document.getElementById('allCarouselTrack');
  const detailsDiv = document.getElementById('details');
  const dramaCards = dramaListDiv ? Array.from(dramaListDiv.querySelectorAll('.drama-card')) : [];
  let dramas = [];

  const assetPath = location.pathname.startsWith('/docs/') ? 'asset.json' : 'docs/asset.json';
  fetch(assetPath)
    .then(res => res.json())
    .then(data => {
      dramas = data;
      if (carouselTrack) renderCarousel(dramas);
      if (detailsDiv) showDetails();
    })
    .catch(err => {
      console.error('Failed to load asset.json:', err);
      if (dramaListDiv) dramaListDiv.innerHTML = '<p>Failed to load dramas.</p>';
    });

  function renderCarousel(list) {
    if (!carouselTrack) return;
    carouselTrack.innerHTML = list.map(d => `
      <div class="carousel-item">
        <a href="drama.html?title=${encodeURIComponent(d.title)}">
          <img src="${d.poster}" alt="${d.title} poster">
          <div class="carousel-overlay"><span>${d.year}</span></div>
        </a>
      </div>
    `).join('');
  }
  function filterDramas() {
    const term = searchBar.value.trim().toLowerCase();
    const selectedGenre = genreDropdown.value;
    const selectedTropes = [...document.querySelectorAll('input[data-group="trope"]:checked')].map(cb => cb.value);

    
    dramaCards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const genres = card.dataset.genres.split(',');
      const tropes = card.dataset.tropes.split(',');
      const matchesSearch = !term || title.includes(term) || genres.some(g => g.toLowerCase().includes(term));
      const matchesGenre = !selectedGenre || genres.includes(selectedGenre);
      const matchesTropes = selectedTropes.every(t => tropes.includes(t));
      card.style.display = (matchesSearch && matchesGenre && matchesTropes) ? '' : 'none';
    });
  }

  if (searchBar && genreDropdown && dramaListDiv) {
    searchBar.addEventListener('input', filterDramas);
    genreDropdown.addEventListener('change', filterDramas);
    document.getElementById('filters').addEventListener('change', e => {
      if (e.target.matches('input[data-group="trope"]')) filterDramas();
    });
    filterDramas();
  }

  
  dramaListDiv?.addEventListener('click', e => {
    if (!e.target.classList.contains('like-btn')) return;
    const title = decodeURIComponent(e.target.dataset.title);
    const drama = dramas.find(d => d.title === title);
    if (!drama) return;
    const list = JSON.parse(localStorage.getItem('dramascope_watchlist')) || [];
    if (!list.some(d => d.title === drama.title)) {
      list.push(drama);
      localStorage.setItem('dramascope_watchlist', JSON.stringify(list));
    }
    e.target.classList.add('liked');
  });
  function showDetails() {
    const params = new URLSearchParams(location.search);
    const title = params.get('title');
    const drama = dramas.find(d => d.title === title);
    if (!drama) {
      detailsDiv.innerHTML = '<p>Drama not found.</p>';
      return;
    }
    document.getElementById('detailTitle').textContent = drama.title;
    detailsDiv.innerHTML = `
      <img src="${drama.poster}" alt="${drama.title} poster" style="max-width:300px;width:100%;height:auto;">
      <p><strong>Native Title:</strong> ${drama['native titile'] || ''}</p>
      <p><strong>Year:</strong> ${drama.year}</p>
      <p><strong>Country:</strong> ${drama.country}</p>
      <p><strong>Genres:</strong> ${drama.genres.join(', ')}</p>
      <p><strong>Cast:</strong> ${drama.cast.join(', ')}</p>
      <p>${drama.description}</p>
    `;
  }

});