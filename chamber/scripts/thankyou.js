
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const displayDiv = document.getElementById("form-data-display");

  const fields = {
    "First Name": params.get("first-name"),
    "Last Name": params.get("last-name"),
    "Email": params.get("email"),
    "Mobile Number": params.get("mobile"),
    "Business Name": params.get("business"),
    "Submitted On": params.get("timestamp")
  };

  for (const [label, value] of Object.entries(fields)) {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${label}:</strong> ${value || 'Not Provided'}`;
    displayDiv.appendChild(p);
  }
});
