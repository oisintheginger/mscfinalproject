
CREATE TABLE Unit (
    unitID INT PRIMARY KEY,
    unitName VARCHAR(255),
    unitNumber VARCHAR(255)
);


CREATE TABLE Schools (
    schoolID INT PRIMARY KEY,
    school_0_name VARCHAR(255),
    school_0_rating INT,
    school_0_distance FLOAT,
    school_0_link VARCHAR(255),
    school_0_level VARCHAR(255),
    school_0_grades VARCHAR(255),
    school_0_type VARCHAR(255),
    school_1_name VARCHAR(255),
    school_1_rating INT,
    school_1_distance FLOAT,
    school_1_link VARCHAR(255),
    school_1_level VARCHAR(255),
    school_1_grades VARCHAR(255),
    school_1_type VARCHAR(255),
    school_2_name VARCHAR(255),
    school_2_rating INT,
    school_2_distance FLOAT,
    school_2_link VARCHAR(255),
    school_2_level VARCHAR(255),
    school_2_grades VARCHAR(255),
    school_2_type VARCHAR(255)
);

CREATE TABLE property_details (
    propertyDetailsID INT PRIMARY KEY,
    yearBuilt INT,
    Cooling VARCHAR(255),
    Heating VARCHAR(255),
    Pets VARCHAR(255),
    Parking VARCHAR(255),
    Dishwasher BOOLEAN,
    garbageDisposal BOOLEAN,
    Dryer BOOLEAN,
    Refrigerator BOOLEAN,
    Microwave BOOLEAN,
    Oven BOOLEAN,
    Freezer BOOLEAN,
    Washer BOOLEAN,
    Stove BOOLEAN,
    TrashCompactor BOOLEAN,
    NearPublicTransit BOOLEAN,
    LaundryFeaturesInUnit BOOLEAN,
    Playground BOOLEAN,
    OnSiteLaundryAvailable BOOLEAN,
    CableAvailable BOOLEAN,
    FitnessCenter BOOLEAN,
    Gated BOOLEAN,
    Pool BOOLEAN,
    Patio BOOLEAN,
    LaundryFeaturesShared BOOLEAN,
    WindowCoverings BOOLEAN,
    Gas BOOLEAN,
    Clubhouse BOOLEAN,
    Water BOOLEAN,
    Sewage BOOLEAN,
    HasGarbageBin BOOLEAN,
    Porch BOOLEAN,
    Deck BOOLEAN,
    Skylights BOOLEAN,
    LaundryFeaturesNone BOOLEAN,
    LaundryFeaturesHookups BOOLEAN,
    DoublePaneWindows BOOLEAN,
    Sauna BOOLEAN,
    stories INT
);

CREATE TABLE property_details_extra (
    propExtID INT PRIMARY KEY,
    propertyFeature VARCHAR(255),
    propertyID INT
);


CREATE TABLE images (
    imageID INT PRIMARY KEY,
    propertyURL VARCHAR(512),
    propertyID INT
);


CREATE TABLE fees (
    feeID INT PRIMARY KEY,
    deposit_fee DECIMAL(10, 2),
    pet_fee DECIMAL(10, 2),
    application_fee DECIMAL(10, 2),
    administrative_fee DECIMAL(10, 2),
    pet_deposit_fee DECIMAL(10, 2)
);

