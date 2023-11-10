ALTER TABLE MainInformation MODIFY buildingID INT UNSIGNED;

DESCRIBE property_details;

SELECT CONSTRAINT_NAME, TABLE_NAME 
FROM information_schema.TABLE_CONSTRAINTS 
WHERE CONSTRAINT_TYPE = 'FOREIGN KEY' 
AND TABLE_SCHEMA = 'hmedbmain';

ALTER TABLE MainInformation DROP FOREIGN KEY FK_MainInformation_PropertyDetails;

DROP TABLE ApartmentBuildings 

CREATE TABLE ApartmentBuildings (
    buildingID INT UNSIGNED,
    buildingOverview TEXT,
    isStudentHousing TINYINT,
    isSeniorHousing TINYINT,
    hasSharedLaundry TINYINT,
    hasPatioBalcony TINYINT,
    hasSwimmingPool TINYINT,
    no_pets TINYINT,
    cats TINYINT,
    LargeDogs TINYINT,
    SmallDogs TINYINT,
    BusinessCenter TINYINT,
    FitnessCenter TINYINT,
    Lounge TINYINT,
    Theater TINYINT,
    GameRoom TINYINT,
    Clubhouse TINYINT,
    Library TINYINT,
    ConferenceRoom TINYINT,
    PetWashingStation TINYINT,
    PartyRoom TINYINT,
    CableTVReady TINYINT,
    Dishwasher TINYINT,
    Carpet TINYINT,
    GarbageDisposal TINYINT,
    AirConditioning TINYINT,
    WasherDryer TINYINT,
    TileFlooring TINYINT,
    Refrigerator TINYINT,
    BuildingWideWireless TINYINT,
    HardwoodFlooring TINYINT,
    Oven TINYINT,
    HighSpeedInternet TINYINT,
    PatioAndBalcony TINYINT,
    LaminateFlooring TINYINT,
    MicrowaveOven TINYINT,
    CeilingFan TINYINT,
    VinylFlooring TINYINT,
    FurnishedUnits TINYINT,
    CityView TINYINT,
    ACCentral TINYINT,
    ACWindow TINYINT,
    SlateFlooring TINYINT,
    CityParkView TINYINT,
    ConvectionOven TINYINT,
    WasherAndDryerHookups TINYINT,
    HeatingElectric TINYINT,
    RefrigeratorAndfreezer TINYINT,
    ACWall TINYINT,
    ParkView TINYINT,
    GasHeating TINYINT,
    TrashCompactor TINYINT,
    WaterView TINYINT
);

ALTER TABLE ApartmentBuildings MODIFY buildingID INT UNSIGNED;

