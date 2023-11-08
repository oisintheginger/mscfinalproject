
select * from MainInformation mi 


-- SELECT ALL ART GALLERY IN THE NEIGHBORHOOD OF A PROPERTY
SELECT ag.*
FROM ArtGallerys ag
JOIN Addresses a ON ag.neighbourhoodID = a.neighbourhoodID
JOIN MainInformation mi ON a.addressID = mi.addressID
WHERE mi.propertyID = 36445154;



select * from MainInformation mi 