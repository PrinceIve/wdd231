const container = document.getElementById("members-container");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Data fetch failed.");
    const data = await response.json();
    displayMembers(data.companies);
  } catch (error) {
    console.error("Error:", error);
    container.innerHTML = "<p>Unable to load members.</p>";
  }
}

function displayMembers(companies) {
  container.innerHTML = "";
  companies.forEach(company => {
    const card = document.createElement("div");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="images/${company.image}" alt="${company.name} logo">
      <div>
        <h3>${company.name}</h3>
        <p>${company.description}</p>
        <p><strong>Address:</strong> ${company.address}</p>
        <p><strong>Phone:</strong> ${company.phone}</p>
        <p><a href="${company.website}" target="_blank">Visit Website</a></p>
        <p><strong>Membership:</strong> ${membershipLabel(company.membership)}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function membershipLabel(level) {
  switch(level) {
    case 3: return "Gold";
    case 2: return "Silver";
    case 1: return "Member";
    default: return "Member";
  }
}

// Event listeners for toggles
gridBtn.addEventListener("click", () => {
  container.classList.remove("list-view");
});
listBtn.addEventListener("click", () => {
  container.classList.add("list-view");
});

// Load members on page load
loadMembers();
