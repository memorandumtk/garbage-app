# Garbase Search App

## Reference

### How to get geolocation on client side
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition  

### How to read the request data on next.js dynamic api
https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body

### How to use `prisma` for PostgreSQL
https://vercel.com/guides/nextjs-prisma-postgres  
https://www.prisma.io/blog/fullstack-nextjs-graphql-prisma-2-fwpc6ds155  

### Leaflet install
https://medium.com/@tomisinabiodun/displaying-a-leaflet-map-in-nextjs-85f86fccc10c  

### Latitude and Longitude distance
- ChatGPT history ​​
```
User
How long is 0.001 degrees in latitude 45degree.
ChatGPT
Error analyzing
At 45 degrees latitude, a distance of 0.001 degrees in latitude is also approximately 111.32 meters, similar to the distance at the equator. This is because the distance per degree of latitude does not significantly vary with latitude. ​​

User
How long is from longitude 123.120°  to longitude 123.121°?
In this case, latitude is 47 degree.
ChatGPT
At a latitude of 47 degrees, the distance between longitudes 123.120° and 123.121° is approximately 75.92 meters. ​
```
- An answer of Stack exchange
https://gis.stackexchange.com/a/2964  

- Vancouver Coordinate
49.2827° N, 123.1207° W
- Tronto Coordinate
43.6532° N, 79.3832° W  



### How to filter by query
https://www.basedash.com/blog/how-to-filter-on-date-ranges-in-prisma

https://www.prisma.io/docs/orm/prisma-client/client-extensions/result


### How to define db model and seed to db via prisma
https://www.prisma.io/blog/fullstack-nextjs-graphql-prisma-oklidw1rhw
- For avoiding the seed error.
https://github.com/prisma/prisma/discussions/12752  


### How to implement authentication function using Auth0
https://www.prisma.io/blog/fullstack-nextjs-graphql-prisma-3-clxbrcqppv  
https://developer.auth0.com/resources/guides/web-app/nextjs/basic-authentication  


#### When login function didn't work, It might be needed to log in via password auth
https://community.auth0.com/t/actions-flows-not-executing/62769  




# Each goal of the process of building this app.
1. To get location --> using Web API `getCurrentLocoation`
2. To send a request with geolocation to api in next
3. To insert a row based on the request
4. To add the value wether each boxes' button is clicked or not into the request to the api
5. To display a map using `Leaflet` libray
6. To constrain the value of geolocation by checking the value of latitude and longitude: +-0.005 degree (111.32 meters at equator which is maximum value)
7. To use GraphQL --> Gave up since lack of documents to use app/route.(shouldn't be used for app/route?)
7. User model adding for implementing authentication function

