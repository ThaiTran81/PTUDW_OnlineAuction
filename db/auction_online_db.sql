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

 Date: 04/01/2022 20:12:07
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
INSERT INTO `product` VALUES (2, 6, 'Hộp 12 Bút Chì 2B', 3, 1588.70, 7954.40, '2021-09-26 03:58:44', '2016-12-01 02:40:13', b'1', 112.59, b'1');
INSERT INTO `product` VALUES (3, 6, 'Sổ Tay Ghi Chép 60 Trang Gáy Lò Xo A5 Deli - Xanh Dương/Hồng/Vàng/Xanh Lá', 4, 1389.28, 9295.67, '2021-09-30 06:24:04', '2007-11-01 19:03:36', b'1', 55.86, b'0');
INSERT INTO `product` VALUES (4, 6, 'Combo 5-10-20 Bút Bi Thiên Long TL-027 - Mực Xanh/Đen/Đỏ/Tím', 2, 1776.42, 8563.77, '2021-11-24 18:34:09', '2011-05-26 00:23:35', b'0', 109.41, b'1');
INSERT INTO `product` VALUES (5, 4, 'Giường Ngủ Pallet Gỗ Thông OCHU - Nancy Bed - Natural', 1, 1375.07, 8917.34, '2021-05-07 18:26:41', '2006-07-17 13:11:18', b'0', 173.89, b'0');
INSERT INTO `product` VALUES (6, 5, 'Không Bao Giờ Là Thất Bại - Tất Cả Là Thử Thách (Ấn Bản Cập Nhật Đầy Đủ Nhất)(Bìa Cứng)', 1, 1974.71, 9316.86, '2021-05-14 02:41:22', '2018-03-13 09:53:18', b'0', 145.73, b'1');
INSERT INTO `product` VALUES (7, 5, 'Sách Muôn Kiếp Nhân Sinh Tặng Bookmark', 3, 1060.57, 7493.62, '2021-06-24 07:05:48', '2014-03-26 15:36:50', b'0', 138.09, b'0');
INSERT INTO `product` VALUES (8, 4, 'TỦ GIÀY THÔNG MINH 3 KHOANG 9 TẦNG - KHÔNG ẨM MỐC, MỐI MỌT', 4, 1562.58, 7300.60, '2021-07-10 11:48:50', '2008-06-19 03:45:09', b'1', 163.61, b'0');
INSERT INTO `product` VALUES (9, 2, 'Máy tính xách tay Laptop Dell Latitude 3420 (Intel Core i5-1135G7 | 14 Inch | RAM 8GB | 256GB SSD NVMe | Intel Iris Xe Graphics | Fedora Os)', 2, 1942.48, 8463.06, '2021-11-18 03:29:03', '2013-03-30 19:03:47', b'0', 159.72, b'1');
INSERT INTO `product` VALUES (10, 1, 'Máy giặt LG Inverter 8.5 kg FV1408S4W', 7, 1834.53, 9615.90, '2021-05-11 09:19:56', '2020-07-10 19:17:33', b'0', 194.21, b'0');
INSERT INTO `product` VALUES (11, 6, 'Bộ 6 Bút Dạ Quang, Bút Highlight Màu Cực Đẹp', 7, 1202.27, 6435.92, '2021-09-12 00:56:07', '2008-12-21 17:16:04', b'1', 98.86, b'0');
INSERT INTO `product` VALUES (12, 1, 'Máy giặt LG Inverter 11.5kg T2351VSAB', 1, 1008.88, 6579.33, '2021-06-05 06:13:13', '2016-04-26 08:58:59', b'1', 108.44, b'0');
INSERT INTO `product` VALUES (13, 6, 'Bảng viết, bảng vẽ điện tử thông minh tự động xóa cho bé - Giao màu ngẫu nhiên', 1, 1638.94, 6702.86, '2020-06-10 13:54:39', '2011-06-13 06:49:11', b'1', 80.95, b'1');
INSERT INTO `product` VALUES (14, 4, 'Ghế xếp thư giãn cao cấp kèm đệm Kachi MK232 - Ghế xếp thông minh văn phòng - Trọng tải 300kg', 7, 1298.67, 7225.64, '2021-06-24 09:52:04', '2012-03-05 20:15:50', b'0', 57.77, b'0');
INSERT INTO `product` VALUES (15, 1, 'Máy Lạnh Toshiba Inverter 1 HP', 4, 1071.28, 7723.16, '2021-05-05 12:08:50', '2010-01-18 13:40:00', b'0', 155.71, b'1');
INSERT INTO `product` VALUES (16, 4, 'Quầy Bar Mini Gỗ, Bàn Bếp Cao Cấp Có Ngăn Tủ Để Đồ Decor Đẹp - Giao màu ngẫu nhiên', 3, 1731.95, 6517.81, '2021-05-21 07:48:49', '2016-02-22 16:04:31', b'1', 198.47, b'1');
INSERT INTO `product` VALUES (17, 5, 'Kỷ Luật Tự Giác (Tặng Kèm Bookmark )', 2, 1569.03, 8942.60, '2020-08-12 00:52:02', '2001-07-28 04:45:19', b'1', 170.10, b'0');
INSERT INTO `product` VALUES (18, 2, 'Laptop Dell Vostro 3405 P132G002ABL (AMD R3-3250U/ 8GB DDR4/ HDD 1Tb/ 14 FHD/ Win11 + Office2021) - Hàng Chính Hãng', 2, 1776.55, 9354.28, '2021-10-21 17:31:25', '2011-03-20 21:03:52', b'0', 149.76, b'1');
INSERT INTO `product` VALUES (19, 6, 'Bộ Màu Nước Solid Water Color Cao Cấp 12/18/24/36 Màu - Tặng Kèm 2 Bút Nước, 2 Mút, 1 Palette - Chuyên Dùng Cho Học Sinh, Sinh Viên, Vẽ Chuyên Nghiệp ', 4, 1846.61, 9507.11, '2021-07-13 00:42:22', '2006-12-07 12:35:09', b'0', 102.88, b'0');
INSERT INTO `product` VALUES (20, 5, 'Tâm Lý Học Hành Vi (Tặng Kèm 1 Bookmark )', 3, 1782.16, 5329.85, '2020-10-29 20:19:49', '2021-04-29 15:09:17', b'0', 192.28, b'0');
INSERT INTO `product` VALUES (21, 3, 'Bộ Dụng Cụ Nhà Bếp Lock&Lock CKT415', 1, 1696.20, 5299.39, '2021-09-30 17:29:49', '2018-03-31 00:43:15', b'0', 148.33, b'0');
INSERT INTO `product` VALUES (22, 3, 'Khay Inox 304 Cao Cấp Đựng Đồ Đa Năng Hình Chữ Nhật Gác Bồn Rửa Bát Tiện Dụng', 4, 1718.92, 5520.95, '2020-05-08 18:43:23', '2007-05-19 08:08:43', b'0', 144.68, b'0');
INSERT INTO `product` VALUES (23, 4, 'Tủ Kệ Sách Đứng Đa Năng 5 Tầng Hiện Đại BAYA Sund Chất Liệu Gỗ MFC Chắc Chắn Thiết Kế Hình Chữ Nhật Nhiều Màu Sắc Tối Giản Trang Nhã', 4, 1284.47, 7487.12, '2020-03-26 14:13:59', '2018-03-14 08:44:57', b'0', 155.32, b'1');
INSERT INTO `product` VALUES (24, 5, 'Combo 2 Tập: Ngỡ Chỉ Là Thoáng Qua Mà Một Đời Thương Nhớ', 2, 1971.40, 6938.59, '2020-11-23 17:49:16', '2020-08-14 01:41:16', b'0', 137.90, b'1');
INSERT INTO `product` VALUES (25, 1, 'Máy Lạnh LG Inverter 1.5 HP V13APF', 2, 1919.02, 8301.37, '2020-11-20 14:11:24', '2013-03-15 05:57:50', b'1', 182.90, b'1');
INSERT INTO `product` VALUES (26, 2, 'Laptop HP 15s-fq2602TU 4B6D3PA (Core i5-1135G7/ 8GB DDR4 2666MHz/ 256GB M.2 PCIe NVMe/ 15.6 HD/ Win11) - Hàng Chính Hãng', 3, 1272.34, 7421.92, '2020-10-23 06:00:32', '2012-11-25 01:32:17', b'1', 122.98, b'1');
INSERT INTO `product` VALUES (27, 3, 'Giá Để Giẻ Rửa Bát, Nước Rửa Chén Đa Năng Inox 304', 4, 1504.79, 5179.40, '2020-03-19 22:30:29', '2001-09-10 18:51:10', b'0', 136.63, b'0');
INSERT INTO `product` VALUES (28, 2, 'Laptop Asus ExpertBook B1400CEAE-EK3724 (Core i5-1135G7/ 8GB DDR4/ 256GB SSD/ 14FHD/ DOS) - Hàng Chính Hãng', 7, 1656.22, 9694.05, '2020-05-06 17:19:03', '2020-06-08 13:25:29', b'0', 96.01, b'0');
INSERT INTO `product` VALUES (29, 1, 'Tủ Lạnh Aqua 130 lít AQR-T150FA-BS', 3, 1021.79, 7515.18, '2020-04-08 15:02:50', '2014-10-30 13:20:44', b'1', 51.68, b'1');
INSERT INTO `product` VALUES (30, 4, 'Kệ để giày dép mini 3 tầng 42 x 20 x 58 cm Chấn Thuận Thành đa năng, nhỏ gọn, có thể tháo rời, hàng Việt Nam chất lượng cao (KDN3T20) nhiều màu', 4, 1376.10, 9114.61, '2020-03-23 09:27:39', '2011-08-08 07:09:26', b'1', 67.08, b'0');
INSERT INTO `product` VALUES (31, 3, 'Lọ đựng gia vị, dầu ăn, nước chấm bằng thủy tinh trong suốt kèm muỗng tiện lợi', 3, 1048.71, 5430.38, '2020-08-06 23:05:48', '2020-05-25 03:44:23', b'1', 179.10, b'1');
INSERT INTO `product` VALUES (32, 3, 'Máy xay tỏi ớt bằng tay Lock&Lock (Nhiều kích cỡ) - Hàng chính hãng, lực nghiền mạnh với 3 lưỡi dao thép không gỉ', 2, 1101.18, 9737.27, '2020-07-31 10:51:03', '2019-12-04 01:21:08', b'0', 107.51, b'1');
INSERT INTO `product` VALUES (33, 2, 'Laptop Dell Inspiron 5410 P143G001ASL (Core i5-11320H/ 8GB DDR4/ 512GB SSD/ 14 FHD/ Win10 + Office) - Hàng Chính Hãng', 4, 1767.45, 8394.97, '2020-03-19 08:21:22', '2021-09-19 19:55:28', b'1', 75.03, b'0');
INSERT INTO `product` VALUES (34, 5, 'Tâm Lý Học - Phác Họa Chân Dung Kẻ Phạm Tội', 1, 1039.18, 8955.71, '2020-10-26 02:33:22', '2014-12-30 17:45:00', b'0', 188.77, b'0');
INSERT INTO `product` VALUES (35, 3, 'Kẹp Gắp Đồ Ăn Bằng Inox', 3, 1466.55, 9143.74, '2020-08-26 15:46:52', '2003-11-24 03:44:18', b'1', 103.37, b'1');
INSERT INTO `product` VALUES (36, 1, 'Máy giặt Electrolux Inverter 10 kg EWF1024BDWA', 2, 1935.36, 5521.41, '2020-11-03 17:18:17', '2010-08-26 18:23:49', b'1', 64.29, b'1');

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
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
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
