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

 Date: 09/01/2022 00:29:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `catID` int(11) NOT NULL AUTO_INCREMENT,
  `catName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`catID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for currentauction
-- ----------------------------
DROP TABLE IF EXISTS `currentauction`;
CREATE TABLE `currentauction` (
  `UID` int(11) NOT NULL,
  `proID` int(11) NOT NULL,
  `isDone` bit(1) DEFAULT b'0',
  `maxPrice` decimal(15,2) DEFAULT NULL,
  `stepPrice` int(11) DEFAULT NULL,
  `isBlock` bit(1) DEFAULT b'0',
  PRIMARY KEY (`UID`,`proID`) USING BTREE,
  KEY `fk_currentAuction_product` (`proID`) USING BTREE,
  CONSTRAINT `fk_currentAuction_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`),
  CONSTRAINT `fk_currentAuction_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for description
-- ----------------------------
DROP TABLE IF EXISTS `description`;
CREATE TABLE `description` (
  `proID` int(11) NOT NULL,
  `dateDes` datetime NOT NULL,
  `description` longtext,
  PRIMARY KEY (`proID`,`dateDes`) USING BTREE,
  CONSTRAINT `fk_description_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for historyauc
-- ----------------------------
DROP TABLE IF EXISTS `historyauc`;
CREATE TABLE `historyauc` (
  `aucTime` datetime NOT NULL,
  `UID` int(11) NOT NULL,
  `proID` int(11) NOT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`aucTime`,`UID`,`proID`) USING BTREE,
  KEY `fk_historyAuc_users` (`UID`) USING BTREE,
  KEY `fk_historyAuc_product` (`proID`) USING BTREE,
  CONSTRAINT `fk_historyAuc_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`),
  CONSTRAINT `fk_historyAuc_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `proID` int(11) NOT NULL AUTO_INCREMENT,
  `typID` int(11) DEFAULT NULL,
  `proName` varchar(150) DEFAULT NULL,
  `ownerUID` int(11) DEFAULT NULL,
  `startPrice` decimal(15,2) DEFAULT NULL,
  `buyNow` decimal(15,2) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `autoExtend` bit(1) DEFAULT b'1',
  `stepPrice` decimal(15,2) DEFAULT NULL,
  `allowBadBidde` bit(1) DEFAULT b'1',
  `allowNewBiddle` bit(1) DEFAULT b'1',
  `BidCount` int(255) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`proID`) USING BTREE,
  KEY `fk_product_type` (`typID`) USING BTREE,
  CONSTRAINT `fk_product_type` FOREIGN KEY (`typID`) REFERENCES `type` (`typID`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for rating
-- ----------------------------
DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
  `UIDRater` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `proID` int(11) NOT NULL,
  `content` longtext,
  `Type` int(11) DEFAULT NULL,
  PRIMARY KEY (`UIDRater`,`UID`,`proID`) USING BTREE,
  KEY `fk_rating_users` (`UID`) USING BTREE,
  KEY `fk_rating_product` (`proID`) USING BTREE,
  CONSTRAINT `fk_rating_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`),
  CONSTRAINT `fk_rating_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `typID` int(11) NOT NULL AUTO_INCREMENT,
  `catID` int(11) DEFAULT NULL,
  `typName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`typID`) USING BTREE,
  KEY `fk_type_category` (`catID`) USING BTREE,
  CONSTRAINT `fk_type_category` FOREIGN KEY (`catID`) REFERENCES `category` (`catID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for upseller
-- ----------------------------
DROP TABLE IF EXISTS `upseller`;
CREATE TABLE `upseller` (
  `UID` int(11) NOT NULL,
  `isAcpt` bit(1) DEFAULT b'0',
  `askDate` datetime NOT NULL,
  PRIMARY KEY (`UID`) USING BTREE,
  CONSTRAINT `fk_upSeller_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

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
  PRIMARY KEY (`UID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for watchlist
-- ----------------------------
DROP TABLE IF EXISTS `watchlist`;
CREATE TABLE `watchlist` (
  `UID` int(11) NOT NULL,
  `proID` int(11) NOT NULL,
  PRIMARY KEY (`UID`,`proID`) USING BTREE,
  CONSTRAINT `fk_watchList_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for winauction
-- ----------------------------
DROP TABLE IF EXISTS `winauction`;
CREATE TABLE `winauction` (
  `proID` int(11) NOT NULL,
  `UID` int(11) DEFAULT NULL,
  `winPrice` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`proID`) USING BTREE,
  CONSTRAINT `fk_winAuction_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
