document.addEventListener("DOMContentLoaded", function () {
  const variantContainer = document.getElementById("variantContainer");
  const addVariantBtn = document.getElementById("addVariant");
  let variantCount = 1;

  addVariantBtn.addEventListener("click", function () {
    const variantItem = document.createElement("div");
    variantItem.className = "variant-item";
    variantItem.innerHTML = `
            <button type="button" class="remove-variant" title="Remove Variant">
                <i class="fas fa-times"></i>
            </button>
            <div class="row g-3">
                <div class="col-md-3">
                    <div class="form-floating">
                        <input type="text" class="form-control" name="variant[${variantCount}][name]" placeholder="Variant Name" required>
                        <label>Variant Name</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-floating">
                        <input type="number" class="form-control" name="variant[${variantCount}][sellingPrice]" placeholder="Selling Price" required>
                        <label>Selling Price</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-floating">
                        <input type="number" class="form-control" name="variant[${variantCount}][discountPrice]" placeholder="Discount Price" required>
                        <label>Discount Price</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-floating">
                        <input type="number" class="form-control" name="variant[${variantCount}][stock]" placeholder="Stock" required>
                        <label>Stock</label>
                    </div>
                </div>
            </div>
        `;

    variantContainer.appendChild(variantItem);
    variantCount++;

    // Add remove handler
    variantItem
      .querySelector(".remove-variant")
      .addEventListener("click", function () {
        variantItem.remove();
      });
  });

  // Export variants data for form submission
  window.getVariantsData = function () {
    const variants = [];
    document.querySelectorAll(".variant-item").forEach((item, index) => {
      variants.push({
        name: item.querySelector('input[name$="[name]"]').value,
        sellingPrice: parseFloat(
          item.querySelector('input[name$="[sellingPrice]"]').value
        ),
        discountPrice: parseFloat(
          item.querySelector('input[name$="[discountPrice]"]').value
        ),
        stock: parseInt(item.querySelector('input[name$="[stock]"]').value),
      });
    });
    return variants;
  };
});