CREATE TABLE ApartmentBuildings (
    buildingID INT PRIMARY KEY,
    buildingOverview TEXT,
    isStudentHousing BOOLEAN,
    isSeniorHousing BOOLEAN,
    hasSharedLaundry BOOLEAN,
    hasPatioBalcony BOOLEAN,
    hasSwimmingPool BOOLEAN,
    no_pets BOOLEAN,
    cats BOOLEAN,
    LargeDogs BOOLEAN,
    SmallDogs BOOLEAN,
    BusinessCenter BOOLEAN,
    FitnessCenter BOOLEAN,
    Lounge BOOLEAN,
    Theater BOOLEAN,
    GameRoom BOOLEAN,
    Clubhouse BOOLEAN,
    Library BOOLEAN,
    ConferenceRoom BOOLEAN,
    PetWashingStation BOOLEAN,
    PartyRoom BOOLEAN,
    CableTVReady BOOLEAN,
    Dishwasher BOOLEAN,
    Carpet BOOLEAN,
    GarbageDisposal BOOLEAN,
    AirConditioning BOOLEAN,
    WasherDryer BOOLEAN,
    TileFlooring BOOLEAN,
    Refrigerator BOOLEAN,
    BuildingWideWireless BOOLEAN,
    HardwoodFlooring BOOLEAN,
    Oven BOOLEAN,
    HighSpeedInternetReady BOOLEAN,
    PatioBalcony BOOLEAN,
    LaminateFlooring BOOLEAN,
    MicrowaveOven BOOLEAN,
    `Range` BOOLEAN,
    CeilingFan BOOLEAN,
    VinylFlooring BOOLEAN,
    FurnishedUnits BOOLEAN,
    CityView BOOLEAN,
    ACCentral BOOLEAN,
    ACWindow BOOLEAN,
    SlateFlooring BOOLEAN,
    CityParkView BOOLEAN,
    ConvectionOven BOOLEAN,
    WasherDryerHookups BOOLEAN,
    HeatingElectric BOOLEAN,
    RefrigeratorFreezer BOOLEAN,
    ACWall BOOLEAN,
    ParkView BOOLEAN,
    HeatingGas BOOLEAN,
    TrashCompactor BOOLEAN,
    WaterView BOOLEAN
);

CREATE TABLE Addresses (
    addressID INT PRIMARY KEY,
    geoLocation POINT,
    postingGroupName VARCHAR(255),
    agentName VARCHAR(255),
    buildingName VARCHAR(255),
    city VARCHAR(255),
    state CHAR(2),
    streetAddress VARCHAR(255),
    zipcode VARCHAR(10),
    cityRegion VARCHAR(255),
    stateId INT,
    cityId INT,
    country VARCHAR(50),
    neighbourhoodGeoLocation POINT
);


