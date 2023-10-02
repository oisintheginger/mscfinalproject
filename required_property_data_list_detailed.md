# Property Fields + Schema
This document lists the fields that will be pulled from the Zillow API.

## Fields from the RapidAPI / Where to find information 
- Property Images - GET /images (Property images and videos)
- Price - GET/building (Building details)
- Overview - GET/property (Property details)/description
- tags (further discussion needed)
- address - - GET/propertyExtendedSearch (Extended search)/address
- zip code - GET/building (Building details)/address/zipcode
- lat + long - GET/propertyExtendedSearch (Extended search)
- bedrooms GET/property (Property details)/resoFacts/bedrooms
- bathrooms (contains shower/ bath) GET/property (Property details)/resoFacts/bathrooms
- bathroomsHalf (sink and toilet only) GET//property (Property details)/resoFacts/bathroomsHalf
- pets allowed (which types) - GET/property (Property details)//resoFacts/hasPetsAllowed
- Price History (Sub-table) - GET/property (Property details)/priceHistory
- Date Available - GET/property (Property details)/resoFacts/atAGlanceFacts
- atAGlanceFacts (sub table) - GET/property (Property details)/resoFacts/atAGlanceFacts
- homeType (ENUM) - GET/property (Property details)
- listed by (create a fake user account)
- year built (if availabe) - GET/building (Building details)
- last updated -  GET/propertyDetails
- date posted - GET/propertyDetails
- walk scores - GET/walkAndTransitScore (Walk, Bike and Transit scores)


## Stuff We are Adding
We are adding fields from different sources, e.g. the crime data and google maps API
- Nearby Restaurants (list of id's from the Restaurants Table)
- Nearby Gyms (list of id's from the Gyms table)
- Nearby [Amenity] (list of id's from the [insert amenity type here] table) etc.
- Burglary avg/month in neighborhood
- Murder avg/month in neighborhood
- Crime avg/month in neighborhood etc. (worthwhile maybe creating a table of neighborhoods with each of the crime ratings, and then link to property table via a neighborhoodID)