/*
 Navicat Premium Data Transfer

 Source Server         : MySQL_Web
 Source Server Type    : MySQL
 Source Server Version : 50734
 Source Host           : localhost:8889
 Source Schema         : auction_online_db

 Target Server Type    : MySQL
 Target Server Version : 50734
 File Encoding         : 65001

 Date: 16/12/2021 21:30:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Bidderpro
-- ----------------------------
DROP TABLE IF EXISTS `Bidderpro`;
CREATE TABLE `Bidderpro` (
  `proID` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `isAcpt` bit(1) DEFAULT b'1',
  PRIMARY KEY (`proID`,`UID`),
  KEY `fk_BidderPro_users` (`UID`),
  CONSTRAINT `fk_BidderPro_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`),
  CONSTRAINT `fk_BidderPro_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Bidderpro
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for WaittingBid
-- ----------------------------
DROP TABLE IF EXISTS `WaittingBid`;
CREATE TABLE `WaittingBid` (
  `proID` int(11) DEFAULT NULL,
  `UID` int(11) DEFAULT NULL,
  `isAcpt` bit(1) DEFAULT b'0',
  KEY `fk_newBidderPro_users` (`UID`),
  KEY `fk_newBidderPro_product` (`proID`),
  CONSTRAINT `fk_newBidderPro_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`),
  CONSTRAINT `fk_newBidderPro_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of WaittingBid
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `catID` int(11) NOT NULL AUTO_INCREMENT,
  `catName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`catID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES (1, 'Nhà cửa, đời sống');
INSERT INTO `category` VALUES (2, 'Điện tử - Điện lạnh');
INSERT INTO `category` VALUES (3, 'Thời trang');
COMMIT;

-- ----------------------------
-- Table structure for currentAuction
-- ----------------------------
DROP TABLE IF EXISTS `currentAuction`;
CREATE TABLE `currentAuction` (
  `UID` int(11) NOT NULL,
  `proID` int(11) NOT NULL,
  `isDone` bit(1) DEFAULT b'0',
  `maxPrice` decimal(15,2) DEFAULT NULL,
  `stepPrice` int(11) DEFAULT NULL,
  PRIMARY KEY (`UID`,`proID`),
  KEY `fk_currentAuction_product` (`proID`),
  CONSTRAINT `fk_currentAuction_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`),
  CONSTRAINT `fk_currentAuction_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of currentAuction
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for description
-- ----------------------------
DROP TABLE IF EXISTS `description`;
CREATE TABLE `description` (
  `proID` int(11) NOT NULL,
  `dateDes` datetime NOT NULL,
  `description` longtext,
  PRIMARY KEY (`proID`,`dateDes`),
  CONSTRAINT `fk_description_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of description
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for historyAuc
-- ----------------------------
DROP TABLE IF EXISTS `historyAuc`;
CREATE TABLE `historyAuc` (
  `aucTime` datetime NOT NULL,
  `UID` int(11) NOT NULL,
  `proID` int(11) NOT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`aucTime`,`UID`,`proID`),
  KEY `fk_historyAuc_users` (`UID`),
  KEY `fk_historyAuc_product` (`proID`),
  CONSTRAINT `fk_historyAuc_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`),
  CONSTRAINT `fk_historyAuc_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of historyAuc
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `proID` int(11) NOT NULL AUTO_INCREMENT,
  `typID` int(11) DEFAULT NULL,
  `proName` varchar(150) DEFAULT NULL,
  `ownerUID` int(11) DEFAULT NULL,
  `curPrice` decimal(15,2) DEFAULT NULL,
  `buyNow` decimal(15,2) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `autoExtend` bit(1) DEFAULT b'1',
  PRIMARY KEY (`proID`),
  KEY `fk_product_type` (`typID`),
  CONSTRAINT `fk_product_type` FOREIGN KEY (`typID`) REFERENCES `type` (`typID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for rating
-- ----------------------------
DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
  `UIDRater` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `proID` int(11) NOT NULL,
  `content` longtext,
  PRIMARY KEY (`UIDRater`,`UID`,`proID`),
  KEY `fk_rating_users` (`UID`),
  KEY `fk_rating_product` (`proID`),
  CONSTRAINT `fk_rating_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`),
  CONSTRAINT `fk_rating_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rating
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `typID` int(11) NOT NULL AUTO_INCREMENT,
  `catID` int(11) DEFAULT NULL,
  `typName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`typID`),
  KEY `fk_type_category` (`catID`),
  CONSTRAINT `fk_type_category` FOREIGN KEY (`catID`) REFERENCES `category` (`catID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of type
-- ----------------------------
BEGIN;
INSERT INTO `type` VALUES (1, 2, 'Máy Giặt');
INSERT INTO `type` VALUES (2, 3, 'Thời trang nam');
COMMIT;

-- ----------------------------
-- Table structure for upSeller
-- ----------------------------
DROP TABLE IF EXISTS `upSeller`;
CREATE TABLE `upSeller` (
  `UID` int(11) NOT NULL,
  `isAcpt` bit(1) DEFAULT b'0',
  PRIMARY KEY (`UID`),
  CONSTRAINT `fk_upSeller_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of upSeller
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `UID` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` char(60) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `addr` varchar(200) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `good` int(11) DEFAULT NULL,
  `dislike` int(11) DEFAULT NULL,
  PRIMARY KEY (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for watchList
-- ----------------------------
DROP TABLE IF EXISTS `watchList`;
CREATE TABLE `watchList` (
  `UID` int(11) NOT NULL,
  `proID` int(11) NOT NULL,
  PRIMARY KEY (`UID`,`proID`),
  CONSTRAINT `fk_watchList_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of watchList
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for winAuction
-- ----------------------------
DROP TABLE IF EXISTS `winAuction`;
CREATE TABLE `winAuction` (
  `proID` int(11) NOT NULL,
  `UID` int(11) DEFAULT NULL,
  `winPrice` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`proID`),
  CONSTRAINT `fk_winAuction_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of winAuction
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
