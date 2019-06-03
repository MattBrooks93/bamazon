CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT(100) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT (100) NOT NULL,
  PRIMARY KEY (item_id)
);

Select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Xbox One", "Electronics", 249.99, 500),
("Playstation 4", "Electronics", 249.99, 500),
("Nintendo Switch", "Electronics", 199.99, 500),
("Toaster", "Home and Kitchen", 29.99, 150),
("Blender", "Home and Kitchen", 49.99, 100),
("Pillow", "Home and Kitchen", 24.99, 100),
("Welcome Mat", "Home and Kitchen", 15.99, 50),
("Lawn Mower", "Lawn and Garden", 219.99, 30),
("Weed Wacker", "Lawn and Garden", 79.99, 45),
("Gardening Gloves", "Lawn and Garden", 12.99, 20),
("Face Wash", "Beauty Care", 8.99, 80),
("Lip Stick", "Beauty Care", 7.99, 65),
("Mascera", "Beauty Care", 7.49, 55);