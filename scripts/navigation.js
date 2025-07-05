// Select the element with id 'ham-btn'
const navbutton = document.querySelector("#ham-btn");
const navBar = document.querySelector('#nav-bar');

// Add a click event listener
navbutton.addEventListener('click', () => {
    // Toggle the 'show' class on each click
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');  
});



  // Year & Last Modified
  document.querySelector("#current-year").textContent = new Date().getFullYear();
  document.querySelector("#lastModified").textContent = `Last modified: ${document.lastModified}.`;
