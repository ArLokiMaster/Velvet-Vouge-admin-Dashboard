const categories = {
  Women: {
    Clothing: [
      "Dresses",
      "Tops",
      "T-Shirts",
      "Pants",
      "Jumpsuits",
      "Jeans",
      "Skirts",
      "Shorts",
      "Activewear",
      "Sarees & Lehengas",
      "Nightwear",
      "Innerwear",
      "Lungi",
    ],
    Accessories: [
      "Jewelry",
      "Watches",
      "Hair Accessories",
      "Wallets",
      "Sunglasses",
      "Belts",
    ],
    "Bags & Shoes": ["Shoes", "Bags"],
  },
  Men: {
    Clothing: [
      "Casual Shirts",
      "Formal Shirts",
      "T-Shirts",
      "Trousers",
      "Jeans",
      "Shorts",
      "Sarong",
      "Innerwear",
      "Activewear",
    ],
    Accessories: [
      "Watches",
      "Belts",
      "Ties & Accessories",
      "Sunglasses & Caps",
      "Wallets",
    ],
    "Bags & Shoes": ["Shoes", "Bags"],
  },
  Kids: {
    "Boys Clothing": [
      "Shirts",
      "T-Shirts",
      "Trousers",
      "Jeans",
      "Shorts",
      "School Uniform",
      "Boy's Innerwear",
      "Swimwear",
    ],
    "Boy's Accessories": ["Accessories", "Watches", "Bags", "Shoes"],
    "Girls Clothing": [
      "Frocks",
      "Tops",
      "Bottoms",
      "Party Frocks",
      "Jeans",
      "Skirts",
      "School Uniforms",
    ],
    "Girl's Accessories": [
      "Accessories",
      "Watches",
      "Bags",
      "Shoes",
      "Girl's Innerwear",
    ],
  },
  "Mother & Baby": {
    "Maternity Wear": ["Maternity Dresses", "Nursing Tops", "Leggings"],
    "Baby Wear": ["Baby Clothes", "Newborn Essentials"],
    "Baby Care": ["Diapers", "Baby Lotions", "Feeding Bottles"],
    "Mother & Baby Accessories": [
      "Baby Strollers",
      "Breast Pumps",
      "Pacifiers",
    ],
  },
  "Home & Lifestyle": {
    "Home Essentials": [
      "Umbrella & Raincoat",
      "Bedroom Items",
      "Religious Items",
      "Towels",
      "Floor Mats, Carpets & Bedsheets",
      "Luggages",
    ],
    "Kitchen & Dining": ["Bottles", "Flasks", "Lunch Boxes"],
  },
  "Health & Beauty": {
    "Personal Care": ["Hair Care", "Face & Body Care", "Perfumes & Deo"],
    "Grooming Tools": ["Trimmers", "Hairdryers", "Straighteners"],
    "Safety & Hygiene": ["Protective Items", "Sanitizers"],
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const mainCategory = document.getElementById("mainCategory");
  const subCategory = document.getElementById("subCategory");
  const subSubCategory = document.getElementById("subSubCategory");

  // Populate main categories
  Object.keys(categories).forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    mainCategory.appendChild(option);
  });

  // Main category change handler
  mainCategory.addEventListener("change", function () {
    subCategory.innerHTML =
      '<option value="" disabled selected>Select Sub Category</option>';
    subSubCategory.innerHTML =
      '<option value="" disabled selected>Select Sub-Sub Category</option>';

    if (this.value) {
      Object.keys(categories[this.value]).forEach((subCat) => {
        const option = document.createElement("option");
        option.value = subCat;
        option.textContent = subCat;
        subCategory.appendChild(option);
      });
      subCategory.style.display = "block";
      subSubCategory.style.display = "none";
    } else {
      subCategory.style.display = "none";
      subSubCategory.style.display = "none";
    }
  });

  // Sub category change handler
  subCategory.addEventListener("change", function () {
    subSubCategory.innerHTML =
      '<option value="" disabled selected>Select Sub-Sub Category</option>';

    if (this.value && mainCategory.value) {
      categories[mainCategory.value][this.value].forEach((subSubCat) => {
        const option = document.createElement("option");
        option.value = subSubCat;
        option.textContent = subSubCat;
        subSubCategory.appendChild(option);
      });
      subSubCategory.style.display = "block";
    } else {
      subSubCategory.style.display = "none";
    }
  });
});
