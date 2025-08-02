document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("places-modal");
  const modalContent = document.getElementById("modal-content");
  const closeModalBtn = document.getElementById("close-modal");
  const container = document.getElementById("cards-container");

  // Fetch and display cards
  fetch("data/places.json")
    .then((res) => res.json())
    .then((data) => {
      data.places.forEach((place, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
          <h2>${place.name}</h2>
          <figure><img src="images/${place.image}" alt="${place.name}"></figure>
          <address>${place.address}</address>
          <p>${place.description}</p>
          <button>Learn More</button>
        `;

        container.appendChild(card);
      });
    });

  // Visit message using modal only
  const lastVisit = localStorage.getItem("lastVisit");
  const now = new Date();
  let message = "Welcome! Let us know if you have any questions.";

  if (lastVisit) {
    const previous = new Date(lastVisit);
    const diffTime = now.getTime() - previous.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      message = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${diffDays} days ago.`;
    }
  }

  modalContent.textContent = message;
  modal.showModal();
  localStorage.setItem("lastVisit", now.toISOString());

  closeModalBtn.addEventListener("click", () => modal.close());
});
