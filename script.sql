
CREATE TABLE Account (
    AccountID INT,
    Address VARCHAR(80),
    Email VARCHAR(30),
    PhoneNumber VARCHAR(14),
    PRIMARY KEY (AccountID)
);

CREATE TABLE Payment_Method (
    Card_Number INT,
    Cardholder_Name VARCHAR(50),
    Email VARCHAR(50),
    FK_AccountID int,
    PaymentID int,
    PRIMARY KEY (PaymentID),
    foreign key (FK_AccountID) references Account (AccountID)
);
    
    CREATE TABLE ShoppingCart (
    AccountID int,
    AmountOfItems int,
    OrderID int,
    TotalAmount decimal,
    PRIMARY KEY (OrderID)
);
    
   CREATE TABLE Supplier (
    ContactEmail varchar(30),
    SupplierID int,
    SupplierName varchar(30),
    PRIMARY KEY (SupplierID)
); 

    
CREATE TABLE Product (
	`Condition` VARCHAR(30),
    Description Varchar(200),
    FK_OrderID INT,
    FK_SupplierID int,
    ProductID int,
    ProductName VarChar(80),
    Price decimal,
    Quantity int,
    PRIMARY KEY (ProductID),
    FOREIGN KEY (FK_OrderID) REFERENCES ShoppingCart (OrderID),
    FOREIGN KEY (FK_SupplierID) REFERENCES Supplier (SupplierID)
);
    
CREATE TABLE Category (
    CategoryID INT,
    CategoryName varchar(80),
    CategoryDescription varchar(200),
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
    FK_CategoryID int,
    FK_ProductID int,
    PRIMARY KEY (FK_CategoryID, FK_ProductID),
    foreign key (FK_CategoryID) references Category(CategoryID),
    foreign key (FK_ProductID) references Product(ProductID)
);

CREATE TABLE Customer (
    AccountID int,
    NumProductsBought int,
    PRIMARY KEY (AccountID),
    FOREIGN KEY (AccountID) references Account(AccountID)
);

CREATE TABLE Customer_Business (
    AccountID int,
    BusinessName varchar(50),
    ContactPerson varchar(30),
    TaxID int,
    primary key (AccountID),
    foreign key (AccountID) references Account(AccountID)
);

CREATE TABLE Customer_Person (
    AccountID int,
    DateOfBirth VarChar(10),
    PRIMARY KEY (AccountID), 
    FOREIGN KEY (FK_Account_ID) REFERENCES Account (AccountID)
);

CREATE TABLE Debit_Credit (
    CardNumber int,
    CardholderName VARCHAR(30),
    CVV int,
    ExpirationDate VarChar(4),
    FK_Payment_ID int,
    PRIMARY KEY (FK_Payment_ID),
    foreign key (FK_Payment_ID) references PaymentMethod (Payment_ID)
);

CREATE TABLE Discounts (
    DiscountCode varchar(12),
    FK_ProductID int,
    PRIMARY KEY (FK_ProductID),
    foreign key (FK_ProductID) references ShoppingCart(OrderID)
);

CREATE TABLE `Order` (
    OrderDate varchar(10),
    Address VARCHAR(80),
    Email VARCHAR(30),
    PhoneNumber VARCHAR(14),
    PRIMARY KEY (AccountID)
);

CREATE TABLE Review (
    FK_ProductID INT,
    ReviewID int,
    ReviewStar decimal,
    PRIMARY KEY (ReviewID),
    foreign key (FK_ProductID) references Product (ProductID)
);

CREATE TABLE Review (
    FK_ProductID INT,
    ReviewID int,
    ReviewStar decimal,
    PRIMARY KEY (ReviewID),
    foreign key (FK_ProductID) references Product(ProductID)
);

CREATE TABLE Seller (
	AccountID int,
    NumProductsSold int,
    Primary key (AccountID),
    Foreign key (AccountID) references Account (AccountID)
    );

