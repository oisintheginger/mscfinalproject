
select * from MainInformation mi 


-- SELECT ALL ART GALLERY IN THE NEIGHBORHOOD OF A PROPERTY
SELECT ag.*
FROM ArtGallerys ag
JOIN Addresses a ON ag.neighbourhoodID = a.neighbourhoodID
JOIN MainInformation mi ON a.addressID = mi.addressID
WHERE mi.propertyID = 36445154;



select * from MainInformation mi 


-- Properties
--      ○ Get all quick view properties 
--      Quick view property has the following fields:§ propertyId§ Geolocation§ Price§ Bathrooms§ Bedrooms§ Highest category scores tags§ streetAddress§ Zipcode§ Overview§ Images
SELECT 
    mi.propertyID,
    a.geoLocation,
    mi.price,
    mi.bathrooms,
    mi.bedrooms,
    a.streetAddress,
    a.zipcode,
    mi.overview,
    GROUP_CONCAT(img.propertyURL) AS Images
FROM 
    MainInformation mi
INNER JOIN 
    Addresses a ON mi.addressID = a.addressID
LEFT JOIN 
    images img ON mi.propertyID = img.propertyID
 WHERE 
     mi.availableNow = 1
GROUP BY 
    mi.propertyID;

--  select * from MainInformation
   select * from user

-- SHOW CREATE TABLE user;
--      ○ Get property details for specific propertyId 
--     Property details has the following fields:§ PropertyId§ Price§ Bedrooms§ Bathrooms§ propertyType§ streetAddress§ Zipcode§ Geolocation§ Description§ petsAllowed§ Lastupdated§ Dateposted§ Safetyscore§ servicesScore§ Images 
SELECT 
    mi.propertyID,
    mi.price,
    mi.bedrooms,
    mi.bathrooms,
    mi.homeType AS propertyType,
    a.streetAddress,
    a.zipcode,
    a.geoLocation,
    mi.overview AS Description,
    pd.Pets AS petsAllowed,
    mi.datePosted AS Dateposted,
    GROUP_CONCAT(img.propertyURL) AS Images
FROM 
    MainInformation mi
INNER JOIN 
    Addresses a ON mi.addressID = a.addressID
INNER JOIN 
    PropertyDetails pd ON mi.propertyDetailsID = pd.propertyDetailsID
LEFT JOIN 
    images img ON mi.propertyID = img.propertyID
WHERE 
    mi.propertyID = 36428890 -- Replace with the actual property ID
GROUP BY 
    mi.propertyID;
   
   -- User table 
--    ○ Get all info for specific user id
--    ○ Get all favourites for specific user id 
--    ○ Get all saved searches for specific user id 
--    ○ Get all applications for specific user id 
--     ○ Update all info for specific user id 
--    ○ Add new favourite for specific user id 
--    ○ Add new saved search for specific user id 
--    ○ Add new application for specific user id 
--    ○ Delete favourite for specific user id 
--    ○ Delete saved searches for specific user id
--    ○ Add user weights for specific user id 
--    ○ Update user weights for specific user id 
--    ○ Remove user weights for specific user id