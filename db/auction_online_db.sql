/*
 Navicat Premium Data Transfer

 Source Server         : conn
 Source Server Type    : MySQL
 Source Server Version : 100421
 Source Host           : localhost:3306
 Source Schema         : auction_online_db

 Target Server Type    : MySQL
 Target Server Version : 100421
 File Encoding         : 65001

 Date: 04/01/2022 21:59:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bidderpro
-- ----------------------------
DROP TABLE IF EXISTS `bidderpro`;
CREATE TABLE `bidderpro`  (
  `proID` int NOT NULL,
  `UID` int NOT NULL,
  `isAcpt` bit(1) NULL DEFAULT b'1',
  PRIMARY KEY (`proID`, `UID`) USING BTREE,
  INDEX `fk_BidderPro_users`(`UID` ASC) USING BTREE,
  CONSTRAINT `fk_BidderPro_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_BidderPro_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bidderpro
-- ----------------------------

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `catID` int NOT NULL AUTO_INCREMENT,
  `catName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`catID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'Điện tử - Điện lạnh');
INSERT INTO `category` VALUES (2, 'Nhà cửa, đời sống');
INSERT INTO `category` VALUES (3, 'Sách');

-- ----------------------------
-- Table structure for currentauction
-- ----------------------------
DROP TABLE IF EXISTS `currentauction`;
CREATE TABLE `currentauction`  (
  `UID` int NOT NULL,
  `proID` int NOT NULL,
  `isDone` bit(1) NULL DEFAULT b'0',
  `maxPrice` decimal(15, 2) NULL DEFAULT NULL,
  `stepPrice` int NULL DEFAULT NULL,
  PRIMARY KEY (`UID`, `proID`) USING BTREE,
  INDEX `fk_currentAuction_product`(`proID` ASC) USING BTREE,
  CONSTRAINT `fk_currentAuction_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_currentAuction_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of currentauction
-- ----------------------------

-- ----------------------------
-- Table structure for description
-- ----------------------------
DROP TABLE IF EXISTS `description`;
CREATE TABLE `description`  (
  `proID` int NOT NULL,
  `dateDes` datetime NOT NULL,
  `description` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`proID`, `dateDes`) USING BTREE,
  CONSTRAINT `fk_description_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of description
-- ----------------------------

-- ----------------------------
-- Table structure for historyauc
-- ----------------------------
DROP TABLE IF EXISTS `historyauc`;
CREATE TABLE `historyauc`  (
  `aucTime` datetime NOT NULL,
  `UID` int NOT NULL,
  `proID` int NOT NULL,
  `price` decimal(15, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`aucTime`, `UID`, `proID`) USING BTREE,
  INDEX `fk_historyAuc_users`(`UID` ASC) USING BTREE,
  INDEX `fk_historyAuc_product`(`proID` ASC) USING BTREE,
  CONSTRAINT `fk_historyAuc_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_historyAuc_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of historyauc
-- ----------------------------
INSERT INTO `historyauc` VALUES ('2021-01-05 06:20:18', 11, 32, 1533.73);
INSERT INTO `historyauc` VALUES ('2021-01-06 05:03:42', 6, 20, 2712.41);
INSERT INTO `historyauc` VALUES ('2021-01-07 13:38:09', 11, 18, 1980.51);
INSERT INTO `historyauc` VALUES ('2021-01-07 23:05:38', 12, 2, 3237.87);
INSERT INTO `historyauc` VALUES ('2021-01-08 12:10:00', 11, 21, 1538.29);
INSERT INTO `historyauc` VALUES ('2021-01-14 18:24:00', 12, 10, 3758.21);
INSERT INTO `historyauc` VALUES ('2021-01-15 06:39:28', 5, 32, 2340.35);
INSERT INTO `historyauc` VALUES ('2021-01-16 00:07:27', 9, 24, 2500.56);
INSERT INTO `historyauc` VALUES ('2021-01-22 16:45:52', 9, 1, 1200.00);
INSERT INTO `historyauc` VALUES ('2021-01-23 19:10:03', 7, 5, 1505.57);
INSERT INTO `historyauc` VALUES ('2021-01-24 13:12:42', 8, 19, 3143.28);
INSERT INTO `historyauc` VALUES ('2021-01-29 08:06:03', 5, 11, 2568.47);
INSERT INTO `historyauc` VALUES ('2021-01-31 18:07:20', 8, 30, 3648.28);
INSERT INTO `historyauc` VALUES ('2021-02-04 00:42:11', 5, 23, 3277.75);
INSERT INTO `historyauc` VALUES ('2021-02-05 06:28:29', 12, 26, 3936.15);
INSERT INTO `historyauc` VALUES ('2021-02-06 14:09:37', 7, 11, 2969.14);
INSERT INTO `historyauc` VALUES ('2021-02-09 10:00:25', 9, 14, 2555.39);
INSERT INTO `historyauc` VALUES ('2021-02-09 18:24:28', 8, 24, 3533.63);
INSERT INTO `historyauc` VALUES ('2021-02-09 21:47:53', 6, 25, 1598.00);
INSERT INTO `historyauc` VALUES ('2021-02-10 10:52:20', 11, 27, 1746.18);
INSERT INTO `historyauc` VALUES ('2021-02-16 14:37:16', 5, 5, 3176.46);
INSERT INTO `historyauc` VALUES ('2021-02-16 18:42:01', 10, 8, 2471.11);
INSERT INTO `historyauc` VALUES ('2021-02-20 02:55:15', 9, 16, 1939.94);
INSERT INTO `historyauc` VALUES ('2021-02-22 09:21:54', 9, 21, 2292.16);
INSERT INTO `historyauc` VALUES ('2021-02-23 11:10:30', 12, 1, 3294.41);
INSERT INTO `historyauc` VALUES ('2021-03-02 13:52:09', 10, 15, 3174.76);
INSERT INTO `historyauc` VALUES ('2021-03-08 08:25:07', 7, 23, 2450.94);
INSERT INTO `historyauc` VALUES ('2021-03-09 18:54:20', 7, 14, 3280.71);
INSERT INTO `historyauc` VALUES ('2021-03-11 20:47:12', 8, 16, 1853.41);
INSERT INTO `historyauc` VALUES ('2021-03-11 23:48:06', 11, 28, 2798.97);
INSERT INTO `historyauc` VALUES ('2021-03-14 02:30:37', 12, 12, 2778.87);
INSERT INTO `historyauc` VALUES ('2021-03-14 03:38:04', 7, 28, 3454.52);
INSERT INTO `historyauc` VALUES ('2021-03-15 10:24:26', 6, 2, 1700.70);
INSERT INTO `historyauc` VALUES ('2021-03-17 17:25:15', 10, 26, 2091.29);
INSERT INTO `historyauc` VALUES ('2021-03-18 02:52:00', 10, 10, 1666.82);
INSERT INTO `historyauc` VALUES ('2021-03-18 16:32:39', 12, 3, 2947.53);
INSERT INTO `historyauc` VALUES ('2021-03-19 11:33:32', 5, 18, 2517.89);
INSERT INTO `historyauc` VALUES ('2021-03-23 02:03:01', 9, 31, 1794.33);
INSERT INTO `historyauc` VALUES ('2021-03-27 01:48:37', 11, 6, 3280.53);
INSERT INTO `historyauc` VALUES ('2021-03-27 03:22:36', 11, 5, 3562.18);
INSERT INTO `historyauc` VALUES ('2021-03-28 16:16:13', 6, 15, 2052.11);
INSERT INTO `historyauc` VALUES ('2021-03-29 20:36:25', 10, 10, 3946.47);
INSERT INTO `historyauc` VALUES ('2021-03-30 22:27:50', 9, 12, 2459.00);
INSERT INTO `historyauc` VALUES ('2021-03-31 08:42:30', 6, 8, 2264.38);
INSERT INTO `historyauc` VALUES ('2021-04-02 14:41:23', 6, 23, 2600.69);
INSERT INTO `historyauc` VALUES ('2021-04-04 16:19:52', 8, 26, 2456.59);
INSERT INTO `historyauc` VALUES ('2021-04-07 17:36:15', 10, 15, 3842.55);
INSERT INTO `historyauc` VALUES ('2021-04-07 18:09:19', 6, 7, 2605.19);
INSERT INTO `historyauc` VALUES ('2021-04-08 03:21:27', 7, 16, 2668.03);
INSERT INTO `historyauc` VALUES ('2021-04-08 04:52:49', 9, 29, 3654.00);
INSERT INTO `historyauc` VALUES ('2021-04-08 14:48:07', 10, 2, 2777.15);
INSERT INTO `historyauc` VALUES ('2021-04-12 02:04:44', 6, 20, 3136.51);
INSERT INTO `historyauc` VALUES ('2021-04-17 15:02:50', 8, 14, 3326.65);
INSERT INTO `historyauc` VALUES ('2021-04-20 17:55:40', 7, 1, 3550.06);
INSERT INTO `historyauc` VALUES ('2021-04-25 02:10:21', 9, 18, 2024.61);
INSERT INTO `historyauc` VALUES ('2021-04-27 03:09:27', 9, 1, 1733.59);
INSERT INTO `historyauc` VALUES ('2021-04-27 05:44:16', 7, 17, 2244.00);
INSERT INTO `historyauc` VALUES ('2021-04-29 20:20:49', 12, 9, 3506.29);
INSERT INTO `historyauc` VALUES ('2021-05-03 04:44:32', 9, 18, 3316.93);
INSERT INTO `historyauc` VALUES ('2021-05-03 16:48:43', 9, 10, 3442.04);
INSERT INTO `historyauc` VALUES ('2021-05-03 18:47:51', 5, 30, 2457.00);
INSERT INTO `historyauc` VALUES ('2021-05-06 15:29:21', 8, 6, 3454.13);
INSERT INTO `historyauc` VALUES ('2021-05-07 07:32:17', 6, 20, 3013.25);
INSERT INTO `historyauc` VALUES ('2021-05-08 19:18:50', 10, 5, 3898.25);
INSERT INTO `historyauc` VALUES ('2021-05-09 06:30:26', 11, 25, 2237.46);
INSERT INTO `historyauc` VALUES ('2021-05-11 22:12:09', 5, 11, 3118.27);
INSERT INTO `historyauc` VALUES ('2021-05-12 08:56:08', 7, 25, 2552.89);
INSERT INTO `historyauc` VALUES ('2021-05-19 08:56:07', 11, 25, 2168.61);
INSERT INTO `historyauc` VALUES ('2021-05-20 19:10:45', 6, 2, 2267.85);
INSERT INTO `historyauc` VALUES ('2021-05-24 21:19:35', 9, 17, 3284.45);
INSERT INTO `historyauc` VALUES ('2021-05-25 00:57:27', 6, 13, 2608.84);
INSERT INTO `historyauc` VALUES ('2021-06-04 22:01:14', 9, 5, 3881.89);
INSERT INTO `historyauc` VALUES ('2021-06-06 11:35:51', 8, 16, 3104.64);
INSERT INTO `historyauc` VALUES ('2021-06-07 14:32:30', 10, 3, 3156.56);
INSERT INTO `historyauc` VALUES ('2021-06-07 17:21:46', 7, 12, 2422.72);
INSERT INTO `historyauc` VALUES ('2021-06-10 09:41:24', 10, 23, 3670.47);
INSERT INTO `historyauc` VALUES ('2021-06-10 21:16:10', 10, 22, 2872.48);
INSERT INTO `historyauc` VALUES ('2021-06-11 02:54:04', 11, 30, 1810.68);
INSERT INTO `historyauc` VALUES ('2021-06-12 04:24:26', 9, 4, 2727.56);
INSERT INTO `historyauc` VALUES ('2021-06-13 04:27:33', 9, 26, 2310.84);
INSERT INTO `historyauc` VALUES ('2021-06-13 09:26:04', 7, 7, 1532.26);
INSERT INTO `historyauc` VALUES ('2021-06-15 15:44:34', 9, 10, 3655.68);
INSERT INTO `historyauc` VALUES ('2021-06-21 13:01:39', 11, 13, 3596.35);
INSERT INTO `historyauc` VALUES ('2021-06-22 10:30:12', 10, 21, 3402.28);
INSERT INTO `historyauc` VALUES ('2021-06-24 13:58:02', 11, 24, 2654.64);
INSERT INTO `historyauc` VALUES ('2021-06-25 14:54:44', 8, 3, 2896.42);
INSERT INTO `historyauc` VALUES ('2021-06-26 21:16:26', 8, 15, 1750.60);
INSERT INTO `historyauc` VALUES ('2021-06-26 22:36:06', 7, 9, 1735.31);
INSERT INTO `historyauc` VALUES ('2021-07-01 03:13:58', 11, 20, 3072.67);
INSERT INTO `historyauc` VALUES ('2021-07-01 20:41:17', 8, 28, 2995.98);
INSERT INTO `historyauc` VALUES ('2021-07-02 17:57:32', 5, 30, 2705.72);
INSERT INTO `historyauc` VALUES ('2021-07-03 15:42:03', 5, 27, 3435.35);
INSERT INTO `historyauc` VALUES ('2021-07-06 04:02:01', 7, 22, 1782.04);
INSERT INTO `historyauc` VALUES ('2021-07-06 20:35:57', 12, 6, 3193.33);
INSERT INTO `historyauc` VALUES ('2021-07-09 01:43:55', 8, 4, 2798.23);
INSERT INTO `historyauc` VALUES ('2021-07-09 03:05:50', 11, 8, 1993.90);
INSERT INTO `historyauc` VALUES ('2021-07-14 05:47:28', 8, 12, 3006.70);
INSERT INTO `historyauc` VALUES ('2021-07-15 17:33:54', 5, 13, 3657.86);
INSERT INTO `historyauc` VALUES ('2021-07-17 10:44:27', 7, 24, 1669.72);
INSERT INTO `historyauc` VALUES ('2021-07-18 13:25:37', 12, 22, 1633.63);
INSERT INTO `historyauc` VALUES ('2021-07-21 06:15:31', 6, 7, 3470.00);
INSERT INTO `historyauc` VALUES ('2021-07-22 09:50:03', 6, 19, 3994.79);
INSERT INTO `historyauc` VALUES ('2021-07-23 13:15:47', 9, 7, 1933.45);
INSERT INTO `historyauc` VALUES ('2021-07-23 22:17:56', 9, 30, 2780.12);
INSERT INTO `historyauc` VALUES ('2021-07-24 06:18:21', 10, 3, 3416.85);
INSERT INTO `historyauc` VALUES ('2021-08-02 11:57:10', 6, 31, 3960.27);
INSERT INTO `historyauc` VALUES ('2021-08-02 20:18:27', 6, 8, 3642.59);
INSERT INTO `historyauc` VALUES ('2021-08-04 19:48:26', 10, 9, 1691.20);
INSERT INTO `historyauc` VALUES ('2021-08-10 10:38:03', 12, 27, 2281.76);
INSERT INTO `historyauc` VALUES ('2021-08-14 02:43:16', 7, 28, 1545.46);
INSERT INTO `historyauc` VALUES ('2021-08-16 06:31:52', 10, 22, 1509.88);
INSERT INTO `historyauc` VALUES ('2021-08-27 12:17:49', 10, 6, 2278.73);
INSERT INTO `historyauc` VALUES ('2021-08-27 18:09:56', 10, 26, 2808.55);
INSERT INTO `historyauc` VALUES ('2021-08-28 08:28:51', 8, 15, 3563.95);
INSERT INTO `historyauc` VALUES ('2021-09-04 17:29:13', 6, 24, 2252.21);
INSERT INTO `historyauc` VALUES ('2021-09-06 22:48:25', 8, 32, 2275.89);
INSERT INTO `historyauc` VALUES ('2021-09-08 15:01:01', 7, 7, 2740.80);
INSERT INTO `historyauc` VALUES ('2021-09-13 20:14:16', 11, 21, 3310.69);
INSERT INTO `historyauc` VALUES ('2021-09-15 05:07:50', 7, 14, 2645.76);
INSERT INTO `historyauc` VALUES ('2021-09-15 05:25:16', 10, 22, 1511.49);
INSERT INTO `historyauc` VALUES ('2021-09-17 12:05:14', 6, 4, 3939.80);
INSERT INTO `historyauc` VALUES ('2021-09-23 09:49:06', 5, 27, 2730.11);
INSERT INTO `historyauc` VALUES ('2021-09-28 19:31:42', 7, 9, 1512.12);
INSERT INTO `historyauc` VALUES ('2021-09-29 09:22:44', 12, 12, 3300.21);
INSERT INTO `historyauc` VALUES ('2021-10-01 20:21:12', 6, 28, 1775.02);
INSERT INTO `historyauc` VALUES ('2021-10-02 22:48:16', 11, 17, 3413.39);
INSERT INTO `historyauc` VALUES ('2021-10-03 22:13:24', 9, 19, 2951.09);
INSERT INTO `historyauc` VALUES ('2021-10-04 10:03:07', 12, 29, 1520.41);
INSERT INTO `historyauc` VALUES ('2021-10-05 02:35:11', 8, 29, 1790.39);
INSERT INTO `historyauc` VALUES ('2021-10-07 12:09:57', 9, 14, 3320.83);
INSERT INTO `historyauc` VALUES ('2021-10-08 14:50:55', 7, 18, 1834.59);
INSERT INTO `historyauc` VALUES ('2021-10-10 08:57:04', 10, 27, 1544.75);
INSERT INTO `historyauc` VALUES ('2021-10-13 08:56:26', 9, 32, 2981.97);
INSERT INTO `historyauc` VALUES ('2021-10-14 00:18:53', 12, 13, 1622.71);
INSERT INTO `historyauc` VALUES ('2021-10-19 13:05:29', 11, 1, 3884.98);
INSERT INTO `historyauc` VALUES ('2021-10-23 23:06:59', 7, 2, 2427.91);
INSERT INTO `historyauc` VALUES ('2021-10-29 18:04:00', 9, 16, 3174.23);
INSERT INTO `historyauc` VALUES ('2021-11-05 03:42:26', 8, 6, 3201.19);
INSERT INTO `historyauc` VALUES ('2021-11-11 20:14:38', 7, 21, 2448.18);
INSERT INTO `historyauc` VALUES ('2021-11-12 20:15:29', 5, 32, 3284.14);
INSERT INTO `historyauc` VALUES ('2021-11-13 17:32:33', 9, 31, 3734.42);
INSERT INTO `historyauc` VALUES ('2021-11-14 07:59:55', 10, 25, 1578.00);
INSERT INTO `historyauc` VALUES ('2021-11-15 21:22:45', 5, 20, 2277.96);
INSERT INTO `historyauc` VALUES ('2021-11-16 06:02:08', 5, 17, 1816.09);
INSERT INTO `historyauc` VALUES ('2021-11-17 16:31:00', 12, 29, 3534.76);
INSERT INTO `historyauc` VALUES ('2021-11-24 13:50:22', 9, 19, 3614.04);
INSERT INTO `historyauc` VALUES ('2021-11-26 21:38:06', 9, 4, 3385.80);
INSERT INTO `historyauc` VALUES ('2021-11-29 22:16:29', 8, 4, 1787.83);
INSERT INTO `historyauc` VALUES ('2021-12-01 17:30:57', 11, 11, 2889.40);
INSERT INTO `historyauc` VALUES ('2021-12-02 11:57:07', 7, 19, 1872.83);
INSERT INTO `historyauc` VALUES ('2021-12-07 06:12:27', 10, 3, 1908.50);
INSERT INTO `historyauc` VALUES ('2021-12-11 01:11:37', 9, 31, 2186.64);
INSERT INTO `historyauc` VALUES ('2021-12-14 05:42:14', 10, 8, 2531.11);
INSERT INTO `historyauc` VALUES ('2021-12-15 09:09:54', 8, 9, 2773.36);
INSERT INTO `historyauc` VALUES ('2021-12-16 08:13:27', 8, 31, 2834.90);
INSERT INTO `historyauc` VALUES ('2021-12-17 09:31:04', 8, 23, 1554.31);
INSERT INTO `historyauc` VALUES ('2021-12-18 02:01:49', 7, 29, 2640.17);
INSERT INTO `historyauc` VALUES ('2021-12-25 08:46:09', 6, 11, 2977.49);
INSERT INTO `historyauc` VALUES ('2021-12-25 19:53:06', 10, 13, 2938.52);
INSERT INTO `historyauc` VALUES ('2021-12-31 10:29:06', 7, 17, 2358.94);

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `proID` int NOT NULL AUTO_INCREMENT,
  `typID` int NULL DEFAULT NULL,
  `proName` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ownerUID` int NULL DEFAULT NULL,
  `startPrice` decimal(15, 2) NULL DEFAULT NULL,
  `buyNow` decimal(15, 2) NULL DEFAULT NULL,
  `startDate` datetime NULL DEFAULT NULL,
  `endDate` datetime NULL DEFAULT NULL,
  `autoExtend` bit(1) NULL DEFAULT b'1',
  `stepPrice` decimal(15, 2) NULL DEFAULT NULL,
  `allowBadBidde` bit(1) NULL DEFAULT b'1',
  PRIMARY KEY (`proID`) USING BTREE,
  INDEX `fk_product_type`(`typID` ASC) USING BTREE,
  CONSTRAINT `fk_product_type` FOREIGN KEY (`typID`) REFERENCES `type` (`typID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, 2, 'Apple MacBook Air M1 2020 - 13 Inchs (8GB / 16GB - 256GB / 512GB) - Hàng Chính Hãng', 1, 1200.00, 5000.00, '2021-12-24 17:13:31', '2022-01-18 17:13:35', b'1', 100.00, b'1');
INSERT INTO `product` VALUES (2, 6, 'Hộp 12 Bút Chì 2B', 3, 1600.00, 7954.40, '2021-09-26 03:58:44', '2016-12-01 02:40:13', b'1', 100.00, b'1');
INSERT INTO `product` VALUES (3, 6, 'Sổ Tay Ghi Chép 60 Trang Gáy Lò Xo A5 Deli - Xanh Dương/Hồng/Vàng/Xanh Lá', 4, 1400.00, 9295.67, '2021-09-30 06:24:04', '2007-11-01 19:03:36', b'1', 50.00, b'0');
INSERT INTO `product` VALUES (4, 6, 'Combo 5-10-20 Bút Bi Thiên Long TL-027 - Mực Xanh/Đen/Đỏ/Tím', 2, 1800.00, 8563.77, '2021-11-24 18:34:09', '2011-05-26 00:23:35', b'0', 100.00, b'1');
INSERT INTO `product` VALUES (5, 4, 'Giường Ngủ Pallet Gỗ Thông OCHU - Nancy Bed - Natural', 1, 1400.00, 8917.34, '2021-05-07 18:26:41', '2006-07-17 13:11:18', b'0', 150.00, b'0');
INSERT INTO `product` VALUES (6, 5, 'Không Bao Giờ Là Thất Bại - Tất Cả Là Thử Thách (Ấn Bản Cập Nhật Đầy Đủ Nhất)(Bìa Cứng)', 1, 2000.00, 9316.86, '2021-05-14 02:41:22', '2018-03-13 09:53:18', b'0', 150.00, b'1');
INSERT INTO `product` VALUES (7, 5, 'Sách Muôn Kiếp Nhân Sinh Tặng Bookmark', 3, 1000.00, 7493.62, '2021-06-24 07:05:48', '2014-03-26 15:36:50', b'0', 150.00, b'0');
INSERT INTO `product` VALUES (8, 4, 'TỦ GIÀY THÔNG MINH 3 KHOANG 9 TẦNG - KHÔNG ẨM MỐC, MỐI MỌT', 4, 1600.00, 7300.60, '2021-07-10 11:48:50', '2008-06-19 03:45:09', b'1', 150.00, b'0');
INSERT INTO `product` VALUES (9, 2, 'Máy tính xách tay Laptop Dell Latitude 3420 (Intel Core i5-1135G7 | 14 Inch | RAM 8GB | 256GB SSD NVMe | Intel Iris Xe Graphics | Fedora Os)', 2, 2000.00, 8463.06, '2021-11-18 03:29:03', '2013-03-30 19:03:47', b'0', 150.00, b'1');
INSERT INTO `product` VALUES (10, 1, 'Máy giặt LG Inverter 8.5 kg FV1408S4W', 7, 1800.00, 9615.90, '2021-05-11 09:19:56', '2020-07-10 19:17:33', b'0', 200.00, b'0');
INSERT INTO `product` VALUES (11, 6, 'Bộ 6 Bút Dạ Quang, Bút Highlight Màu Cực Đẹp', 7, 1200.00, 6435.92, '2021-09-12 00:56:07', '2008-12-21 17:16:04', b'1', 100.00, b'0');
INSERT INTO `product` VALUES (12, 1, 'Máy giặt LG Inverter 11.5kg T2351VSAB', 1, 1000.00, 6579.33, '2021-06-05 06:13:13', '2016-04-26 08:58:59', b'1', 100.00, b'0');
INSERT INTO `product` VALUES (13, 6, 'Bảng viết, bảng vẽ điện tử thông minh tự động xóa cho bé - Giao màu ngẫu nhiên', 1, 1600.00, 6702.86, '2020-06-10 13:54:39', '2011-06-13 06:49:11', b'1', 100.00, b'1');
INSERT INTO `product` VALUES (14, 4, 'Ghế xếp thư giãn cao cấp kèm đệm Kachi MK232 - Ghế xếp thông minh văn phòng - Trọng tải 300kg', 7, 1300.00, 7225.64, '2021-06-24 09:52:04', '2012-03-05 20:15:50', b'0', 50.00, b'0');
INSERT INTO `product` VALUES (15, 1, 'Máy Lạnh Toshiba Inverter 1 HP', 4, 1100.00, 7723.16, '2021-05-05 12:08:50', '2010-01-18 13:40:00', b'0', 150.00, b'1');
INSERT INTO `product` VALUES (16, 4, 'Quầy Bar Mini Gỗ, Bàn Bếp Cao Cấp Có Ngăn Tủ Để Đồ Decor Đẹp - Giao màu ngẫu nhiên', 3, 1200.00, 6517.81, '2021-05-21 07:48:49', '2016-02-22 16:04:31', b'1', 200.00, b'1');
INSERT INTO `product` VALUES (17, 5, 'Kỷ Luật Tự Giác (Tặng Kèm Bookmark )', 2, 1500.00, 8942.60, '2020-08-12 00:52:02', '2001-07-28 04:45:19', b'1', 150.00, b'0');
INSERT INTO `product` VALUES (18, 2, 'Laptop Dell Vostro 3405 P132G002ABL (AMD R3-3250U/ 8GB DDR4/ HDD 1Tb/ 14 FHD/ Win11 + Office2021) - Hàng Chính Hãng', 2, 1800.00, 9354.28, '2021-10-21 17:31:25', '2011-03-20 21:03:52', b'0', 150.00, b'1');
INSERT INTO `product` VALUES (19, 6, 'Bộ Màu Nước Solid Water Color Cao Cấp 12/18/24/36 Màu - Tặng Kèm 2 Bút Nước, 2 Mút, 1 Palette - Chuyên Dùng Cho Học Sinh, Sinh Viên, Vẽ Chuyên Nghiệp ', 4, 1800.00, 9507.11, '2021-07-13 00:42:22', '2006-12-07 12:35:09', b'0', 100.00, b'0');
INSERT INTO `product` VALUES (20, 5, 'Tâm Lý Học Hành Vi (Tặng Kèm 1 Bookmark )', 3, 1800.00, 5329.85, '2020-10-29 20:19:49', '2021-04-29 15:09:17', b'0', 200.00, b'0');
INSERT INTO `product` VALUES (21, 3, 'Bộ Dụng Cụ Nhà Bếp Lock&Lock CKT415', 1, 1700.00, 5299.39, '2021-09-30 17:29:49', '2018-03-31 00:43:15', b'0', 150.00, b'0');
INSERT INTO `product` VALUES (22, 3, 'Khay Inox 304 Cao Cấp Đựng Đồ Đa Năng Hình Chữ Nhật Gác Bồn Rửa Bát Tiện Dụng', 4, 1700.00, 5520.95, '2020-05-08 18:43:23', '2007-05-19 08:08:43', b'0', 150.00, b'0');
INSERT INTO `product` VALUES (23, 4, 'Tủ Kệ Sách Đứng Đa Năng 5 Tầng Hiện Đại BAYA Sund Chất Liệu Gỗ MFC Chắc Chắn Thiết Kế Hình Chữ Nhật Nhiều Màu Sắc Tối Giản Trang Nhã', 4, 1300.00, 7487.12, '2020-03-26 14:13:59', '2018-03-14 08:44:57', b'0', 150.00, b'1');
INSERT INTO `product` VALUES (24, 5, 'Combo 2 Tập: Ngỡ Chỉ Là Thoáng Qua Mà Một Đời Thương Nhớ', 2, 2000.00, 6938.59, '2020-11-23 17:49:16', '2020-08-14 01:41:16', b'0', 150.00, b'1');
INSERT INTO `product` VALUES (25, 1, 'Máy Lạnh LG Inverter 1.5 HP V13APF', 2, 1900.00, 8301.37, '2020-11-20 14:11:24', '2013-03-15 05:57:50', b'1', 200.00, b'1');
INSERT INTO `product` VALUES (26, 2, 'Laptop HP 15s-fq2602TU 4B6D3PA (Core i5-1135G7/ 8GB DDR4 2666MHz/ 256GB M.2 PCIe NVMe/ 15.6 HD/ Win11) - Hàng Chính Hãng', 3, 1300.00, 7421.92, '2020-10-23 06:00:32', '2012-11-25 01:32:17', b'1', 100.00, b'1');
INSERT INTO `product` VALUES (27, 3, 'Giá Để Giẻ Rửa Bát, Nước Rửa Chén Đa Năng Inox 304', 4, 1500.00, 5179.40, '2020-03-19 22:30:29', '2001-09-10 18:51:10', b'0', 150.00, b'0');
INSERT INTO `product` VALUES (28, 2, 'Laptop Asus ExpertBook B1400CEAE-EK3724 (Core i5-1135G7/ 8GB DDR4/ 256GB SSD/ 14FHD/ DOS) - Hàng Chính Hãng', 7, 1700.00, 9694.05, '2020-05-06 17:19:03', '2020-06-08 13:25:29', b'0', 100.00, b'0');
INSERT INTO `product` VALUES (29, 1, 'Tủ Lạnh Aqua 130 lít AQR-T150FA-BS', 3, 1000.00, 7515.18, '2020-04-08 15:02:50', '2014-10-30 13:20:44', b'1', 50.00, b'1');
INSERT INTO `product` VALUES (30, 4, 'Kệ để giày dép mini 3 tầng 42 x 20 x 58 cm Chấn Thuận Thành đa năng, nhỏ gọn, có thể tháo rời, hàng Việt Nam chất lượng cao (KDN3T20) nhiều màu', 4, 1400.00, 9114.61, '2020-03-23 09:27:39', '2011-08-08 07:09:26', b'1', 50.00, b'0');
INSERT INTO `product` VALUES (31, 3, 'Lọ đựng gia vị, dầu ăn, nước chấm bằng thủy tinh trong suốt kèm muỗng tiện lợi', 3, 1100.00, 5430.38, '2020-08-06 23:05:48', '2020-05-25 03:44:23', b'1', 200.00, b'1');
INSERT INTO `product` VALUES (32, 3, 'Máy xay tỏi ớt bằng tay Lock&Lock (Nhiều kích cỡ) - Hàng chính hãng, lực nghiền mạnh với 3 lưỡi dao thép không gỉ', 2, 1100.00, 9737.27, '2020-07-31 10:51:03', '2019-12-04 01:21:08', b'0', 100.00, b'1');
INSERT INTO `product` VALUES (33, 2, 'Laptop Dell Inspiron 5410 P143G001ASL (Core i5-11320H/ 8GB DDR4/ 512GB SSD/ 14 FHD/ Win10 + Office) - Hàng Chính Hãng', 4, 1700.00, 8394.97, '2020-03-19 08:21:22', '2021-09-19 19:55:28', b'1', 100.00, b'0');
INSERT INTO `product` VALUES (34, 5, 'Tâm Lý Học - Phác Họa Chân Dung Kẻ Phạm Tội', 1, 1000.00, 8955.71, '2020-10-26 02:33:22', '2014-12-30 17:45:00', b'0', 200.00, b'0');
INSERT INTO `product` VALUES (35, 3, 'Kẹp Gắp Đồ Ăn Bằng Inox', 3, 1500.00, 9143.74, '2020-08-26 15:46:52', '2003-11-24 03:44:18', b'1', 100.00, b'1');
INSERT INTO `product` VALUES (36, 1, 'Máy giặt Electrolux Inverter 10 kg EWF1024BDWA', 2, 1900.00, 5521.41, '2020-11-03 17:18:17', '2010-08-26 18:23:49', b'1', 50.00, b'1');

-- ----------------------------
-- Table structure for rating
-- ----------------------------
DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating`  (
  `UIDRater` int NOT NULL,
  `UID` int NOT NULL,
  `proID` int NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`UIDRater`, `UID`, `proID`) USING BTREE,
  INDEX `fk_rating_users`(`UID` ASC) USING BTREE,
  INDEX `fk_rating_product`(`proID` ASC) USING BTREE,
  CONSTRAINT `fk_rating_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_rating_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rating
-- ----------------------------

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type`  (
  `typID` int NOT NULL AUTO_INCREMENT,
  `catID` int NULL DEFAULT NULL,
  `typName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`typID`) USING BTREE,
  INDEX `fk_type_category`(`catID` ASC) USING BTREE,
  CONSTRAINT `fk_type_category` FOREIGN KEY (`catID`) REFERENCES `category` (`catID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES (1, 1, 'Thiết bị điện lạnh');
INSERT INTO `type` VALUES (2, 1, 'Máy tính');
INSERT INTO `type` VALUES (3, 2, 'Dụng cụ nhà bếp');
INSERT INTO `type` VALUES (4, 2, 'Nội thất');
INSERT INTO `type` VALUES (5, 3, 'Sách tiếng Việt');
INSERT INTO `type` VALUES (6, 3, 'Văn phòng phẩm');

-- ----------------------------
-- Table structure for upseller
-- ----------------------------
DROP TABLE IF EXISTS `upseller`;
CREATE TABLE `upseller`  (
  `UID` int NOT NULL,
  `isAcpt` bit(1) NULL DEFAULT b'0',
  `askDate` datetime NOT NULL,
  PRIMARY KEY (`UID`) USING BTREE,
  CONSTRAINT `fk_upSeller_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of upseller
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `UID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` char(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `addr` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dob` date NULL DEFAULT NULL,
  `type` int NULL DEFAULT NULL,
  `good` int NULL DEFAULT NULL,
  `dislike` int NULL DEFAULT NULL,
  PRIMARY KEY (`UID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (0, 'admin@gmail.com', 'admin', 'Louise Jonson', '88 W Ring Rd, Buji Town, Longgang', '1990-07-11', 0, NULL, NULL);
INSERT INTO `users` VALUES (1, 'dmnhat19@clc.fitus.edu.vn', '1234', 'Đỗ Minh Nhật', 'TP. HCM', '2001-11-04', 1, 123, 4);
INSERT INTO `users` VALUES (2, 'fregregory@gmail.com', 'dtHFcqrB78', 'Gregory Freeman', '326 Whitehouse Lane, Huntingdon Rd', '1992-02-17', 1, 50, 10);
INSERT INTO `users` VALUES (3, 'rogerfrank@outlook.com', 'wRYdI0SL2p', 'Frank Rogers', 'No.855, Dongsan Road, Erxianqiao, Chenghua District', '1995-01-07', 1, 75, 5);
INSERT INTO `users` VALUES (4, 'hdorothy@gmail.com', 'JmGAlekV3O', 'Dorothy Hicks', '3-19-9 Shimizu, Kita Ward', '2001-06-05', 1, 36, 3);
INSERT INTO `users` VALUES (5, 'ricewalte@outlook.com', 'LE6nHl4ler', 'Walter Rice', '881 W Ring Rd, Buji Town, Longgang', '2001-10-12', 2, 7, 15);
INSERT INTO `users` VALUES (6, 'andrellis03@mail.com', 'qEQIRzhnMH', 'Andrea Ellis', '71 Abingdon Rd, Cumnor', '1998-10-24', 2, 27, 11);
INSERT INTO `users` VALUES (7, 'jacksonl06@hotmail.com', '9Z05D7o9XV', 'Louise Jackson', '648 Cannon Street', '2002-08-17', 1, 42, 5);
INSERT INTO `users` VALUES (8, 'emilyha@gmail.com', 'DIbHJ1gJPm', 'Emily Hamilton', '816 2nd Zhongshan Road, Yuexiu District', '1996-09-10', 2, 56, 0);
INSERT INTO `users` VALUES (9, 'jh1@icloud.com', 'fSBIranQUP', 'Joyce Hawkins', '9 4-20 Kawagishicho, Mizuho Ward', '2000-10-01', 2, 70, 5);
INSERT INTO `users` VALUES (10, 'kcoleman@outlook.com', 'C8AWr4mTqE', 'Kathy Coleman', '295 Redfern St', '1996-12-28', 2, 75, 8);
INSERT INTO `users` VALUES (11, 'hgrant@yahoo.com', 'l2UkLJN6iy', 'Herbert Grant', '1-6-8, Marunouchi, Chiyoda-ku', '2000-07-20', 2, 45, 1);
INSERT INTO `users` VALUES (12, 'emilyhahaha@gmail.com', 'df564g6fdg', 'Emily Hai', '124 2nd Zhongshan Road, Yuexiu District', '2003-07-24', 2, 14, 1);

-- ----------------------------
-- Table structure for waittingbid
-- ----------------------------
DROP TABLE IF EXISTS `waittingbid`;
CREATE TABLE `waittingbid`  (
  `proID` int NULL DEFAULT NULL,
  `UID` int NULL DEFAULT NULL,
  `isAcpt` bit(1) NULL DEFAULT b'0',
  INDEX `fk_newBidderPro_users`(`UID` ASC) USING BTREE,
  INDEX `fk_newBidderPro_product`(`proID` ASC) USING BTREE,
  CONSTRAINT `fk_newBidderPro_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_newBidderPro_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of waittingbid
-- ----------------------------

-- ----------------------------
-- Table structure for watchlist
-- ----------------------------
DROP TABLE IF EXISTS `watchlist`;
CREATE TABLE `watchlist`  (
  `UID` int NOT NULL,
  `proID` int NOT NULL,
  PRIMARY KEY (`UID`, `proID`) USING BTREE,
  CONSTRAINT `fk_watchList_users` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of watchlist
-- ----------------------------

-- ----------------------------
-- Table structure for winauction
-- ----------------------------
DROP TABLE IF EXISTS `winauction`;
CREATE TABLE `winauction`  (
  `proID` int NOT NULL,
  `UID` int NULL DEFAULT NULL,
  `winPrice` decimal(15, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`proID`) USING BTREE,
  CONSTRAINT `fk_winAuction_product` FOREIGN KEY (`proID`) REFERENCES `product` (`proID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of winauction
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
