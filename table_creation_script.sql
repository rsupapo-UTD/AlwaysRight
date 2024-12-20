CREATE TABLE Account (
    AccountID INT NOT NULL,
    Address VARCHAR(80),
    Email VARCHAR(50),
    PhoneNumber VARCHAR(14),
    PRIMARY KEY (AccountID) 
);

CREATE TABLE PaymentMethod (
    FK_AccountID INT NOT NULL,
    PaymentID INT NOT NULL,
    PRIMARY KEY (PaymentID),
    FOREIGN KEY (FK_AccountID)
        REFERENCES Account (AccountID)
);
    
CREATE TABLE ShoppingCart (
    AccountID INT,
    AmountOfItems INT,
    OrderID INT NOT NULL,
    TotalAmount DECIMAL(30,2),
    PRIMARY KEY (OrderID),
    FOREIGN KEY (AccountID)
        REFERENCES Account (AccountID)
);
    
CREATE TABLE Supplier (
    ContactEmail VARCHAR(50),
    SupplierID INT NOT NULL,
    SupplierName VARCHAR(30),
    PRIMARY KEY (SupplierID)
);

CREATE TABLE Product (
    `Condition` VARCHAR(30), -- KEYWORD
    `Description` VARCHAR(200), -- KEYWORD
    FK_SupplierID INT NOT NULL,
    ProductID INT NOT NULL,
    ProductName VARCHAR(80),
    Price DECIMAL(30,2),
    Quantity INT,
    PRIMARY KEY (ProductID),
    FOREIGN KEY (FK_SupplierID)
        REFERENCES Supplier (SupplierID)
);
    
CREATE TABLE Category (
    CategoryID INT NOT NULL,
    CategoryName VARCHAR(80),
    CategoryDescription VARCHAR(200),
    PRIMARY KEY (CategoryID)
);

CREATE TABLE ACCOUNT_ADDRESS (
    AccountAddress VARCHAR(80),
    FK_Account_ID INT NOT NULL,
    PRIMARY KEY (AccountAddress , FK_Account_ID),
    FOREIGN KEY (FK_Account_ID)
        REFERENCES Account (AccountID)
);

CREATE TABLE CATEGORIZES (
    FK_CategoryID INT NOT NULL,
    FK_ProductID INT NOT NULL,
    PRIMARY KEY (FK_CategoryID , FK_ProductID),
    FOREIGN KEY (FK_CategoryID)
        REFERENCES Category (CategoryID),
    FOREIGN KEY (FK_ProductID)
        REFERENCES Product (ProductID)
);

CREATE TABLE Customer (
    AccountID INT NOT NULL,
    NumProductsBought INT,
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID)
        REFERENCES Account (AccountID)
);

CREATE TABLE Customer_Business (
    AccountID INT NOT NULL,
    BusinessName VARCHAR(50),
    ContactPerson VARCHAR(30),
    TaxID VARCHAR(20),
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID)
        REFERENCES Account (AccountID)
);

CREATE TABLE Customer_Person (
    AccountID INT NOT NULL,
    DateOfBirth DATE,
    FirstName VARCHAR(15),
    LastName VARCHAR(15),
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID)
        REFERENCES Account (AccountID)
);

CREATE TABLE Debit_Credit (
    CardNumber BIGINT,
    CardholderName VARCHAR(30),
    CVV INT,
    ExpirationDate DATE,
    FK_Payment_ID INT NOT NULL,
    PRIMARY KEY (FK_Payment_ID),
    FOREIGN KEY (FK_Payment_ID)
        REFERENCES PaymentMethod (PaymentID)
);

CREATE TABLE Discounts (
    DiscountCode VARCHAR(40),
    FK_ProductID INT NOT NULL,
    PRIMARY KEY (FK_ProductID),
    FOREIGN KEY (FK_ProductID)
        REFERENCES Product (ProductID)
);

CREATE TABLE Orders (
    FK_OrderID INT NOT NULL,
    OrderDate DATE,
    OrderStatus VARCHAR(50),
    PRIMARY KEY (FK_OrderID),
    FOREIGN KEY (FK_OrderID)
        REFERENCES ShoppingCart (OrderID)
);

CREATE TABLE Review (
    ReviewID INT NOT NULL,
    FK_ProductID INT NOT NULL,
    ReviewStar DECIMAL,
    PRIMARY KEY (ReviewID),
    FOREIGN KEY (FK_ProductID)
        REFERENCES Product (ProductID)
);

CREATE TABLE Seller (
    AccountID INT NOT NULL,
    NumProductsSold INT,
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID)
        REFERENCES Account (AccountID)
);

CREATE TABLE Seller_Business (
    AccountID INT NOT NULL,
    BusinessName VARCHAR(50),
    ContactPerson VARCHAR(30),
    TaxID VARCHAR(20),
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID)
        REFERENCES Account (AccountID)
);

CREATE TABLE Seller_Person (
    AccountID INT NOT NULL,
    DateOfBirth DATE,
    FirstName VARCHAR(15),
    LastName VARCHAR(15),
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID)
        REFERENCES Account (AccountID)
);

CREATE TABLE ThirdParty (
    FK_PaymentID INT NOT NULL,
    Password VARCHAR(30),
    Username VARCHAR(30),
    PRIMARY KEY (FK_PaymentID),
    FOREIGN KEY (FK_PaymentID)
        REFERENCES PaymentMethod (PaymentID)
);

CREATE TABLE WireTransfer (
    AccountNumber BIGINT,
    RoutingNumber INT,
    FK_PaymentID INT NOT NULL,
    PRIMARY KEY (FK_PaymentID),
    FOREIGN KEY (FK_PaymentID)
        REFERENCES PaymentMethod (PaymentID)
);
