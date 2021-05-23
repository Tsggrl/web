SET time_zone = "+00:00";
SET character_set_server = utf8mb4;

--
-- creation of database `db_products`
CREATE DATABASE IF NOT EXISTS db_products;

--
-- Database: `nodejs`
--

-- --------------------------------------------------------

--
-- Stable structure `db_products`
--

CREATE TABLE IF NOT EXISTS products (
    `id` INT AUTO_INCREMENT NOT NULL, 
    `name` VARCHAR(255),
    `price` FLOAT, 
    `rating` FLOAT,
    PRIMARY KEY (`id`)
);

--
-- Dumping data for table`db_products`
--

INSERT INTO `products` 
(`id`, `name`, `price`, `rating`) VALUES 
(1, 'Uncharted 4', 50, 5),
(2, 'Heavy Rain', 35, 5), 
(3, 'Batman: arkham knight', 50, 4.5), 
(4, 'God Of War', 120, 5);