CREATE TABLE PriceHistory (
    zpid INT PRIMARY KEY,
    change_0_date DATE,
    change_0_priceChangeRate FLOAT,
    change_0_postingIsRental BOOLEAN,
    change_0_time BIGINT,
    change_0_event VARCHAR(50),
    change_0_price DECIMAL(10, 2),
    -- Repeat for each change_#_ element...
    
    change_1_date DATE,
    change_1_priceChangeRate FLOAT,
    change_1_postingIsRental BOOLEAN,
    change_1_time BIGINT,
    change_1_event VARCHAR(50),
    change_1_price DECIMAL(10, 2),
    
    
    change_2_date DATE,
    change_2_priceChangeRate FLOAT,
    change_2_postingIsRental BOOLEAN,
    change_2_time BIGINT,
    change_2_event VARCHAR(50),
    change_2_price DECIMAL(10, 2),
    
    change_3_date DATE,
    change_3_priceChangeRate FLOAT,
    change_3_postingIsRental BOOLEAN,
    change_3_time BIGINT,
    change_3_event VARCHAR(50),
    change_3_price DECIMAL(10, 2),
    
    change_4_date DATE,
    change_4_priceChangeRate FLOAT,
    change_4_postingIsRental BOOLEAN,
    change_4_time BIGINT,
    change_4_event VARCHAR(50),
    change_4_price DECIMAL(10, 2),
    
    change_5_date DATE,
    change_5_priceChangeRate FLOAT,
    change_5_postingIsRental BOOLEAN,
    change_5_time BIGINT,
    change_5_event VARCHAR(50),
    change_5_price DECIMAL(10, 2),
    
    change_6_date DATE,
    change_6_priceChangeRate FLOAT,
    change_6_postingIsRental BOOLEAN,
    change_6_time BIGINT,
    change_6_event VARCHAR(50),
    change_6_price DECIMAL(10, 2),
    
    change_7_date DATE,
	change_7_priceChangeRate FLOAT,
	change_7_postingIsRental BOOLEAN,
	change_7_time BIGINT,
	change_7_event VARCHAR(50),
	change_7_price DECIMAL(10, 2),

	change_8_date DATE,
	change_8_priceChangeRate FLOAT,
	change_8_postingIsRental BOOLEAN,
	change_8_time BIGINT,
	change_8_event VARCHAR(50),	
	change_8_price DECIMAL(10, 2),
	
	change_9_date DATE,
    change_9_priceChangeRate FLOAT,
    change_9_postingIsRental BOOLEAN,
    change_9_time BIGINT,
    change_9_event VARCHAR(50),
    change_9_price DECIMAL(10, 2),
    
    change_10_date DATE,
    change_10_priceChangeRate FLOAT,
    change_10_postingIsRental BOOLEAN,
    change_10_time BIGINT,
    change_10_event VARCHAR(50),
    change_10_price DECIMAL(10, 2),
    
    change_11_date DATE,
	change_11_priceChangeRate FLOAT,
	change_11_postingIsRental BOOLEAN,
	change_11_time BIGINT,
	change_11_event VARCHAR(50),
	change_11_price DECIMAL(10, 2),

	change_12_date DATE,
	change_12_priceChangeRate FLOAT,
	change_12_postingIsRental BOOLEAN,
	change_12_time BIGINT,
	change_12_event VARCHAR(50),	
	change_12_price DECIMAL(10, 2),

	change_13_date DATE,
    change_13_priceChangeRate FLOAT,
    change_13_postingIsRental BOOLEAN,
    change_13_time BIGINT,
    change_13_event VARCHAR(50),
    change_13_price DECIMAL(10, 2),
    
    change_14_date DATE,
    change_14_priceChangeRate FLOAT,
    change_14_postingIsRental BOOLEAN,
    change_14_time BIGINT,
    change_14_event VARCHAR(50),
    change_14_price DECIMAL(10, 2),
    
    change_15_date DATE,
	change_15_priceChangeRate FLOAT,
	change_15_postingIsRental BOOLEAN,
	change_15_time BIGINT,
	change_15_event VARCHAR(50),
	change_15_price DECIMAL(10, 2),

	change_16_date DATE,
	change_16_priceChangeRate FLOAT,
	change_16_postingIsRental BOOLEAN,
	change_16_time BIGINT,
	change_16_event VARCHAR(50),	
	change_16_price DECIMAL(10, 2),
	
	change_17_date DATE,
    change_17_priceChangeRate FLOAT,
    change_17_postingIsRental BOOLEAN,
    change_17_time BIGINT,
    change_17_event VARCHAR(50),
    change_17_price DECIMAL(10, 2),
    
    change_18_date DATE,
    change_18_priceChangeRate FLOAT,
    change_18_postingIsRental BOOLEAN,
    change_18_time BIGINT,
    change_18_event VARCHAR(50),
    change_18_price DECIMAL(10, 2),
    
    change_19_date DATE,
	change_19_priceChangeRate FLOAT,
	change_19_postingIsRental BOOLEAN,
	change_19_time BIGINT,
	change_19_event VARCHAR(50),
	change_19_price DECIMAL(10, 2),

	change_20_date DATE,
	change_20_priceChangeRate FLOAT,
	change_20_postingIsRental BOOLEAN,
	change_20_time BIGINT,
	change_20_event VARCHAR(50),	
	change_20_price DECIMAL(10, 2),
	
	change_21_date DATE,
	change_21_priceChangeRate FLOAT,
	change_21_postingIsRental BOOLEAN,
	change_21_time BIGINT,
	change_21_event VARCHAR(50),	
	change_21_price DECIMAL(10, 2),
	
	change_22_date DATE,
	change_22_priceChangeRate FLOAT,
	change_22_postingIsRental BOOLEAN,
	change_22_time BIGINT,
	change_22_event VARCHAR(50),	
	change_22_price DECIMAL(10, 2),
	
	change_23_date DATE,
	change_23_priceChangeRate FLOAT,
	change_23_postingIsRental BOOLEAN,
	change_23_time BIGINT,
	change_23_event VARCHAR(50),
	change_23_price DECIMAL(10, 2),

	change_24_date DATE,
	change_24_priceChangeRate FLOAT,
	change_24_postingIsRental BOOLEAN,
	change_24_time BIGINT,
	change_24_event VARCHAR(50),	
	change_24_price DECIMAL(10, 2),
	
	change_25_date DATE,
	change_25_priceChangeRate FLOAT,
	change_25_postingIsRental BOOLEAN,
	change_25_time BIGINT,
	change_25_event VARCHAR(50),	
	change_25_price DECIMAL(10, 2),
	
	change_26_date DATE,
	change_26_priceChangeRate FLOAT,
	change_26_postingIsRental BOOLEAN,
	change_26_time BIGINT,
	change_26_event VARCHAR(50),	
	change_26_price DECIMAL(10, 2),
	
	change_27_date DATE,
	change_27_priceChangeRate FLOAT,
	change_27_postingIsRental BOOLEAN,
	change_27_time BIGINT,
	change_27_event VARCHAR(50),	
	change_27_price DECIMAL(10, 2),
	
	change_28_date DATE,
	change_28_priceChangeRate FLOAT,
	change_28_postingIsRental BOOLEAN,
	change_28_time BIGINT,
	change_28_event VARCHAR(50),	
	change_28_price DECIMAL(10, 2),
    
    
    
    change_29_date DATE,
    change_29_priceChangeRate FLOAT,
    change_29_postingIsRental BOOLEAN,
    change_29_time BIGINT,
    change_29_event VARCHAR(50),
    change_29_price DECIMAL(10, 2)
    -- If you have more than 30 price changes, add additional columns here
);

