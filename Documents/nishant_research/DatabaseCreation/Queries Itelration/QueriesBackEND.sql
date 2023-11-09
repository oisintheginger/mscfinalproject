
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
    m.propertyID,
    a.geoLocation,
    m.price,
    m.bathrooms,
    m.bedrooms,
    a.streetAddress,
    a.zipcode,
    m.overview,
    i.propertyURL AS Images
FROM 
    MainInformation m
JOIN 
    Addresses a ON m.addressID = a.addressID
LEFT JOIN 
    images i ON m.propertyID = i.propertyID
-- WHERE 
--    m.homeStatus = 'available' -- Assuming you want only available properties
GROUP BY 
    m.propertyID; -- Group by property ID to avoid duplicate properties in case there are multiple images


--      ○ Get property details for specific propertyId 
--     Property details has the following fields:§ PropertyId§ Price§ Bedrooms§ Bathrooms§ propertyType§ streetAddress§ Zipcode§ Geolocation§ Description§ petsAllowed§ Lastupdated§ Dateposted§ Safetyscore§ servicesScore§ Images 
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