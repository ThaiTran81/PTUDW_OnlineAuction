DROP TABLE IF EXISTS
    `category`;
CREATE TABLE category(
                         catID INT NOT NULL AUTO_INCREMENT,
                         catName VARCHAR(50) CHARACTER SET utf8,
                         PRIMARY KEY(catID)
);

DROP TABLE IF EXISTS
    `TYPE`;
CREATE TABLE TYPE(
                     typID INT NOT NULL AUTO_INCREMENT,
                     catID INT,
                     typName VARCHAR(50) CHARACTER SET utf8,
                     PRIMARY KEY(typID)
);

DROP TABLE IF EXISTS
    `PRODUCT`;
CREATE TABLE product(
                        proID int NOT null AUTO_INCREMENT,
                        typID int,
                        proName varchar(150) CHARACTER set utf8,
                        ownerUID int,
                        curPrice decimal(15, 2),
                        buyNow decimal(15, 2),
                        startDate datetime,
                        endDate datetime,
                        autoExtend bit DEFAULT 1,
                        PRIMARY KEY(proID)
);
DROP TABLE IF EXISTS
    `USERS`;
CREATE table users(
                      UID int not null AUTO_INCREMENT,
                      email varchar(255),
                      password char(60),
                      name varchar(150) CHARACTER set utf8,
                      addr varchar(200) CHARACTER set utf8,
                      dob date,
                      type int,
                      good int,
                      dislike int,
                      PRIMARY KEY(UID)
);
DROP TABLE IF EXISTS
    `UPSELLER`;
CREATE TABLE upSeller(
                         UID int,
                         isAcpt bit DEFAULT false,
                         PRIMARY key( UID)
);
DROP TABLE IF EXISTS
    `WATCHLIST`;
CREATE TABLE watchList(
                          UID int,
                          proID int,
                          PRIMARY key(UID, proID)
);
DROP TABLE IF EXISTS
    `HISTORYAUC`;
CREATE TABLE historyAuc(
                           aucTime datetime,
                           UID int,
                           proID int,
                           price decimal(15,2)
);
DROP TABLE IF EXISTS
    `BIDDERPRO`;
CREATE TABLE bidderPro(
                          proID int,
                          UID int,
                          isAcpt bit DEFAULT 1,
                          PRIMARY KEY(proID, uid)
);
DROP TABLE IF EXISTS
    `newBidderPro`;
CREATE TABLE newBidderPro(
                             proID int,
                             UID int,
                             isAcpt bit DEFAULT 0
);
DROP TABLE IF EXISTS
    `RATING`;
CREATE TABLE rating(
                       UIDRater int,
                       UID int,
                       proID int,
                       content longtext,
                       PRIMARY KEY(UIDRater, UID, proID)
);
DROP TABLE IF EXISTS
    `CURRENTAUCTION`;
CREATE TABLE currentAuction(
                               UID int,
                               proID int,
                               isDone bit DEFAULT 0,
                               maxPrice decimal(15, 2),
                               stepPrice int,
                               PRIMARY KEY(UID, proID)
);
DROP TABLE IF EXISTS
    `WINAUCTION`;
CREATE TABLE winAuction(
                           proID int,
                           UID int,
                           winPrice decimal(15,2),
                           PRIMARY KEY(proID)
);
DROP TABLE IF EXISTS
    `DESCRIPTION`;
CREATE TABLE description(
                            proID int,
                            dateDes datetime,
                            description longtext,
                            PRIMARY KEY (proID, dateDes)
);

ALTER TABLE type
    add CONSTRAINT fk_type_category
        FOREIGN KEY (catID) REFERENCES category(catID);

alter TABLE product
    add CONSTRAINT fk_product_type
        FOREIGN key (typID) REFERENCES type(typID);

alter table description
    add CONSTRAINT fk_description_product
        FOREIGN key (proID) REFERENCES product(proID);

alter table watchList
    add CONSTRAINT fk_watchList_users
        FOREIGN key (UID) REFERENCES users(UID);

alter table upSeller
    add CONSTRAINT fk_upSeller_users
        FOREIGN key (UID) REFERENCES users(UID);

alter table winAuction
    add CONSTRAINT fk_winAuction_product
        FOREIGN KEY (proID) REFERENCES product(proID);

alter TABLE historyAuc
    add CONSTRAINT fk_historyAuc_users
        FOREIGN KEY (UID) REFERENCES users(UID);

alter TABLE historyAuc
    add CONSTRAINT fk_historyAuc_product
        FOREIGN KEY (proID) REFERENCES product(proID);

alter TABLE newBidderPro
    add CONSTRAINT fk_newBidderPro_users
        FOREIGN KEY (UID) REFERENCES users(UID);

alter TABLE newBidderpro
    add CONSTRAINT fk_newBidderPro_product
        FOREIGN KEY (proID) REFERENCES product(proID);

alter TABLE BidderPro
    add CONSTRAINT fk_BidderPro_users
        FOREIGN KEY (UID) REFERENCES users(UID);

alter TABLE Bidderpro
    add CONSTRAINT fk_BidderPro_product
        FOREIGN KEY (proID) REFERENCES product(proID);

alter TABLE rating
    add CONSTRAINT fk_rating_users
        FOREIGN KEY (UID) REFERENCES users(UID);

alter TABLE rating
    add CONSTRAINT fk_rating_product
        FOREIGN KEY (proID) REFERENCES product(proID);

alter TABLE currentAuction
    add CONSTRAINT fk_currentAuction_users
        FOREIGN KEY (UID) REFERENCES users(UID);

alter TABLE currentAuction
    add CONSTRAINT fk_currentAuction_product
        FOREIGN KEY (proID) REFERENCES product(proID);
