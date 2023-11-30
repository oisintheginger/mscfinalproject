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

ALTER TABLE NightClubs DROP COLUMN neighbourhoodGeoLocation

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

ALTER TABLE Bars DROP COLUMN neighbourhoodGeoLocation

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

ALTER TABLE BeautySalons DROP COLUMN neighbourhoodGeoLocation

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

ALTER TABLE BusStations DROP COLUMN neighbourhoodGeoLocation

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

ALTER TABLE Cafes DROP COLUMN neighbourhoodGeoLocation]

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

ALTER TABLE FireStations DROP COLUMN neighbourhoodGeoLocation

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

ALTER TABLE Gyms DROP COLUMN neighbourhoodGeoLocation

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

ALTER TABLE Hospitals DROP COLUMN neighbourhoodGeoLocation

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

ALTER TABLE Parks DROP COLUMN neighbourhoodGeoLocation

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

ALTER TABLE Pharmacies DROP COLUMN neighbourhoodGeoLocation

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

ALTER TABLE PoliceStations DROP COLUMN neighbourhoodGeoLocation

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

ALTER TABLE Restaurants DROP COLUMN neighbourhoodGeoLocation

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

ALTER TABLE Supermarkets DROP COLUMN neighbourhoodGeoLocation

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

ALTER TABLE Trainstations DROP COLUMN neighbourhoodGeoLocation

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

ALTER TABLE TransitStations DROP COLUMN neighbourhoodGeoLocation

#Update neighbourhoods table so crime information can be linked to it
ALTER TABLE Neighbourhoods ADD COLUMN crime_neighbourhood VARCHAR(255);

DROP TABLE temp_table 

CREATE TABLE temp_table (neighbourhoodID INT, crime_neighbourhood VARCHAR(255));

SELECT * FROM temp_table 

DESCRIBE temp_table 

UPDATE Neighbourhoods JOIN temp_table ON Neighbourhoods.neighbourhoodID = temp_table.neighbourhoodID  
SET Neighbourhoods.crime_neighbourhood = temp_table.crime_neighbourhood;

# Now upload the scoring datasets, begin with crime

DROP TABLE crime_z_scores 

CREATE TABLE crime_z_scores (
    crime_scoreID INT,
    crime_neighbourhood VARCHAR(255),
    LARCENY_FROM_AUTO_Count INT,
    LARCENY_FROM_AUTO_z_score_mapped FLOAT,
    COMMON_ASSAULT_Count INT,
    COMMON_ASSAULT_z_score_mapped FLOAT,
    AGG_ASSAULT_Count INT,
    AGG_ASSAULT_z_score_mapped FLOAT,
    AUTO_THEFT_Count INT,
    AUTO_THEFT_z_score_mapped FLOAT,
    LARCENY_Count INT,
    LARCENY_z_score_mapped FLOAT,
    BURGLARY_Count INT,
    BURGLARY_z_score_mapped FLOAT,
    ROBBERY_Count INT,
    ROBBERY_z_score_mapped FLOAT,
    RAPE_Count INT,
    RAPE_z_score_mapped FLOAT,
    HOMICIDE_Count INT,
    HOMICIDE_z_score_mapped FLOAT,
    ARSON_Count INT,
    ARSON_z_score_mapped FLOAT,
    SHOOTING_Count INT,
    SHOOTING_z_score_mapped FLOAT,
    ROBBERY_CARJACKING_Count INT,
    ROBBERY_CARJACKING_z_score_mapped FLOAT,
    ROBBERY_COMMERCIAL_Count INT,
    ROBBERY_COMMERCIAL_z_score_mapped FLOAT,
    sum_count INT,
    sum_z_scores FLOAT,
    z_scores_before_mapping FLOAT,
    mapped_values_sigmoid FLOAT,
    
    PRIMARY KEY (crime_scoreID)
);

DESCRIBE crime_z_scores

SELECT * FROM crime_z_scores czs 

ALTER TABLE crime_z_scores ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE crime_z_scores SET neighbourhoodID = crime_scoreID;

ALTER TABLE crime_z_scores DROP COLUMN crime_neighbourhood

DROP TABLE service_scores 

CREATE TABLE service_scores (
    service_score_ID INT,
    bankCount INT,
    bank_z_score FLOAT,
    barCount INT,
    bar_z_score FLOAT,
    beauty_salonCount INT,
    beauty_salon_z_score FLOAT,
    bus_stationCount INT,
    bus_station_z_score FLOAT,
    cafeCount INT,
    cafe_z_score FLOAT,
    fire_stationCount INT,
    fire_station_z_score FLOAT,
    gymCount INT,
    gym_z_score FLOAT,
    hospitalCount INT,
    hospital_z_score FLOAT,
    night_clubCount INT,
    night_club_z_score FLOAT,
    parkCount INT,
    park_z_score FLOAT,
    pharmacyCount INT,
    pharmacy_z_score FLOAT,
    police_stationCount INT,
    police_station_z_score FLOAT,
    restaurantCount INT,
    restaurant_z_score FLOAT,
    supermarketCount INT,
    supermarket_z_score FLOAT,
    train_stationCount INT,
    train_station_z_score FLOAT,
    transit_stationCount INT,
    transit_station_z_score FLOAT,
    finance_score FLOAT,
    transportation_score FLOAT,
    personal_care_score FLOAT,
    retail_score FLOAT,
    fitness_score FLOAT,
    leisure_score FLOAT,
    emergency_score FLOAT,
    sum_count INT,
    sum_z_scores FLOAT,
    overall_score FLOAT,
    
    PRIMARY KEY (service_score_ID)
);

