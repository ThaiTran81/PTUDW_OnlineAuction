-- find top 5 end 
SELECT
	p.*,
	u.UID,
	u.`name`,
	u.email,
	h.price 
FROM
	product p
	JOIN historyauc h ON p.proID = h.proID
	JOIN (
	SELECT
		h2.proID,
		MAX( h2.price ) AS price 
	FROM
		historyauc h2
		JOIN currentauction c ON h2.UID = c.UID 
	WHERE
		c.isBlock != 1 
	GROUP BY
		h2.proID 
	) t1 ON t1.proID = h.proID 
	AND h.price = t1.price
	JOIN users u ON h.UID = u.UID 
WHERE
	p.endDate > NOW() 
ORDER BY
	p.endDate ASC 
	LIMIT 5

-- top san pham co nhieu luot ra gia nhat
SELECT
	p.*,
	u.UID,
	u.`name`,
	u.email,
	h.price 
FROM
	product p
	JOIN historyauc h ON p.proID = h.proID
	JOIN (
	SELECT
		h2.proID,
		MAX( h2.price ) AS price 
	FROM
		historyauc h2
		JOIN currentauction c ON h2.UID = c.UID 
	WHERE
		c.isBlock != 1 
	GROUP BY
		h2.proID 
	) t1 ON t1.proID = h.proID 
	AND h.price = t1.price
	JOIN users u ON h.UID = u.UID 
WHERE
	p.endDate > NOW() 
ORDER BY
	p.BidCount DESC 
	LIMIT 5
	
-- 	top 5 san pham co gia cao nhat
SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (
SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() ORDER BY h.price DESC LIMIT 5

-- chon san pham theo catID
SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (
SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID JOIN type ON type.typID=p.typID WHERE p.endDate> NOW() AND type.catID=2 ORDER BY h.price ASC LIMIT 4 OFFSET 2
	
	-- chon san pham theo typeID
SELECT
	p.*,
	u.UID,
	u.`name`,
	u.email,
	h.price 
FROM
	product p
	JOIN historyauc h ON p.proID = h.proID
	JOIN (
	SELECT
		h2.proID,
		MAX( h2.price ) AS price 
	FROM
		historyauc h2
		JOIN currentauction c ON h2.UID = c.UID 
	WHERE
		c.isBlock != 1 
	GROUP BY
		h2.proID 
	) t1 ON t1.proID = h.proID 
	AND h.price = t1.price
	JOIN users u ON h.UID = u.UID 
WHERE
	p.endDate > NOW() 
	AND typID = 2 
	LIMIT 4 OFFSET 2
	
	
-- 	San pham user dang dau gia
SELECT
	p.*,
	u.UID,
	u.`name`,
	u.email,
	h.price 
FROM
	product p
	JOIN historyauc h ON p.proID = h.proID
	JOIN (
	SELECT
		h2.proID,
		MAX( h2.price ) AS price 
	FROM
		historyauc h2
		JOIN currentauction c ON h2.UID = c.UID 
	WHERE
		c.isBlock != 1 
	GROUP BY
		h2.proID 
	) t1 ON t1.proID = h.proID 
	AND h.price = t1.price
	JOIN users u ON h.UID = u.UID
	JOIN currentauction c1 ON c1.proID = p.proID 
WHERE
	p.endDate > NOW() 
	AND c1.UID = 5 
	LIMIT 4 OFFSET 2
-- 	Tim san pham user dau gia thang
SELECT
	p.*,
	u.UID,
	u.`name`,
	u.email,
	h.price 
FROM
	product p
	JOIN historyauc h ON p.proID = h.proID
	JOIN (
	SELECT
		h2.proID,
		MAX( h2.price ) AS price 
	FROM
		historyauc h2
		JOIN currentauction c ON h2.UID = c.UID 
	WHERE
		c.isBlock != 1 
	GROUP BY
		h2.proID 
	) t1 ON t1.proID = h.proID 
	AND h.price = t1.price
	JOIN users u ON h.UID = u.UID 
WHERE
	p.endDate < NOW() 
	AND h.UID = 5 
	LIMIT 4 OFFSET 2
-- Danh sach san pham yeu thich
SELECT
	p.*,
	u.UID,
	u.`name`,
	u.email,
	h.price 
FROM
	product p
	JOIN historyauc h ON p.proID = h.proID
	JOIN (
	SELECT
		h2.proID,
		MAX( h2.price ) AS price 
	FROM
		historyauc h2
		JOIN currentauction c ON h2.UID = c.UID 
	WHERE
		c.isBlock != 1 
	GROUP BY
		h2.proID 
	) t1 ON t1.proID = h.proID 
	AND h.price = t1.price
	JOIN users u ON h.UID = u.UID
	JOIN watchlist w ON w.proID = p.proID 
WHERE
	w.UID = 5 
	LIMIT 4 OFFSET 2
-- Cac san pham da dau gia
SELECT
	p.*,
	u.UID,
	u.`name`,
	u.email,
	h.price 
FROM
	product p
	JOIN historyauc h ON p.proID = h.proID
	JOIN (
	SELECT
		h2.proID,
		MAX( h2.price ) AS price 
	FROM
		historyauc h2
		JOIN currentauction c ON h2.UID = c.UID 
	WHERE
		c.isBlock != 1 
	GROUP BY
		h2.proID 
	) t1 ON t1.proID = h.proID 
	AND h.price = t1.price
	JOIN users u ON h.UID = u.UID
	JOIN currentauction c2 ON c2.proID = p.proID 
WHERE
	p.endDate <= NOW() 
	AND c2.UID = 5 
	LIMIT 4 OFFSET 2
	
-- 	thong tin nguoi nang cap tai khoan upseller
SELECT
	u.UID,
	u.email,
	u.`name`,
	u.addr,
	u.dob,
	u.good,
	u.dislike,
	us.askDate 
FROM
	users u
	JOIN upseller us ON u.UID = us.UID 
WHERE
	us.isAcpt = 0
-- nang cap seller
UPDATE users 
SET type = 1 WHERE UID = 1

DELETE FROM upseller WHERE UID = 1

SELECT * FROM upseller