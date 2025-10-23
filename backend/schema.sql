-- Create emundb database
CREATE DATABASE IF NOT EXISTS emun;
USE emun;

-- Create User table (matches your working structure)
CREATE TABLE IF NOT EXISTS `User` (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('citizen', 'admin') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create documenttype table (matches your working structure)
CREATE TABLE IF NOT EXISTS documenttype (
    type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

-- Create document table (matches your working structure)
CREATE TABLE IF NOT EXISTS document (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type_id INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected', 'in_progress') DEFAULT 'pending',
    request_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    issue_date DATETIME NULL,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES `User`(user_id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES documenttype(type_id) ON DELETE CASCADE
);

-- Insert sample data that matches your actual data
INSERT INTO documenttype (type_id, type_name, description) VALUES
(1, 'Ikhraj Eid', 'Official birth certificate issued by the municipality'),
(2, 'Ikhraj Aileh', 'Family civil status record'),
(3, 'Residency Certificate', 'Proof of residency for administrative use'),
(4, 'Building Permit', 'Authorization to construct or renovate property');

-- Insert sample users with many Lebanese names
INSERT INTO `User` (username, email, password_hash, role, created_at) VALUES
-- Your original users
('ali_admin', 'ali.admin@mounsef.gov.lb', 'hashed_admin123', 'admin', '2025-10-22 23:50:33'),
('ali_jad', 'ali.jadelaoun@gmail.com', 'hashed_pw_ali', 'citizen', '2025-10-22 23:50:33'),
('michel_ghosh', 'michel.ghosh@outlook.com', 'hashed_michel123', 'citizen', '2025-10-23 08:00:00'),
('sana_fakhry', 'sana.fakhry@gmail.com', 'hashed_sana456', 'citizen', '2025-10-23 08:15:00'),
('salim_nassar', 'salim.nassar@yahoo.com', 'hashed_salim789', 'citizen', '2025-10-23 08:30:00'),
('nour_haddad', 'nour.haddad@hotmail.com', 'hashed_nour321', 'citizen', '2025-10-23 09:00:00'),
('elias_khoury', 'elias.khoury@gmail.com', 'hashed_elias654', 'citizen', '2025-10-23 09:15:00'),
('lina_mansour', 'lina.mansour@outlook.com', 'hashed_lina987', 'citizen', '2025-10-23 09:30:00'),
('rami_zein', 'rami.zein@yahoo.com', 'hashed_rami159', 'citizen', '2025-10-23 10:00:00'),
('maya_antoun', 'maya.antoun@gmail.com', 'hashed_maya753', 'citizen', '2025-10-23 10:15:00'),
('youssef_halabi', 'youssef.halabi@hotmail.com', 'hashed_youssef246', 'citizen', '2025-10-23 10:30:00'),
('hala_yacoub', 'hala.yacoub@outlook.com', 'hashed_hala864', 'citizen', '2025-10-23 11:00:00'),
('georges_matar', 'georges.matar@gmail.com', 'hashed_georges135', 'citizen', '2025-10-23 11:15:00'),
('diana_malek', 'diana.malek@yahoo.com', 'hashed_diana579', 'citizen', '2025-10-23 11:30:00'),
('samir_rahme', 'samir.rahme@hotmail.com', 'hashed_samir246', 'citizen', '2025-10-23 12:00:00'),
('rita_ghannam', 'rita.ghannam@outlook.com', 'hashed_rita680', 'citizen', '2025-10-23 12:15:00'),
('antoine_sleiman', 'antoine.sleiman@gmail.com', 'hashed_antoine791', 'citizen', '2025-10-23 12:30:00'),
('nadia_ashkar', 'nadia.ashkar@yahoo.com', 'hashed_nadia802', 'citizen', '2025-10-23 13:00:00'),
('jad_aboud', 'jad.aboud@hotmail.com', 'hashed_jad913', 'citizen', '2025-10-23 13:15:00'),
('mira_tannous', 'mira.tannous@outlook.com', 'hashed_mira024', 'citizen', '2025-10-23 13:30:00'),
('tony_geagea', 'tony.geagea@gmail.com', 'hashed_tony135', 'citizen', '2025-10-23 14:00:00'),
('sarah_mouawad', 'sarah.mouawad@yahoo.com', 'hashed_sarah246', 'citizen', '2025-10-23 14:15:00'),
('fadi_ayoub', 'fadi.ayoub@hotmail.com', 'hashed_fadi357', 'citizen', '2025-10-23 14:30:00'),
('carine_saade', 'carine.saade@outlook.com', 'hashed_carine468', 'citizen', '2025-10-23 15:00:00'),
('marc_dagher', 'marc.dagher@gmail.com', 'hashed_marc579', 'citizen', '2025-10-23 15:15:00'),
('nancy_rizk', 'nancy.rizk@yahoo.com', 'hashed_nancy680', 'citizen', '2025-10-23 15:30:00'),
('pierre_makhlouf', 'pierre.makhlouf@hotmail.com', 'hashed_pierre791', 'citizen', '2025-10-23 16:00:00'),
('claudia_chaaya', 'claudia.chaaya@outlook.com', 'hashed_claudia802', 'citizen', '2025-10-23 16:15:00'),
('joseph_moussa', 'joseph.moussa@gmail.com', 'hashed_joseph913', 'citizen', '2025-10-23 16:30:00'),
('lara_hanna', 'lara.hanna@yahoo.com', 'hashed_lara024', 'citizen', '2025-10-23 17:00:00'),
('ralph_najjar', 'ralph.najjar@hotmail.com', 'hashed_ralph135', 'citizen', '2025-10-23 17:15:00'),
('tania_ismail', 'tania.ismail@outlook.com', 'hashed_tania246', 'citizen', '2025-10-23 17:30:00');

-- Insert sample documents that match your actual data
INSERT INTO document (user_id, type_id, status, request_date, issue_date, notes) VALUES
(2, 1, 'pending', '2025-10-22 23:50:33', NULL, 'Newborn registration for Jadaloun family'),
(3, 2, 'approved', '2025-10-07 23:50:33', '2025-10-15 23:50:33', 'Family record updated successfully'),
(3, 3, 'rejected', '2025-10-17 23:50:33', NULL, 'Proof of address missing'),
(4, 4, 'pending', '2025-10-20 23:50:33', NULL, 'Building permit request for Saad residence'),
(8, 1, 'in_progress', '2025-10-23 08:45:00', NULL, 'Birth certificate for newborn child'),
(9, 2, 'pending', '2025-10-23 09:20:00', NULL, 'Update family record after marriage'),
(10, 3, 'approved', '2025-10-23 10:00:00', '2025-10-23 14:00:00', 'Residency for university application'),
(11, 4, 'in_progress', '2025-10-23 11:30:00', NULL, 'New house construction permit'),
(12, 1, 'pending', '2025-10-23 12:15:00', NULL, 'Birth certificate for passport renewal'),
(13, 2, 'approved', '2025-10-23 13:45:00', '2025-10-23 16:30:00', 'Family record for visa application');