CREATE TABLE MainInformation (
    propertyID INT PRIMARY KEY,
    unitID INT,
    propertyDetailsID INT,
    priceHistoryID INT,
    feeID INT,
    addressID INT,
    schoolID INT,
    buildingID INT,
    overview TEXT,
    price DECIMAL(10, 2),
    bathrooms INT,
    bathroomsHalf INT,
    bathroomsFull INT,
    bedrooms INT,
    livingArea VARCHAR(50),
    homeType VARCHAR(50),
    homeStatus VARCHAR(50),
    datePosted DATE,
    rentEstimate DECIMAL(10, 2),
    availableFrom DATETIME,
    availableNow BOOLEAN
);

-- Alter 'MainInformation' to add foreign keys
ALTER TABLE MainInformation
ADD CONSTRAINT FK_MainInformation_Unit
    FOREIGN KEY (unitID) REFERENCES Unit(unitID),
ADD CONSTRAINT FK_MainInformation_PropertyDetails
    FOREIGN KEY (propertyDetailsID) REFERENCES property_details(propertyDetailsID),
ADD CONSTRAINT FK_MainInformation_PriceHistory
    FOREIGN KEY (priceHistoryID) REFERENCES PriceHistory(zpid),
ADD CONSTRAINT FK_MainInformation_Fee
    FOREIGN KEY (feeID) REFERENCES fees(feeID),
ADD CONSTRAINT FK_MainInformation_Address
    FOREIGN KEY (addressID) REFERENCES Addresses(addressID),
ADD CONSTRAINT FK_MainInformation_School
    FOREIGN KEY (schoolID) REFERENCES Schools(schoolID),
ADD CONSTRAINT FK_MainInformation_Building
    FOREIGN KEY (buildingID) REFERENCES ApartmentBuildings(buildingID);

-- Alter 'property_details_extra' to connect to 'property_details'
ALTER TABLE property_details_extra
ADD CONSTRAINT FK_PropertyDetailsExtra_PropertyDetails
    FOREIGN KEY (propertyID) REFERENCES property_details(propertyDetailsID);

-- Alter 'images' to connect to 'MainInformation'
ALTER TABLE images
ADD CONSTRAINT FK_Images_MainInformation
    FOREIGN KEY (propertyID) REFERENCES MainInformation(propertyID);

   
SHOW GRANTS FOR 'admin'@'46.7.63.23';

CREATE USER 'admin'@'46.7.63.23' IDENTIFIED BY 'PassCondria123';

GRANT ALL PRIVILEGES ON hmedbmain.* TO 'admin'@'46.7.63.23';
FLUSH PRIVILEGES;




SELECT * FROM mysql.general_log;

