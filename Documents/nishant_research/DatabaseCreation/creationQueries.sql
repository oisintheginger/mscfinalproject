show tables;

DROP TABLE property_school_association;
DROP TABLE mainInformation;
DROP TABLE school_data;

CREATE TABLE school_data (
    schoolID INT AUTO_INCREMENT PRIMARY KEY,
    schoolName VARCHAR(255),
    schoolRating INT,
    schoolDistance FLOAT,
    schoolLink VARCHAR(500),
    schoolLevel VARCHAR(50),
    schoolGrades VARCHAR(50),
    schoolType VARCHAR(50)
);

CREATE TABLE mainInformation (
    zpid BIGINT PRIMARY KEY,
    streetAddress VARCHAR(255),
    zipcode INT,
    city VARCHAR(100),
    state VARCHAR(50),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    price DECIMAL(20,2),
    dateSold DATE,
    bathrooms DECIMAL(3,1),
    bedrooms INT,
    livingArea INT,
    homeType VARCHAR(100),
    yearBuilt INT,
    zestimate DECIMAL(20,2),
    rentzestimate DECIMAL(20,2),
    daysOnZillow INT,
    heating VARCHAR(255),
    cooling VARCHAR(255),
    parking VARCHAR(255),
    lotSize INT,
    floors INT,
    lastUpdated DATE,
    imgURL VARCHAR(500),
    link VARCHAR(500)
);

CREATE TABLE property_school_association (
    associationID INT AUTO_INCREMENT PRIMARY KEY,
    zpid BIGINT,
    schoolID INT,
    FOREIGN KEY (zpid) REFERENCES mainInformation(zpid) ON DELETE CASCADE,
    FOREIGN KEY (schoolID) REFERENCES school_data(schoolID) ON DELETE CASCADE
);

CREATE TABLE property_images (
    imageID INT AUTO_INCREMENT PRIMARY KEY,
    zpid BIGINT,
    imageIndex INT,
    imageURL VARCHAR(500),
    FOREIGN KEY (zpid) REFERENCES mainInformation(zpid) ON DELETE CASCADE
);

CREATE TABLE property_details (
    zpid BIGINT PRIMARY KEY,
    yearBuilt INT,
    cooling VARCHAR(255),
    heating VARCHAR(255),
    pets VARCHAR(255),
    parking VARCHAR(255),
    dishwasher BOOLEAN,
    garbageDisposal BOOLEAN,
    dryer BOOLEAN,
    refrigerator BOOLEAN,
    microwave BOOLEAN,
    oven BOOLEAN,
    freezer BOOLEAN,
    washer BOOLEAN,
    stove BOOLEAN,
    trashCompactor BOOLEAN,
    nearPublicTransit BOOLEAN,
    laundryFeaturesInUnit BOOLEAN,
    playground BOOLEAN,
    onsiteLaundryAvailable BOOLEAN,
    cableAvailable BOOLEAN,
    fitnessCenter BOOLEAN,
    gated BOOLEAN,
    pool BOOLEAN,
    patio BOOLEAN,
    laundryFeaturesShared BOOLEAN,
    windowCoverings BOOLEAN,
    gas BOOLEAN,
    clubhouse BOOLEAN,
    water BOOLEAN,
    sewage BOOLEAN,
    hasGarbageBin BOOLEAN,
    porch BOOLEAN,
    deck BOOLEAN,
    skylights BOOLEAN,
    laundryFeaturesNone BOOLEAN,
    laundryFeaturesHookups BOOLEAN,
    doublePaneWindows BOOLEAN,
    sauna BOOLEAN,
    stories INT,
    FOREIGN KEY (zpid) REFERENCES mainInformation(zpid) ON DELETE CASCADE
);


CREATE TABLE property_fees (
    zpid BIGINT PRIMARY KEY,
    depositFee DECIMAL(10,2),
    petFee DECIMAL(10,2),
    applicationFee DECIMAL(10,2),
    administrativeFee DECIMAL(10,2),
    petDepositFee DECIMAL(10,2),
    hoaFee DECIMAL(10,2),
    FOREIGN KEY (zpid) REFERENCES mainInformation(zpid) ON DELETE CASCADE
);


CREATE TABLE apartment_building (
    buildingID BIGINT PRIMARY KEY,
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
    WaterView BOOLEAN,
    hasRange BOOLEAN
);

CREATE TABLE property_addresses (
    zpid BIGINT PRIMARY KEY,
    buildingID BIGINT,
    geoLocation POINT, -- This data type may vary based on your DBMS. Some databases may require separate latitude and longitude columns.
    postingGroupName VARCHAR(255),
    agentName VARCHAR(255),
    buildingName VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    streetAddress VARCHAR(255),
    zipcode VARCHAR(10), -- Zipcode can sometimes have leading zeros or dashes, so it's better as VARCHAR
    cityRegion VARCHAR(100),
    stateId INT,
    cityId INT,
    country VARCHAR(50),
    neighbourhoodGeoLocation POINT, -- Same note as geoLocation.
    FOREIGN KEY (buildingID) REFERENCES apartment_building(buildingID)
);


CREATE TABLE exterior_features (
    feature_id INT AUTO_INCREMENT PRIMARY KEY,
    feature_name VARCHAR(255) UNIQUE
);

CREATE TABLE property_exterior_features (
    associationID INT AUTO_INCREMENT PRIMARY KEY,
    zpid BIGINT,
    feature_id INT,
    FOREIGN KEY (zpid) REFERENCES mainInformation(zpid) ON DELETE CASCADE,
    FOREIGN KEY (feature_id) REFERENCES exterior_features(feature_id)
);

CREATE TABLE units (
    unitID INT AUTO_INCREMENT PRIMARY KEY,
    zpid BIGINT,
    buildingID BIGINT,
    unitName VARCHAR(255),
    unitNumber VARCHAR(50),
    FOREIGN KEY (zpid) REFERENCES mainInformation(zpid) ON DELETE CASCADE,
    FOREIGN KEY (buildingID) REFERENCES apartment_building(buildingID)
);
