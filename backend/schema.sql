-- Create emundb database
CREATE DATABASE IF NOT EXISTS emun;
USE emun;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('citizen', 'admin', 'employee') NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create document_types table
CREATE TABLE IF NOT EXISTS document_types (
    doctype_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    doctype_id INT NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'approved', 'rejected', 'in_progress') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (doctype_id) REFERENCES document_types(doctype_id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO document_types (name, description) VALUES
('Birth Certificate', 'Official birth certificate issued by the municipality'),
('Marriage Certificate', 'Official marriage certificate'),
('Building Permit', 'Permission to construct or modify buildings'),
('Business License', 'License to operate a business'),
('Property Registration', 'Registration of property ownership'),
('Municipal Services', 'General municipal services request');

-- Insert sample users
INSERT INTO users (username, email, password_hash, role, address) VALUES
('admin', 'admin@monsif.gov.lb', 'hashedpassword123', 'admin', 'Municipal Building, Monsif'),
('employee1', 'employee@monsif.gov.lb', 'hashedpassword123', 'employee', 'Municipal Building, Monsif'),
('citizen1', 'citizen@example.com', 'hashedpassword123', 'citizen', '123 Main St, Monsif');

-- Insert sample documents
INSERT INTO documents (user_id, doctype_id, status, notes) VALUES
(3, 1, 'pending', 'Need for passport application'),
(3, 2, 'approved', 'Ready for pickup'),
(3, 3, 'in_progress', 'Under review by building department');
