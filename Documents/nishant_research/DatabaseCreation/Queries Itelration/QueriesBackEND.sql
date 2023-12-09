
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

SELECT 
    id,
    email,
    JSON_UNQUOTE(JSON_EXTRACT(searches, '$')) AS all_searches, -- Extracts the entire 'searches' JSON array as text
    JSON_UNQUOTE(JSON_EXTRACT(favourites, '$')) AS all_favourites, -- Extracts the entire 'favourites' JSON array as text
    weights,
    applications
FROM 
    user
WHERE 
    id = '725205ee-e24b-4430-8c15-c9d695fa519b';


   
--    ○ Get all favourites for specific user id 
   
   SELECT 
    id,
    JSON_UNQUOTE(JSON_EXTRACT(favourites, '$')) AS all_favourites
FROM 
    user
WHERE 
    id = '725205ee-e24b-4430-8c15-c9d695fa519b';

--    ○ Get all saved searches for specific user id 
   SELECT 
    id,
    JSON_UNQUOTE(JSON_EXTRACT(searches, '$')) AS all_searches
FROM 
    user
WHERE 
    id = '725205ee-e24b-4430-8c15-c9d695fa519b';

--    ○ Get all applications for specific user id 
   SELECT 
    id,
    JSON_UNQUOTE(JSON_EXTRACT(applications, '$')) AS all_applications
FROM 
    user
WHERE 
    id = '725205ee-e24b-4430-8c15-c9d695fa519b';

--     ○ Update all info for specific user id  -NOT TRIED UPDATING-
   UPDATE user
SET 
    email = 'new_email@example.com'
WHERE 
    id = '725205ee-e24b-4430-8c15-c9d695fa519b';

--    ○ Add new favourite for specific user id  -NOT TRIED-
   UPDATE user
SET 
    favourites = JSON_ARRAY_APPEND(favourites, '$', JSON_OBJECT('newFavouriteKey', 'newFavouriteValue'))
WHERE 
    id = '725205ee-e24b-4430-8c15-c9d695fa519b';

   
--    ○ Add new saved search for specific user id -NOT TRIED-
   UPDATE user
SET 
    searches = JSON_ARRAY_APPEND(searches, '$', JSON_OBJECT('newSearchKey', 'newSearchValue'))
WHERE 
    id = '725205ee-e24b-4430-8c15-c9d695fa519b';

--    ○ Add new application for specific user id  -NOT TRIED-
   UPDATE user
SET 
    applications = JSON_ARRAY_APPEND(applications, '$', JSON_OBJECT('newApplicationKey', 'newApplicationValue'))
WHERE 
    id = '725205ee-e24b-4430-8c15-c9d695fa519b';

--    ○ Delete favourite for specific user id  -This assumes you know the index of the favourite in the JSON array -NOT TRIED-


	UPDATE user
SET 
    favourites = JSON_REMOVE(favourites, '$[index_of_the_favourite_to_remove]')
WHERE 
    id = '725205ee-e24b-4430-8c15-c9d695fa519b';
   
--    ○ Delete saved searches for specific user id -NOT TRIED-
   
   UPDATE user
SET 
    searches = JSON_REMOVE(searches, '$[index_of_the_search_to_remove]')
WHERE 
    id = '725205ee-e24b-4430-8c15-c9d695fa519b';

--    ○ Add user weights for specific user id -NotTried-
   UPDATE user
SET 
    weights = JSON_ARRAY_APPEND(weights, '$', JSON_OBJECT('newWeightKey', 'newWeightValue'))
WHERE 
    id = '725205ee-e24b-4430-8c15-c9d695fa519b';

--    ○ Update user weights for specific user id -Not Tried-
   UPDATE user
SET 
    weights = JSON_SET(weights, '$[index_of_the_weight_to_update]', 'newWeightValue')
WHERE 
    id = '725205ee-e24b-4430-8c15-c9d695fa519b';

--    ○ Remove user weights for specific user id -NotTried-
   UPDATE user
SET 
    weights = JSON_REMOVE(weights, '$[index_of_the_weight_to_remove]')
WHERE 
    id = '725205ee-e24b-4430-8c15-c9d695fa519b';
