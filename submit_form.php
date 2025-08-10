<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    // Database connection settings
    $servername = "localhost";
    $username = "your_db_username";
    $password = "your_db_password";
    $dbname = "trimline_db";
    
    try {
        // Create connection
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Create table if not exists (run once)
        $sql = "CREATE TABLE IF NOT EXISTS messages (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            subject VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        $conn->exec($sql);
        
        // Insert data
        $stmt = $conn->prepare("INSERT INTO messages (name, email, subject, message) 
                               VALUES (:name, :email, :subject, :message)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':subject', $subject);
        $stmt->bindParam(':message', $message);
        $stmt->execute();
        
        // Success response
        echo json_encode(['status' => 'success', 'message' => 'Thank you for your message! We will get back to you soon.']);
        
    } catch(PDOException $e) {
        // Error response
        echo json_encode(['status' => 'error', 'message' => 'There was an error sending your message. Please try again.']);
    }
    
    $conn = null;
} else {
    // Not a POST request
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>