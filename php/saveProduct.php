<?php
require_once 'config.php';

header('Content-Type: application/json');

try {
    $conn = connectDB();
    $conn->begin_transaction();

    // Validate and sanitize input
    $productName = htmlspecialchars($_POST['productName']);
    $description = htmlspecialchars($_POST['productDescription']);
    $highlights = htmlspecialchars($_POST['productHighlights']);
    $category1 = htmlspecialchars($_POST['CAT1']);
    $category2 = htmlspecialchars($_POST['CAT2']);
    $category3 = htmlspecialchars($_POST['CAT3']);
    $weight = floatval($_POST['productWeight']);
    $variants = json_decode($_POST['variants'], true);

    // Insert product
    $stmt = $conn->prepare("INSERT INTO vv_product_main (Title, Description, Highlight, Creator_ID, CAT1, CAT2, CAT3) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $creatorId = 1; // Replace with actual user ID from session
    $stmt->bind_param("sssisss", $productName, $description, $highlights, $creatorId, $category1, $category2, $category3);
    $stmt->execute();
    
    $productId = $conn->insert_id;

    // Handle variants
    $variantStmt = $conn->prepare("INSERT INTO vv_variant (Product_ID, V_Name, V_Selling_Price, V_Discount_Price, qty) VALUES (?, ?, ?, ?, ?)");
    
    foreach ($variants as $variant) {
        $variantStmt->bind_param("isddi", 
            $productId,
            $variant['name'],
            $variant['sellingPrice'],
            $variant['discountPrice'],
            $variant['stock']
        );
        $variantStmt->execute();
    }

    // Handle images
    if (isset($_FILES['images'])) {
        $imageStmt = $conn->prepare("INSERT INTO vv_product_images (product_id, image_url, is_main_image) VALUES (?, ?, ?)");
        
        foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
            $fileName = $_FILES['images']['name'][$key];
            $fileType = $_FILES['images']['type'][$key];
            $fileSize = $_FILES['images']['size'][$key];

            // Validate file
            if (!in_array($fileType, ['image/jpeg', 'image/png', 'image/jpg'])) {
                throw new Exception("Invalid file type: " . $fileName);
            }

            if ($fileSize > 5 * 1024 * 1024) {
                throw new Exception("File too large: " . $fileName);
            }

            // Generate unique filename
            $uniqueName = uniqid() . '_' . $fileName;
            $destination = UPLOAD_DIR . $uniqueName;

            if (move_uploaded_file($tmp_name, $destination)) {
                $isMainImage = ($key === 0) ? 1 : 0;
                $imageStmt->bind_param("isi", $productId, $uniqueName, $isMainImage);
                $imageStmt->execute();
            } else {
                throw new Exception("Failed to upload: " . $fileName);
            }
        }
    }

    $conn->commit();
    echo json_encode(['success' => true, 'message' => 'Product saved successfully']);

} catch (Exception $e) {
    if (isset($conn)) {
        $conn->rollback();
    }
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} finally {
    if (isset($stmt)) $stmt->close();
    if (isset($variantStmt)) $variantStmt->close();
    if (isset($imageStmt)) $imageStmt->close();
    if (isset($conn)) $conn->close();
}
?>