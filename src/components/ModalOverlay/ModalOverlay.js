import React from "react";

// Function to open the modal
export function openModal() {
  const modalOverlay = document.getElementById("modalOverlay");
  modalOverlay.style.display = "flex";
  document.body.style.overflow = "hidden"; // Freeze scrolling
}

// Function to close the modal
function closeModal() {
  const modalOverlay = document.getElementById("modalOverlay");
  modalOverlay.style.display = "none";
  // Restore scrolling
  document.body.style.overflow = "auto";
  document.body.style.overflowX = "hidden";
}

const ModalOverlay = () => {
  return (
    <div id="modalOverlay" className="overlay">
      <div className="confirm-delete-modal">
        <p>Are you sure you want to delete this product?</p>
        <div className="button-group">
          <button className="delete-button" onClick={() => closeModal()}>
            Confirm
          </button>
          <button className="neutral-button" onClick={() => closeModal()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOverlay;
