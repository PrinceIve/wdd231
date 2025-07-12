// Declare the URL
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Select the cards container
const cards = document.querySelector('#cards');

// Define the async function to fetch the data
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  //console.table(data.prophets);
  displayProphets(data.prophets);
}

// Call the function to load data
getProphetData();

// Define the display function
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create the elements
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let birthDate = document.createElement('p');
    let birthPlace = document.createElement('p');

    // Populate the elements
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Append elements to the card
    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);

    // Append the card to the container
    cards.appendChild(card);
  });
};
