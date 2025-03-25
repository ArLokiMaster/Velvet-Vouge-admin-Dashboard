document.addEventListener("DOMContentLoaded", function () {
  const imageUpload = document.getElementById("imageUpload");
  const imagePreview = document.getElementById("imagePreview");
  const imageError = document.getElementById("imageError");
  let uploadedImages = [];

  imageUpload.addEventListener("change", function (e) {
    const files = Array.from(e.target.files);

    // Validate number of images
    if (uploadedImages.length + files.length > 8) {
      imageError.textContent = "Maximum 8 images allowed";
      return;
    }

    // Process each file
    files.forEach((file) => {
      // Validate file type
      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        imageError.textContent = "Only JPG and PNG images are allowed";
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        imageError.textContent = "Image size should not exceed 5MB";
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = {
          file: file,
          preview: e.target.result,
        };
        uploadedImages.push(imageData);
        updateImagePreview();
      };
      reader.readAsDataURL(file);
    });

    // Clear input
    imageUpload.value = "";
  });

  function updateImagePreview() {
    imagePreview.innerHTML = "";
    imageError.textContent = "";

    uploadedImages.forEach((image, index) => {
      const imageItem = document.createElement("div");
      imageItem.className = "image-item";
      imageItem.draggable = true;
      imageItem.innerHTML = `
                <img src="${image.preview}" alt="Preview">
                <button type="button" class="remove-image" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            `;

      // Add drag and drop functionality
      imageItem.addEventListener("dragstart", handleDragStart);
      imageItem.addEventListener("dragover", handleDragOver);
      imageItem.addEventListener("drop", handleDrop);
      imageItem.addEventListener("dragend", handleDragEnd);

      imagePreview.appendChild(imageItem);
    });

    // Add remove image handlers
    document.querySelectorAll(".remove-image").forEach((button) => {
      button.addEventListener("click", function () {
        const index = parseInt(this.dataset.index);
        uploadedImages.splice(index, 1);
        updateImagePreview();
      });
    });
  }

  // Drag and drop functionality
  let draggedItem = null;
  let draggedIndex = null;

  function handleDragStart(e) {
    draggedItem = this;
    draggedIndex = Array.from(imagePreview.children).indexOf(this);
    this.classList.add("dragging");
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const dropIndex = Array.from(imagePreview.children).indexOf(this);
    if (draggedIndex !== dropIndex) {
      // Reorder array
      const [movedItem] = uploadedImages.splice(draggedIndex, 1);
      uploadedImages.splice(dropIndex, 0, movedItem);
      updateImagePreview();
    }
  }

  function handleDragEnd() {
    this.classList.remove("dragging");
  }

  // Export uploaded images for form submission
  window.getUploadedImages = function () {
    return uploadedImages.map((img) => img.file);
  };
});
