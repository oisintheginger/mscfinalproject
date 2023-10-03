# Property Fields + Schema
This document lists the fields that will be pulled from the Zillow API.

## Fields from the RapidAPI 
- Property Images
- Price
- Overview
- tags (further discussion needed)
- address
- zip code
- lat + long
- bedrooms
- bathrooms
- pets allowed (which types)
- Price History (Sub-table)
- Date Available
- atAGlanceFacts (sub table)
- homeType (ENUM)
- listed by (create a fake user account)
- year built (if availabe)
- last updated 
- date posted


## Stuff We are Adding
We are adding fields from different sources, e.g. the crime data and google maps API
- Nearby Restaurants (list of id's from the Restaurants Table)
- Nearby Gyms (list of id's from the Gyms table)
- Nearby [Amenity] (list of id's from the [insert amenity type here] table) etc.
- Burglary avg/month in neighborhood
- Murder avg/month in neighborhood
- Crime avg/month in neighborhood etc. (worthwhile maybe creating a table of neighborhoods with each of the crime ratings, and then link to property table via a neighborhoodID)
