document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("membership-modal");
  const closeBtn = document.getElementById("close-modal");

  const cartModal = document.getElementById("cart-modal");
  const closeCart = document.getElementById("close-cart");
  const cartLink = document.getElementById("cart-link");
  const clearCart = document.getElementById("clear-cart");
  const cartList = document.getElementById("cart-list");
  const cartCount = document.getElementById("cart-count");

  // Load persistent cart state
  let count = parseInt(localStorage.getItem("cartCount")) || 0;
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartCount.textContent = count;

  const menuContainer = document.querySelector('#menu-cards');

  // Fetch & display menu
  async function getMenuData() {
    try {
      const response = await fetch('data/menu.json');
      if (!response.ok) throw new Error('Failed to load menu data');
      const data = await response.json();
      displayMenuItems(data.menu);
    } catch (error) {
      console.error('Error fetching menu:', error);
      menuContainer.innerHTML = `<p class="error">Sorry! We couldn't load the menu at this time.</p>`;
    }
  }

  function displayMenuItems(items) {
    items.forEach(item => {
      const card = document.createElement('section');
      card.classList.add('menu-item');
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="menu-text">
          <h3>${item.name} – ${item.price}</h3>
          <p>${item.description}</p>
          <button class="order-btn">Add to Cart</button>
        </div>
      `;
      menuContainer.appendChild(card);
    });

    // Attach the same click handler you used in modal.js
    document.querySelectorAll(".order-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        // grab the <h3> content for name+price
        const container = btn.closest(".menu-item");
        const heading = container.querySelector("h3").textContent;
        count++;
        cartItems.push(heading);

        // persist
        localStorage.setItem("cartCount", count);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        cartCount.textContent = count;

        document.getElementById("modal-title").textContent = "Item Added to Cart";
        document.getElementById("modal-content").textContent = `${heading} added to cart!`;
        modal.showModal();
      });
    });
  }

  // Render cart list in modal
  function renderCartItems() {
    cartList.innerHTML = "";
    if (cartItems.length === 0) {
      cartList.innerHTML = "<li>Your cart is empty.</li>";
    } else {
      cartItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        cartList.appendChild(li);
      });
    }
  }

  // modal.js–style controls
  closeBtn.addEventListener("click", () => modal.close());
  modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

  cartLink.addEventListener("click", e => {
    e.preventDefault();
    renderCartItems();
    cartModal.showModal();
  });
  closeCart.addEventListener("click", () => cartModal.close());

  clearCart.addEventListener("click", () => {
    if (!cartItems.length || !confirm("Clear your cart?")) return;
    cartItems = [];
    count = 0;
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartCount");
    cartCount.textContent = "0";
    renderCartItems();
  });

  // Kick things off
  getMenuData();
});
