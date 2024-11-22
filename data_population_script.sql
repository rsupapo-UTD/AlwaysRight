
-- Account (ID: 1-99k)
LOAD DATA LOCAL INFILE './Mock-Datasets/Account.csv' 
INTO TABLE Account
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Category (ID: 100k-199k)
LOAD DATA LOCAL INFILE './Mock-Datasets/Category.csv' 
INTO TABLE Category
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Supplier (ID: 500k-599k)
LOAD DATA LOCAL INFILE './Mock-Datasets/Supplier.csv' 
INTO TABLE Supplier
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- ShoppingCart (ID: 200k-299k)
LOAD DATA LOCAL INFILE './Mock-Datasets/ShoppingCart.csv' 
INTO TABLE ShoppingCart
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- PaymentMethod (ID: 600k-699k)
LOAD DATA LOCAL INFILE './Mock-Datasets/PaymentMethod.csv' 
INTO TABLE PaymentMethod
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Customer 
LOAD DATA LOCAL INFILE './Mock-Datasets/Customer.csv' 
INTO TABLE Customer
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Seller 
LOAD DATA LOCAL INFILE './Mock-Datasets/Seller.csv' 
INTO TABLE Seller
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


-- Product 
LOAD DATA LOCAL INFILE './Mock-Datasets/Product.csv' 
INTO TABLE Product
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Customer_Business 
LOAD DATA LOCAL INFILE './Mock-Datasets/Customer_Business.csv' 
INTO TABLE Customer_Business
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Customer_Person 
LOAD DATA LOCAL INFILE './Mock-Datasets/Customer_Person.csv' 
INTO TABLE Customer_Person
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Seller_Business
LOAD DATA LOCAL INFILE './Mock-Datasets/Seller_Business.csv' 
INTO TABLE Seller_Business
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- Seller_Person 
LOAD DATA LOCAL INFILE './Mock-Datasets/Seller_Person.csv' 
INTO TABLE Seller_Person
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


LOAD DATA LOCAL INFILE './Mock-Datasets/Review.csv' 
INTO TABLE Review
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


SELECT 'Account' as Table_Name, COUNT(*) as Count FROM Account
UNION ALL
SELECT 'Category', COUNT(*) FROM Category
UNION ALL
SELECT 'ShoppingCart', COUNT(*) FROM ShoppingCart
UNION ALL
SELECT 'Supplier', COUNT(*) FROM Supplier
UNION ALL
SELECT 'Product', COUNT(*) FROM Product
UNION ALL
SELECT 'PaymentMethod', COUNT(*) FROM PaymentMethod
UNION ALL
SELECT 'Customer', COUNT(*) FROM Customer
UNION ALL
SELECT 'Seller', COUNT(*) FROM Seller
UNION ALL
SELECT 'Review', COUNT(*) FROM Review
UNION ALL
SELECT 'Customer_Business', COUNT(*) FROM Customer_Business
UNION ALL
SELECT 'Customer_Person', COUNT(*) FROM Customer_Person
UNION ALL
SELECT 'Seller_Business', COUNT(*) FROM Seller_Business
UNION ALL
SELECT 'Seller_Person', COUNT(*) FROM Seller_Person;