document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const displayDiv = document.getElementById("form-data-display");

  const fields = {
    "First Name": params.get("firstName"),
    "Last Name": params.get("lastName"),
    "Email": params.get("email"),
    "Mobile Number": params.get("phone"),
    "Anime-Inspired Food Suggestions": params.get("animeFoodSuggestion")
  };

  for (const [label, value] of Object.entries(fields)) {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${label}:</strong> ${value ? value.replace(/\+/g, ' ') : 'Not Provided'}`;
    displayDiv.appendChild(p);
  }
});