DROP TABLE PriceHistory
CREATE TABLE PriceHistory (
    priceHistoryID INT,
    change_0_date DATE,
    change_0_priceChangeRate FLOAT,
    change_0_postingIsRental VARCHAR(5),
    change_0_time BIGINT,
    change_0_event VARCHAR(255),
    change_0_price INT,
    change_1_date DATE,
    change_1_priceChangeRate FLOAT,
    change_1_postingIsRental VARCHAR(5),
    change_1_time BIGINT,
    change_1_event VARCHAR(255),
    change_1_price INT,
    change_2_date DATE,
    change_2_priceChangeRate FLOAT,
    change_2_postingIsRental VARCHAR(5),
    change_2_time BIGINT,
    change_2_event VARCHAR(255),
    change_2_price INT,
    change_3_date DATE,
    change_3_priceChangeRate FLOAT,
    change_3_postingIsRental VARCHAR(5),
    change_3_time BIGINT,
    change_3_event VARCHAR(255),
    change_3_price INT,
    change_4_date DATE,
    change_4_priceChangeRate FLOAT,
    change_4_postingIsRental VARCHAR(5),
    change_4_time BIGINT,
    change_4_event VARCHAR(255),
    change_4_price INT,
    change_5_date DATE,
    change_5_priceChangeRate FLOAT,
    change_5_postingIsRental VARCHAR(5),
    change_5_time BIGINT,
    change_5_event VARCHAR(255),
    change_5_price INT,
    change_6_date DATE,
    change_6_priceChangeRate FLOAT,
    change_6_postingIsRental VARCHAR(5),
    change_6_time BIGINT,
    change_6_event VARCHAR(255),
    change_6_price INT,
    change_7_date DATE,
    change_7_priceChangeRate FLOAT,
    change_7_postingIsRental VARCHAR(5),
    change_7_time BIGINT,
    change_7_event VARCHAR(255),
    change_7_price INT,
    change_8_date DATE,
    change_8_priceChangeRate FLOAT,
    change_8_postingIsRental VARCHAR(5),
    change_8_time BIGINT,
    change_8_event VARCHAR(255),
    change_8_price INT,
    change_9_date DATE,
    change_9_priceChangeRate FLOAT,
    change_9_postingIsRental VARCHAR(5),
    change_9_time BIGINT,
    change_9_event VARCHAR(255),
    change_9_price INT,
    change_10_date DATE,
    change_10_priceChangeRate FLOAT,
    change_10_postingIsRental VARCHAR(5),
    change_10_time BIGINT,
    change_10_event VARCHAR(255),
    change_10_price INT,
    change_11_date DATE,
    change_11_priceChangeRate FLOAT,
    change_11_postingIsRental VARCHAR(5),
    change_11_time BIGINT,
    change_11_event VARCHAR(255),
    change_11_price INT,
    change_12_date DATE,
    change_12_priceChangeRate FLOAT,
    change_12_postingIsRental VARCHAR(5),
    change_12_time BIGINT,
    change_12_event VARCHAR(255),
    change_12_price INT,
    change_13_date DATE,
    change_13_priceChangeRate FLOAT,
    change_13_postingIsRental VARCHAR(5),
    change_13_time BIGINT,
    change_13_event VARCHAR(255),
    change_13_price INT,
    change_14_date DATE,
    change_14_priceChangeRate FLOAT,
    change_14_postingIsRental VARCHAR(5),
    change_14_time BIGINT,
    change_14_event VARCHAR(255),
    change_14_price INT,
    change_15_date DATE,
    change_15_priceChangeRate FLOAT,
    change_15_postingIsRental VARCHAR(5),
    change_15_time BIGINT,
    change_15_event VARCHAR(255),
    change_15_price INT,
    change_16_date DATE,
    change_16_priceChangeRate FLOAT,
    change_16_postingIsRental VARCHAR(5),
    change_16_time BIGINT,
    change_16_event VARCHAR(255),
    change_16_price INT,
    change_17_date DATE,
    change_17_priceChangeRate FLOAT,
    change_17_postingIsRental VARCHAR(5),
    change_17_time BIGINT,
    change_17_event VARCHAR(255),
    change_17_price INT,
    change_18_date DATE,
    change_18_priceChangeRate FLOAT,
    change_18_postingIsRental VARCHAR(5),
    change_18_time BIGINT,
    change_18_event VARCHAR(255),
    change_18_price INT,
    change_19_date DATE,
    change_19_priceChangeRate FLOAT,
    change_19_postingIsRental VARCHAR(5),
    change_19_time BIGINT,
    change_19_event VARCHAR(255),
    change_19_price INT,
    change_20_date DATE,
    change_20_priceChangeRate FLOAT,
    change_20_postingIsRental VARCHAR(5),
    change_20_time BIGINT,
    change_20_event VARCHAR(255),
    change_20_price INT,
    change_21_date DATE,
    change_21_priceChangeRate FLOAT,
    change_21_postingIsRental VARCHAR(5),
    change_21_time BIGINT,
    change_21_event VARCHAR(255),
    change_21_price INT,
    change_22_date DATE,
    change_22_priceChangeRate FLOAT,
    change_22_postingIsRental VARCHAR(5),
    change_22_time BIGINT,
    change_22_event VARCHAR(255),
    change_22_price INT,
    change_23_date DATE,
    change_23_priceChangeRate FLOAT,
    change_23_postingIsRental VARCHAR(5),
    change_23_time BIGINT,
    change_23_event VARCHAR(255),
    change_23_price INT,
    change_24_date DATE,
    change_24_priceChangeRate FLOAT,
    change_24_postingIsRental VARCHAR(5),
    change_24_time BIGINT,
    change_24_event VARCHAR(255),
    change_24_price INT,
    change_25_date DATE,
    change_25_priceChangeRate FLOAT,
    change_25_postingIsRental VARCHAR(5),
    change_25_time BIGINT,
    change_25_event VARCHAR(255),
    change_25_price INT,
    change_26_date DATE,
    change_26_priceChangeRate FLOAT,
    change_26_postingIsRental VARCHAR(5),
    change_26_time BIGINT,
    change_26_event VARCHAR(255),
    change_26_price INT,
    change_27_date DATE,
    change_27_priceChangeRate FLOAT,
    change_27_postingIsRental VARCHAR(5),
    change_27_time BIGINT,
    change_27_event VARCHAR(255),
    change_27_price INT,
    change_28_date DATE,
    change_28_priceChangeRate FLOAT,
    change_28_postingIsRental VARCHAR(5),
    change_28_time BIGINT,
    change_28_event VARCHAR(255),
    change_28_price INT,
    change_29_date DATE,
    change_29_priceChangeRate FLOAT,
    change_29_postingIsRental VARCHAR(5),
    change_29_time BIGINT,
    change_29_event VARCHAR(255),
    change_29_price INT,
    
    PRIMARY KEY (priceHistoryID)
);

