
    document.getElementById("timestamp").value = new Date().toISOString();

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("membership-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");
  const closeModalBtn = document.getElementById("close-modal");

  document.querySelector(".membership-levels").addEventListener("click", (e) => {
    if (e.target.classList.contains("learn-more")) {
      e.preventDefault();
      const card = e.target.closest(".card");
      modalTitle.textContent = card.dataset.title;
      modalContent.textContent = card.dataset.content;
      modal.showModal();
    }
  });

  closeModalBtn.addEventListener("click", () => modal.close());
});

