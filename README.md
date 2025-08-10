# DramaScope

DramaScope is a responsive, client-side web application for discovering, filtering, and tracking your favorite Asian dramas. With a rich set of features—including dynamic search, multi‑select genre & trope filters, a touch‑friendly carousel, and a persistent watchlist—DramaScope delivers an engaging browsing experience without any server-side dependencies.

# Features

Dynamic Search & FilteringReal‑time, reload‑free filtering by title, genres, and narrative tropes using client‑side JavaScript and an external JSON data source.

Multi‑Select Genre & Trope PanelsAccessible collapsible <details> panels that let users select multiple genres and tropes simultaneously, applying AND‑logic to refine results.

Touch‑Friendly CarouselA single‑row, horizontally scrollable featured carousel with CSS scroll-snap; hover or tap on a poster to reveal its release year.

Persistent WatchlistAdd or remove dramas from a personal watchlist stored in localStorage, preserving user selections across sessions.

Responsive DesignBuilt with CSS Grid and Flexbox to ensure seamless layouts on mobile, tablet, and desktop viewports.

# Technologies Used

Frontend: HTML5, CSS3 (Flexbox, Grid, CSS Scroll Snap), JavaScript (ES6+)

Data: asset.json for drama metadata (titles, posters, genres, tropes, descriptions)

Storage: Browser localStorage for watchlist persistence

Deployment: GitHub Pages (served from the /docs directory)

# Prerequisites

A modern web browser (Chrome, Firefox, Safari, Edge)

(Optional) A simple HTTP server for local testing, such as Python’s built‑in server:

# Python 3
python3 -m http.server 8000

Installation & Setup

Clone the repository

git clone https://github.com/your-username/DramaScope.git
cd DramaScope/docs

Serve locally (if you want to test before deploying):

# From inside the docs/ folder
python3 -m http.server 8000

Then open http://localhost:8000/index.html in your browser.

Deploy to GitHub Pages

Ensure your index.html, drama.html, watchlist.html, asset.json, images/, and script/ folders all live under the docs/ directory.

Push to main (or master)—GitHub Pages will automatically publish at:https://your-username.github.io/DramaScope/

# Usage

Home Page CarouselSwipe or scroll horizontally through featured dramas. Hover or tap on a poster to reveal the release year.

Discover DramasNavigate to drama.html:

Search: Type in the search bar to filter by title.

Genres & Tropes: Expand the panels, select multiple checkboxes, and watch the results update instantly.

# Manage Watchlist

In the drama cards, click “Add to Watchlist” to save a drama.

View watchlist.html to see saved dramas; click “Remove” to delete from your list.

# Screenshots

![Home Page](images/homepage.png)
Home page

![Discover Page](images/discoverpagescreenshot.png)
Discover page

![Release Page](images/releasespage.png)
Release page

![Watchlist Page](images/watchlistpage.png)
Watchlist page

![Details Page](images/detailspage.png)
Details page

![Sign In Page](docs/screenshots/signin.png)
Sign-in page

![Login Page](images/loginpage.png)
Login page




# Contributing

Contributions are welcome! To propose changes:

Fork the repository.

Create a feature branch (git checkout -b feature/YourFeature).

Make your changes and commit (git commit -m "Add Awesome Feature").

Push to your branch (git push origin feature/YourFeature).

Open a Pull Request against the main branch.

Please follow the project’s Code of Conduct and ensure your code is well-documented and tested.
