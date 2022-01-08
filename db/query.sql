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
	JOIN type ON type.typID = p.typID 
WHERE
	p.endDate > NOW() 
	AND type.catID = 1 
	LIMIT 4 OFFSET 2
	
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