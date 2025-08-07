document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("membership-modal");
  const closeBtn = document.getElementById("close-modal");

  const cartModal = document.getElementById("cart-modal");
  const closeCart = document.getElementById("close-cart");
  const cartLink = document.getElementById("cart-link");
  const clearCart = document.getElementById("clear-cart");
  const cartList = document.getElementById("cart-list");

  const cartCount = document.getElementById("cart-count");

  let count = parseInt(localStorage.getItem("cartCount")) || 0;
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartCount.textContent = count;

  const buttons = document.querySelectorAll(".order-btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const itemName = btn.closest(".menu-item")?.querySelector("h3")?.textContent || "Item";

    count++;
    cartItems.push(itemName.trim());

    localStorage.setItem("cartCount", count);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    cartCount.textContent = count;

    document.getElementById("modal-title").textContent = "Item Added to Cart";
    document.getElementById("modal-content").textContent = `${itemName} added to cart!`;
    modal.showModal();
  });
});


  closeBtn.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });

  // Show Cart Modal on Cart Link Click
  cartLink.addEventListener("click", (e) => {
    e.preventDefault();
    renderCartItems();
    cartModal.showModal();
  });

  // Close cart modal
  closeCart.addEventListener("click", () => {
    cartModal.close();
  });

  // Clear cart inside modal
  clearCart.addEventListener("click", () => {
    if (confirm("Clear your cart?")) {
      cartItems = [];
      count = 0;
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartCount");
      cartCount.textContent = "0";
      renderCartItems();
    }
  });

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
});
