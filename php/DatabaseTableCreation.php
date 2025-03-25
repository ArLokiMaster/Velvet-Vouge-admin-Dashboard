<?php
include 'DatabaseConn.php';

// Database main table in variable
$mainProduct = "vv_product_main";
$variant = "vv_variant";
$reviews = "vv_reviews";
$addToCart = "vv_add_to_cart";
$customer = "vv_customer";
$admin = "vv_controllers_login";

// Create admin table
$adminTable = "CREATE TABLE IF NOT EXISTS $admin (
    Creator_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    CreatorName VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
)";

if ($conn->query($adminTable) === TRUE) {
    echo "Table $admin created successfully!<br>";
} else {
    echo "Error creating $admin table: " . $conn->error . "<br>";
}

// Create main product table
$mainProductTable = "CREATE TABLE IF NOT EXISTS $mainProduct (
    P_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    CAT1 VARCHAR(30) NOT NULL,
    CAT2 VARCHAR(30) NOT NULL,
    CAT3 VARCHAR(30) NOT NULL,
    Highlight VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    Creator_ID INT NOT NULL,
    CreateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_Creator FOREIGN KEY (Creator_ID) REFERENCES $admin(Creator_ID)
)";

if ($conn->query($mainProductTable) === TRUE) {
    echo "Table $mainProduct created successfully!<br>";
} else {
    echo "Error creating $mainProduct table: " . $conn->error . "<br>";
}

// Create variant table
$variantTable = "CREATE TABLE IF NOT EXISTS $variant (
    Variant_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Product_ID INT NOT NULL,
    V_Name VARCHAR(50) NOT NULL,
    V_Selling_Price DECIMAL(10, 2) NOT NULL,
    V_Discount_Price DECIMAL(10, 2) NOT NULL,
    qty INT NOT NULL,
    CreateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_Product_ID FOREIGN KEY (Product_ID) 
        REFERENCES $mainProduct(P_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)";

if ($conn->query($variantTable) === TRUE) {
    echo "Table $variant created successfully!<br>";
} else {
    echo "Error creating $variant table: " . $conn->error . "<br>";
}

// Define the table name
$customerTable = "CREATE TABLE IF NOT EXISTS vv_customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    profile_image_url VARCHAR(255) DEFAULT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) DEFAULT NULL,
    address TEXT DEFAULT NULL,
    city VARCHAR(100) DEFAULT NULL,
    state VARCHAR(100) DEFAULT NULL,
    zip_code VARCHAR(20) DEFAULT NULL,
    country_code VARCHAR(100) DEFAULT NULL,
    session_token VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_subscribed TINYINT(1) DEFAULT 0
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";

if ($conn->query($customerTable) === TRUE) {
    echo "Table 'vv_customer' created successfully!<br>";
} else {
    echo "Error creating 'vv_customer' table: " . $conn->error . "<br>";
}


// Create reviews table
$customerProductReview = "CREATE TABLE IF NOT EXISTS $reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    proof_image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES $mainProduct(P_ID) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES $customer(id) ON DELETE CASCADE
)";

if ($conn->query($customerProductReview) === TRUE) {
    echo "Table $reviews created successfully!<br>";
} else {
    echo "Error creating $reviews table: " . $conn->error . "<br>";
}

// Create add to cart table
$addToCartTable = "CREATE TABLE IF NOT EXISTS $addToCart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES $customer(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES $mainProduct(P_ID) ON DELETE CASCADE
)";

if ($conn->query($addToCartTable) === TRUE) {
    echo "Table $addToCart created successfully!<br>";
} else {
    echo "Error creating $addToCart table: " . $conn->error . "<br>";
}

// Create image table
$imageTable = "CREATE TABLE IF NOT EXISTS vv_product_images (
    image_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_main_image BOOLEAN DEFAULT FALSE,  -- Whether this is the main product image
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_Product_Image FOREIGN KEY (product_id)
        REFERENCES $mainProduct(P_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)";

if ($conn->query($imageTable) === TRUE) {
    echo "Table vv_product_images created successfully!<br>";
} else {
    echo "Error creating vv_product_images table: " . $conn->error . "<br>";
}


// Create cart table
$cartTable = "CREATE TABLE IF NOT EXISTS vv_product_cart (
    cart_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    variant_id INT NOT NULL,
    selected_Count INT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_Product_Cart FOREIGN KEY (variant_id)
        REFERENCES $variant(Variant_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_Customer_Cart FOREIGN KEY (customer_id)
        REFERENCES vv_customer(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)";

if ($conn->query($cartTable) === TRUE) {
    echo "Table vv_product_Cart created successfully!<br>";
} else {
    echo "Error creating vv_product_Cart table: " . $conn->error . "<br>";
}

?>