CREATE TABLE Account (
    AccountID INT,
    Address VARCHAR(80),
    Email VARCHAR(30),
    PhoneNumber VARCHAR(14),
    PRIMARY KEY (AccountID)
);

CREATE TABLE PaymentMethod (
    Card_Number INT,
    Cardholder_Name VARCHAR(50),
    Email VARCHAR(50),
    FK_AccountID INT,
    PaymentID INT,
    PRIMARY KEY (PaymentID),
    FOREIGN KEY (FK_AccountID)
        REFERENCES Account (AccountID)
);
    
CREATE TABLE ShoppingCart (
    AccountID INT,
    AmountOfItems INT,
    OrderID INT,
    TotalAmount DECIMAL,
    PRIMARY KEY (OrderID)
);
    
CREATE TABLE Supplier (
    ContactEmail VARCHAR(30),
    SupplierID INT,
    SupplierName VARCHAR(30),
    PRIMARY KEY (SupplierID)
);

CREATE TABLE Product (
    `Condition` VARCHAR(30), -- KEYWORD
    `Description` VARCHAR(200), -- KEYWORD
    FK_OrderID INT,
    FK_SupplierID INT,
    ProductID INT,
    ProductName VARCHAR(80),
    Price DECIMAL,
    Quantity INT,
    PRIMARY KEY (ProductID),
    FOREIGN KEY (FK_OrderID)
        REFERENCES ShoppingCart (OrderID),
    FOREIGN KEY (FK_SupplierID)
        REFERENCES Supplier (SupplierID)
);
    
CREATE TABLE Category (
    CategoryID INT,
    CategoryName VARCHAR(80),
    CategoryDescription VARCHAR(200),
    PRIMARY KEY (CategoryID)
);

CREATE TABLE ACCOUNT_ADDRESS (
    AccountAddress VARCHAR(80),
    FK_Account_ID INT,
    PRIMARY KEY (AccountAddress , FK_Account_ID),
    FOREIGN KEY (FK_Account_ID)
        REFERENCES Account (AccountID)
);

CREATE TABLE CATEGORIZES (
    FK_CategoryID INT,
    FK_ProductID INT,
    PRIMARY KEY (FK_CategoryID , FK_ProductID),
    FOREIGN KEY (FK_CategoryID)
        REFERENCES Category (CategoryID),
    FOREIGN KEY (FK_ProductID)
        REFERENCES Product (ProductID)
);

CREATE TABLE Customer (
    AccountID INT,
    NumProductsBought INT,
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID)
        REFERENCES Account (AccountID)
);

CREATE TABLE Customer_Business (
    AccountID INT,
    BusinessName VARCHAR(50),
    ContactPerson VARCHAR(30),
    TaxID INT,
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID)
        REFERENCES Account (AccountID)
);

CREATE TABLE Customer_Person (
    AccountID INT,
    DateOfBirth VARCHAR(10),
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID)
        REFERENCES Account (AccountID)
);

CREATE TABLE Debit_Credit (
    CardNumber INT,
    CardholderName VARCHAR(30),
    CVV INT,
    ExpirationDate VARCHAR(4),
    FK_Payment_ID INT,
    PRIMARY KEY (FK_Payment_ID),
    FOREIGN KEY (FK_Payment_ID)
        REFERENCES PaymentMethod (PaymentID)
);

CREATE TABLE Discounts (
    DiscountCode VARCHAR(12),
    FK_ProductID INT,
    PRIMARY KEY (FK_ProductID),
    FOREIGN KEY (FK_ProductID)
        REFERENCES ShoppingCart (OrderID)
);

CREATE TABLE Orders (
    OrderDate VARCHAR(10),
    FK_OrderID INT,
    OrderStatus VARCHAR(50),
    PRIMARY KEY (FK_OrderID),
    FOREIGN KEY (FK_OrderID)
        REFERENCES ShoppingCart (OrderID)
);

CREATE TABLE Review (
    FK_ProductID INT,
    ReviewID INT,
    ReviewStar DECIMAL,
    PRIMARY KEY (ReviewID),
    FOREIGN KEY (FK_ProductID)
        REFERENCES Product (ProductID)
);

CREATE TABLE Seller (
    AccountID INT,
    NumProductsSold INT,
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID)
        REFERENCES Account (AccountID)
);

CREATE TABLE Seller_Business (
    AccountID INT,
    BusinessName VARCHAR(50),
    ContactPerson VARCHAR(30),
    TaxID INT,
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID)
        REFERENCES Account (AccountID)
);

CREATE TABLE Seller_Person (
    AccountID INT,
    DateOfBirth VARCHAR(10),
    FirstName VARCHAR(15),
    LastName VARCHAR(15),
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID)
        REFERENCES Account (AccountID)
);

CREATE TABLE ThirdParty (
    FK_PaymentID INT,
    Password VARCHAR(30),
    PRIMARY KEY (FK_PaymentID),
    FOREIGN KEY (FK_PaymentID)
        REFERENCES PaymentMethod (PaymentID)
);

CREATE TABLE WireTransfer (
    AccountNumber INT,
    FK_PaymentID INT,
    PRIMARY KEY (FK_PaymentID),
    FOREIGN KEY (FK_PaymentID)
        REFERENCES PaymentMethod (PaymentID)
);