ALTER TABLE service_scores CHANGE COLUMN overall_score mapped_values_sigmoid FLOAT;

DESCRIBE service_scores

SELECT * FROM service_scores szs 

ALTER TABLE service_scores ADD COLUMN neighbourhoodID INT, ADD FOREIGN KEY (neighbourhoodID) REFERENCES Neighbourhoods(neighbourhoodID);

UPDATE service_scores AS a JOIN Neighbourhoods AS n ON a.service_score_ID = n.neighbourhoodID  SET a.neighbourhoodID = n.neighbourhoodID;

SELECT * FROM MainInformation mi 
#####

DESCRIBE user

SELECT * FROM user u

SELECT GROUP_CONCAT(column_name) 
    FROM information_schema.columns 
    WHERE table_name = 'service_scores' 
        AND LOWER(column_name) NOT LIKE '%count%'

SELECT a.neighbourhoodID
FROM MainInformation mi
JOIN Addresses a ON mi.addressID = a.addressID
WHERE mi.propertyID = '36428890';


SELECT a.neighbourhoodID FROM MainInformation mi JOIN Addresses a ON mi.addressID = a.addressID WHERE mi.propertyID = 36429513

DROP TABLE user_interactions 

CREATE TABLE user_interactions (
    user_interaction_id INT AUTO_INCREMENT, 
    propertyID INT NOT NULL,
    id varchar(36) NOT NULL,
    click_count INT NOT NULL,
    
    PRIMARY KEY (user_interaction_id)
);

ALTER TABLE user_interactions
ADD CONSTRAINT fk_user_interactions_user
FOREIGN KEY (id) REFERENCES user(id);

INSERT INTO user_interactions (propertyID, id, click_count)
SELECT
    mi.propertyID,
    u.id AS id,  -- Assuming 'id' is the column in the users table that you want to use as user_id
    0 AS click_count -- Assuming an initial click count of 0 for existing users
FROM
    user u
CROSS JOIN
    MainInformation mi
ORDER BY
    u.id;  -- Order by user ID

SELECT * FROM MainInformation mi;

SELECT * FROM Addresses a;

SELECT * FROM crime_z_scores czs

SELECT * FROM service_scores ss 

DESCRIBE user_interactions

SELECT COUNT(*) AS row_count FROM PropertyDetails pd ;

SELECT 
    mi.bathrooms, 
    mi.bathroomsFull, mi.bathroomsHalf, mi.bedrooms,
    mi.price,
    mi.propertyID,
    pd.CableAvailable, pd.Clubhouse, pd.Cooling, pd.Deck, pd.Dishwasher, 
    pd.DoublePaneWindows, pd.Dryer, pd.FitnessCenter, pd.Freezer, 
    pd.garbageDisposal, pd.Gas, pd.Gated, pd.HasGarbageBin, pd.Heating, 
    pd.LaundryFeaturesHookups, pd.LaundryFeaturesInUnit, pd.LaundryFeaturesNone, 
    pd.LaundryFeaturesShared, pd.Microwave, pd.NearPublicTransit, 
    pd.OnSiteLaundryAvailable, pd.Oven, pd.Parking, pd.Patio, pd.Pets, 
    pd.Playground, pd.Pool, pd.Porch, pd.Refrigerator, 
    pd.Sauna, pd.Sewage, pd.Skylights, pd.Stove, pd.TrashCompactor, 
    pd.Washer, pd.Water, pd.WindowCoverings,
    cz.AGG_ASSAULT_Count, cz.ARSON_Count, cz.AUTO_THEFT_Count, 
    cz.BURGLARY_Count, cz.COMMON_ASSAULT_Count,
    cz.HOMICIDE_Count, cz.LARCENY_Count, cz.LARCENY_FROM_AUTO_Count, 
    cz.RAPE_Count, cz.ROBBERY_CARJACKING_Count, cz.ROBBERY_COMMERCIAL_Count, 
    cz.ROBBERY_Count, cz.SHOOTING_Count,
    ss.bankCount, ss.barCount, ss.beauty_salonCount, ss.bus_stationCount,
    ss.cafeCount, ss.fire_stationCount, ss.gymCount, ss.hospitalCount,
    ss.night_clubCount, ss.parkCount, ss.pharmacyCount, ss.police_stationCount,
    ss.restaurantCount, ss.supermarketCount, ss.train_stationCount,
    ss.transit_stationCount
FROM 
    Addresses a
JOIN 
    MainInformation mi ON a.addressID = mi.addressID
JOIN 
    Neighbourhoods n ON a.neighbourhoodID = n.neighbourhoodID
JOIN 
    PropertyDetails pd ON mi.propertyDetailsID = pd.propertyDetailsID
JOIN 
    crime_z_scores cz ON n.neighbourhoodID = cz.neighbourhoodID
JOIN 
    service_scores ss ON n.neighbourhoodID = ss.neighbourhoodID

   
   