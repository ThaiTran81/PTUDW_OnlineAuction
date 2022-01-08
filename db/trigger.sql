-- TRIGGER cap nhat so luot bid

DELIMITER $$
CREATE TRIGGER trg_product_BidCount AFTER INSERT ON historyauc FOR EACH ROW
BEGIN
		UPDATE product 
		SET BidCount = BidCount + 1 
	WHERE
		proID = NEW.proID;
	
END;
$$DELIMITER;