# CHECK TABLE COLUMNS AND KEYS

DESCRIBE property_details_extra;
DESCRIBE images;
DESCRIBE fees;
DESCRIBE Unit;
DESCRIBE Schools;
DESCRIBE PropertyDetails;
DESCRIBE PriceHistory;
DESCRIBE ApartmentBuildings;
DESCRIBE Addresses;

ALTER TABLE PropertyDetails ADD PRIMARY KEY (propertyDetailsID);
ALTER TABLE ApartmentBuildings ADD PRIMARY KEY (buildingID);

DROP TABLE MainInformation 

CREATE TABLE MainInformation (
    propertyID INT,
    unitID INT,
    propertyDetailsID INT,
    priceHistoryID INT,
    feeID INT,
    addressID INT,
    schoolID INT,
    buildingID INT UNSIGNED,
    overview TEXT,
    price INT,
    bathrooms INT,
    bathroomsHalf INT,
    bathroomsFull INT,
    bedrooms INT,
    livingArea VARCHAR(255),
    homeType VARCHAR(255),
    homeStatus VARCHAR(255),
    datePosted DATE,
    rentEstimate INT,
    availableFrom DATETIME,
    availableNow TINYINT,
    
    PRIMARY KEY (propertyID),	
    
    FOREIGN KEY (unitID) REFERENCES Unit(unitID),
    FOREIGN KEY (addressID) REFERENCES Addresses(addressID),
    FOREIGN KEY (propertyDetailsID) REFERENCES PropertyDetails(propertyDetailsID),
    FOREIGN KEY (feeID) REFERENCES fees(feeID),
    FOREIGN KEY (priceHistoryID) REFERENCES PriceHistory(priceHistoryID),
    FOREIGN KEY (schoolID) REFERENCES Schools(schoolID),
    FOREIGN KEY (buildingID) REFERENCES ApartmentBuildings(buildingID)
);

DESCRIBE MainInformation 

SELECT * FROM MainInformation u 

ALTER TABLE MainInformation DROP FOREIGN KEY MainInformation_ibfk_4;
ALTER TABLE MainInformation DROP FOREIGN KEY MainInformation_ibfk_5;

DROP TABLE Addresses 

CREATE TABLE Addresses (
    addressID INT,
    geoLocation POINT,
    postingGroupName VARCHAR(255),
    agentName VARCHAR(255),
    buildingName VARCHAR(255),
    city VARCHAR(255),
    state CHAR(2),
    streetAddress VARCHAR(255),
    zipcode VARCHAR(10),
    cityRegion VARCHAR(25),
    stateId INT,
    cityId INT,
    country VARCHAR(255),
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (addressID)
);

DESCRIBE Addresses

SELECT * FROM Addresses a 

# delete row that is messing everything up, due to missing point information 
DELETE FROM MainInformation WHERE propertyID = 2092929664;
DELETE FROM MainInformation WHERE propertyID = 2057533173;
DELETE FROM MainInformation WHERE propertyID = 36439421;
DELETE FROM Schools WHERE schoolID  = 304;
DELETE FROM Schools WHERE schoolID  = 381;
DELETE FROM Schools WHERE schoolID  = 441;
DELETE FROM PriceHistory Where priceHistoryID = 2113;
DELETE FROM fees Where feeID  = 2113;
DELETE FROM Unit Where unitID = 2113;
DELETE FROM PropertyDetails Where propertyDetailsID = 2113;
DELETE FROM PriceHistory Where priceHistoryID = 2286;
DELETE FROM fees Where feeID  = 2286;
DELETE FROM Unit Where unitID = 2286;
DELETE FROM PropertyDetails Where propertyDetailsID = 2286;
DELETE FROM PriceHistory Where priceHistoryID = 2207;
DELETE FROM fees Where feeID  = 2207;
DELETE FROM Unit Where unitID = 2207;
DELETE FROM PropertyDetails Where propertyDetailsID = 2207;
DELETE FROM images  WHERE propertyID = 2092929664;
DELETE FROM images  WHERE propertyID = 2057533173;
DELETE FROM images  WHERE propertyID = 36439421;
DELETE FROM property_details_extra  WHERE propertyID = 2092929664;
DELETE FROM property_details_extra  WHERE propertyID = 2057533173;
DELETE FROM property_details_extra  WHERE propertyID = 36439421;

