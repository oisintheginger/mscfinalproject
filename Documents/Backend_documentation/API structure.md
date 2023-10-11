Specific Api Structure

Endpoints discussed
- GET /api/properties
- GET /api/properties/{propertyId}
- GET /api/properties/search

    Potential property image endpoints 
- GET /api/properties/{propertyID}/images
- GET /api/properties/{propertyID}/QVImage

Favourite properties

using userId and propertyId
- GET /api/user/favourites
- POST /api/user/favourites
- DELETE /api/user/favourites

Saved searches

using userId and searchId?
- GET /api/user/searches
- POST /api/user/searches
- PUT /api/user/searches
- DELETE /api/user/searches

Link to swagger for more detailed information:
https://app.swaggerhub.com/apis/fkadir/HMEApi/1.0.0