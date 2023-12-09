CREATE TABLE main_information (
    propertyID BIGINT PRIMARY KEY,
    unitID BIGINT,
    propertyDetailsID BIGINT,
    priceHistoryID BIGINT,
    feeID BIGINT,
    addressID BIGINT,
    schoolID BIGINT,
    buildingID BIGINT,
    overview TEXT,
    price DECIMAL(10,2),
    bathrooms INT,
    bathroomsHalf INT,
    bathroomsFull INT,
    bedrooms INT,
    livingArea VARCHAR(100),
    homeType VARCHAR(50),
    homeStatus VARCHAR(50),
    datePosted DATE,
    rentEstimate DECIMAL(10,2),
    availableFrom DATETIME,
    availableNow BOOLEAN
);



DROP TABLE main_information;
DROP TABLE Images;
DROP TABLE Fees;
DROP TABLE PropertyExtraDetails;
DROP TABLE Schools;
DROP TABLE UnitInformation;
DROP TABLE UnitInformation;



CREATE TABLE Addresses (
    addressID BIGINT PRIMARY KEY,
    buildingID BIGINT,
    geoLocation POINT,
    postingGroupName VARCHAR(255),
    agentName VARCHAR(255),
    buildingName VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    streetAddress VARCHAR(255),
    zipcode VARCHAR(10),
    cityRegion VARCHAR(100),
    stateId INT,
    cityId INT,
    country VARCHAR(100),
    neighbourhoodGeoLocation POINT
    -- If you have any references from other tables, add those foreign keys here.
    -- For instance, if buildingID references Buildings table:
    -- FOREIGN KEY (buildingID) REFERENCES Buildings(buildingID)
);

DROP TABL




ALTER TABLE UnitInformation
DROP COLUMN propertyID;
ALTER TABLE UnitInformation
DROP COLUMN buildingID;


DROP TABLE UnitInformation
