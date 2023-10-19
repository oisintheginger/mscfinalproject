CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    zpid BIGINT,
    geoLocation VARCHAR(50),
    overview TEXT,
    price DECIMAL(10, 2),
    bathrooms INT,
    bathroomsHalf INT,
    bathroomsFull INT,
    bedrooms INT,
    livingArea VARCHAR(50),
    stories INT,
    yearBuilt INT,
    homeType VARCHAR(50),
    homeStatus VARCHAR(50),
    datePosted DATE,
    rentEstimate DECIMAL(10, 2),
    availableFrom DATETIME
);


CREATE TABLE property_details(
    detail_id INT AUTO_INCREMENT PRIMARY KEY,   -- An identifier for this details table
    zpid BIGINT,
    geoLocation VARCHAR(50),
    buildingId BIGINT,
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
    neighbourhoodGeoLocation VARCHAR(50),
    unit VARCHAR(100),
    FOREIGN KEY (zpid) REFERENCES properties(zpid)   -- Foreign key reference to the properties table
);


CREATE TABLE price_history(
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    zpid BIGINT,
    change_date DATE,
    priceChangeRate DECIMAL(10, 2),
    postingIsRental BOOLEAN,
    change_time BIGINT,
    event VARCHAR(255),
    price DECIMAL(10, 2),
    FOREIGN KEY (zpid) REFERENCES properties(zpid)
);