DESCRIBE fees
DESCRIBE Addresses 
DESCRIBE ApartmentBuildings 
DESCRIBE MainInformation 
DESCRIBE PriceHistory 
DESCRIBE PropertyDetails 
DESCRIBE Schools 
DESCRIBE Unit 
DESCRIBE images 
DESCRIBE property_details_extra 

SELECT * FROM Schools 

DESCRIBE Addresses 

#need to create a neighbourhood mapping table

SELECT * FROM Addresses a 

DROP TABLE Neighbourhoods

CREATE TABLE Neighbourhoods (
    neighbourhoodID INT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (neighbourhoodID)
);

SELECT * FROM Neighbourhoods n 

DESCRIBE Neighbourhoods 

# now need to alter addresses table so that it has a foreign key that references the neighbourhoodID
ALTER TABLE Addresses ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

SELECT * FROM Addresses a 

# now update both of these tables so that their neighbourhoodID columns have the correct values in them
UPDATE Addresses AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

DESCRIBE Neighbourhoods  
DESCRIBE Addresses 

# Next let's create a table for banks

DROP TABLE Banks 

CREATE TABLE Banks (
	bankID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (bankID)
);

# add neighbourhoodID column to banks
ALTER TABLE Banks ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

SELECT * FROM Banks

# update the column 

UPDATE Banks AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

# NIGHT CLUBS

DROP TABLE NightClubs 

CREATE TABLE NightClubs (
	nightClubID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (nightClubID)
);

ALTER TABLE NightClubs ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE NightClubs AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM NightClubs

# BARS

DROP TABLE Bars 

CREATE TABLE Bars (
	barID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (barID)
);

ALTER TABLE Bars ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE Bars AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM Bars

# BEAUTY

DROP TABLE BeautySalons 

CREATE TABLE BeautySalons (
	beautyID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (beautyID)
);

ALTER TABLE BeautySalons ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE BeautySalons AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM BeautySalons

# BUS STATIONS

DROP TABLE BusStations 

CREATE TABLE BusStations (
	busStationID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (busStationID)
);

ALTER TABLE BusStations ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE BusStations AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM BusStations

# CAFES

DROP TABLE Cafes 

CREATE TABLE Cafes (
	cafeID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (cafeID)
);

ALTER TABLE Cafes ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE Cafes AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM Cafes

# FIRE STATIONS

DROP TABLE FireStations 

CREATE TABLE FireStations (
	fireStationID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (fireStationID)
);

ALTER TABLE FireStations ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE FireStations AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM FireStations

# GYMS

DROP TABLE Gyms 

CREATE TABLE Gyms (
	gymID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (gymID)
);

ALTER TABLE Gyms ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE Gyms AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM Gyms

# HOSPITALS

DROP TABLE Hospitals

CREATE TABLE Hospitals (
	hospitalID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (hospitalID)
);

ALTER TABLE Hospitals ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE Hospitals AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM Hospitals

# PARKS

DROP TABLE Parks

CREATE TABLE Parks (
	parkID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (parkID)
);

ALTER TABLE Parks ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE Parks AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM Parks

# PHARMACIES

DROP TABLE Pharmacies 

CREATE TABLE Pharmacies (
	pharmacyID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (pharmacyID)
);

ALTER TABLE Pharmacies ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE Pharmacies AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM Pharmacies

# POLICE STATION

Drop Table PoliceStations 

CREATE TABLE PoliceStations (
	policeStationID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (policeStationID)
);

ALTER TABLE PoliceStations ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE PoliceStations AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM PoliceStations

# RESTAURANTS

DROP table Restaurants 

CREATE TABLE Restaurants (
	restaurantID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (restaurantID)
);

ALTER TABLE Restaurants ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE Restaurants AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM Restaurants

# SUPERMARKETS

Drop Table Supermarkets 

CREATE TABLE Supermarkets (
	supermarketID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (supermarketID)
);

ALTER TABLE Supermarkets ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE Supermarkets AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM Supermarkets

# TRAIN STATIONS

Drop table Trainstations 

CREATE TABLE Trainstations (
	trainStationID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (trainStationID)
);

ALTER TABLE Trainstations ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE Trainstations AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM Trainstations

# TRANSIT STATIONS

Drop table TransitStations 

CREATE TABLE TransitStations (
	transitStationID INT AUTO_INCREMENT,
    place_id VARCHAR(255),
    geoLocation POINT,
    neighbourhoodGeoLocation POINT,
    
    PRIMARY KEY (transitStationID)
);

ALTER TABLE TransitStations ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE TransitStations AS a JOIN Neighbourhoods AS n ON a.neighbourhoodGeoLocation = n.neighbourhoodGeoLocation SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM TransitStations

SELECT * FROM Addresses a  

SELECT * FROM user a 

CREATE TABLE






