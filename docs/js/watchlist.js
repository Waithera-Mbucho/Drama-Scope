const container = document.getElementById('watchlistContainer');
const list = JSON.parse(localStorage.getItem('dramascope_watchlist')) || [];

if (list.length === 0) {
  container.innerHTML = '<p>You haven\'t added any dramas yet. Go to <a href="drama.html">Discover Dramas</a> to start!</p>';
} else {
  list.forEach((d, i) => {
    const card = document.createElement('div');
    card.className = 'drama-card';
    card.innerHTML = `
          <img src="${d.poster}" alt="${d.title} poster">
          <div class="drama-info">
            <h3>${d.title}</h3>
            <p>${d.year} • ${d.country}</p>
            ${d.genres.map(g => `<span class="badge">${g}</span>`).join('')}
            <br/>
            ${d.tropes.slice(0, 3).map(t => `<span class="badge">${t}</span>`).join('')}
          </div>
          <button class="remove-btn" data-idx="${i}">Remove</button>
        `;
    container.appendChild(card);
  });

  container.addEventListener('click', e => {
    if (!e.target.matches('.remove-btn')) return;
    const idx = +e.target.dataset.idx;
    list.splice(idx, 1);
    localStorage.setItem('dramascope_watchlist', JSON.stringify(list));
    location.reload();
  });
}