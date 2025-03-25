document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("productForm");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const saveDraftBtn = document.getElementById("saveDraft");

  productForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
      showLoading();

      // Gather form data
      const formData = new FormData(this);

      // Add images
      const images = window.getUploadedImages();
      images.forEach((file) => {
        formData.append("images[]", file);
      });

      // Add variants
      const variants = window.getVariantsData();
      formData.append("variants", JSON.stringify(variants));

      // Send AJAX request
      const response = await fetch("php/saveProduct.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.success) {
        alert("Product saved successfully!");
        productForm.reset();
        // Reset image preview and variants
        document.getElementById("imagePreview").innerHTML = "";
        document.getElementById("variantContainer").innerHTML = `
                    <div class="variant-item">
                        <div class="row g-3">
                            <div class="col-md-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control" name="variant[0][name]" placeholder="Variant Name" required>
                                    <label>Variant Name</label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-floating">
                                    <input type="number" class="form-control" name="variant[0][sellingPrice]" placeholder="Selling Price" required>
                                    <label>Selling Price</label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-floating">
                                    <input type="number" class="form-control" name="variant[0][discountPrice]" placeholder="Discount Price" required>
                                    <label>Discount Price</label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-floating">
                                    <input type="number" class="form-control" name="variant[0][stock]" placeholder="Stock" required>
                                    <label>Stock</label>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
      } else {
        throw new Error(result.message || "Failed to save product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving product: " + error.message);
    } finally {
      hideLoading();
    }
  });

  saveDraftBtn.addEventListener("click", async function () {
    try {
      showLoading();
      const formData = new FormData(productForm);
      formData.append("isDraft", "true");

      const response = await fetch("php/saveDraft.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert("Draft saved successfully!");
      } else {
        throw new Error(result.message || "Failed to save draft");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving draft: " + error.message);
    } finally {
      hideLoading();
    }
  });

  function showLoading() {
    loadingSpinner.style.display = "flex";
  }

  function hideLoading() {
    loadingSpinner.style.display = "none";
  }
});
