// scripts/spotlight.js

const spotlightContainer = document.querySelector('#spotlight-container');

async function loadSpotlights() {
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();

    // Ensure we have an array
    if (!Array.isArray(data.companies)) {
      throw new Error('Invalid JSON: expected data.companies array');
    }

    // Filter Gold (3) or Silver (2)
    const eligible = data.companies.filter(c => c.membership === 3 || c.membership === 2);

    // Choose 2 or 3 at random
    const count = Math.min(eligible.length, 2 + Math.floor(Math.random() * 2)); // yields 2 or 3
    const selected = eligible.sort(() => 0.5 - Math.random()).slice(0, count);

    // Render spotlight cards
    spotlightContainer.innerHTML = '';
    selected.forEach(company => {
      const card = document.createElement('div');
      card.className = 'spotlight-card';
      card.innerHTML = `
        <h3>${company.name}</h3>
        <img src="images/${company.image}" alt="${company.name} logo" width="100">
        <p>📞 ${company.phone}</p>
        <p>📍 ${company.address}</p>
        <p><a href="${company.website}" target="_blank">Visit Website</a></p>
        <p><em>${ company.membership === 3 ? 'Gold' : 'Silver' } Member</em></p>
        <p>${company.description}</p>
      `;
      spotlightContainer.appendChild(card);
    });

  } catch (err) {
    console.error('Spotlight error:', err);
    spotlightContainer.textContent = 'Unable to load member spotlights';
  }
}

// initialize
loadSpotlights();
