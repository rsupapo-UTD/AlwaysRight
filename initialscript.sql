
CREATE TABLE Account (
    AccountID INT,
    Address VARCHAR(80),
    Email VARCHAR(30),
    PhoneNumber VARCHAR(14),
    PRIMARY KEY (AccountID)
);
    
CREATE TABLE ACCOUNT_ADDRESS (
    AccountAddress VARCHAR(80),
    FK_Account_ID INT,
    PRIMARY KEY (AccountAddress , FK_Account_ID),
    FOREIGN KEY (FK_Account_ID)
        REFERENCES Account (AccountID)
);

CREATE TABLE Category (
    CategoryID INT,
    CategoryName varchar(80),
    CategoryDescription varchar(200),
    PRIMARY KEY (CategoryID)
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

