SELECT * FROM Unit;
SELECT * FROM Schools;
SELECT * FROM property_details pd 
where propertyDetailsID > 700;


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE property_details;
SET FOREIGN_KEY_CHECKS = 1;



select * from MainInformation mi

ALTER TABLE MainInformation MODIFY buildingID BIGINT;


ALTER TABLE ApartmentBuildings 
ADD CONSTRAINT FK_MainInformation_Building
FOREIGN KEY (buildingID) REFERENCES MainInformation(buildingID);

SELECT CONSTRAINT_NAME, TABLE_NAME 
FROM information_schema.TABLE_CONSTRAINTS 
WHERE CONSTRAINT_TYPE = 'FOREIGN KEY' 
AND TABLE_SCHEMA = 'hmedbmain';

ALTER TABLE MainInformation  DROP FOREIGN KEY FK_MainInformation_Building;

ALTER TABLE ApartmentBuildings MODIFY COLUMN buildingID BIGINT;


/*Table for user */
	
CREATE TABLE user(
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(300),
    -- JSON array of strings 
    searches JSON, 
    -- JSON array of property ids 
    favourites JSON,
    -- JSON object of key-value pairs(safety: 7, nightlife: 5 ...)
    weights JSON, 
    -- JSON array of JSON object (propertyId: x, msg: y)
    applications JSON
);