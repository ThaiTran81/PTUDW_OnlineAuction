ALTER TABLE product
ADD FULLTEXT(proName)

-- Chon san pham theo ten , catID
drop PROCEDURE textSearch;
DELIMITER $$
CREATE PROCEDURE textSearch (keyword VARCHAR (150),
	scatID INT,
	stypID INT,
	limitNum INT,
	offsetNum INT,
	sortOrder VARCHAR (50),
	sortColumn VARCHAR (50)
	) BEGIN
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
		JOIN type typ ON typ.typID = p.typID 
	WHERE
		p.endDate > NOW() 
		AND (
			typ.catID = scatID 
			OR scatID IS NULL 
		) 
		AND (
			typ.typID = stypID 
			OR stypID IS NULL 
		) 
		AND MATCH ( p.proName ) AGAINST ( keyword IN BOOLEAN MODE) 
	ORDER BY
	CASE
			WHEN sortOrder <> 'ASC' THEN cast( NULL AS datetime ) 
			WHEN sortColumn = 'time' THEN p.endDate 
		END ASC,
	CASE
			WHEN sortOrder <> 'ASC' THEN 0
			WHEN sortColumn = 'price' THEN h.price
		END ASC,
	CASE
			WHEN sortOrder <> 'DESC' THEN cast( NULL AS datetime ) 
			WHEN sortColumn = 'time' THEN p.endDate 
		END DESC,
	CASE
			WHEN sortOrder <> 'DESC' THEN 0
			WHEN sortColumn = 'price' THEN h.price
		END DESC
	LIMIT limitNum OFFSET offsetNum ;
END$$

DELIMITER ;

DROP PROCEDURE textSearchCount;
DELIMITER $$
CREATE PROCEDURE textSearchCount (keyword VARCHAR (150),
	scatID INT,
	stypID INT
	) BEGIN
	SELECT
		COUNT(p.proID) as amount
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
		JOIN type typ ON typ.typID = p.typID 
	WHERE
		p.endDate > NOW() 
		AND (
			typ.catID = scatID 
			OR scatID IS NULL 
		) 
		AND (
			typ.typID = stypID 
			OR stypID IS NULL 
		) 
		AND MATCH ( p.proName ) AGAINST ( keyword IN BOOLEAN MODE);
END$$

DELIMITER ;