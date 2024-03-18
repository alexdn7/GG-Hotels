# GG-Hotels
  This project is the backend part for a booking application. Within it, a user can see the available hotels, their rooms and make a reservation. To make a reservation, authentication is required. The roles available on the application are: <br>
    - USER (Has access to GET methods, has the right to modify/delete his own reservation) and <br>
    - ADMIN (Full access to the application). <br>
    Authentication is done using Bearer Token. <br><br>
    
 #### Project structure:
  ```
    - controllers  
    - tests 
    - middlewares
    - prisma (here you can adjust database schema and see migrations)
    - routes 
    - utils
    .env
    app.js
    test.config
    .package-lock-json
    .package.json
    README.md
 ```
 #### First steps:
```
1. Clone this repository.
2. Modify the .env file as follows:
  - DATABASE_URL="" - insert your database connection string
  - SECRET_KEY="" - insert one key for bcrypt.
3. Check all routes ad add them on applications like Postman.
4. Check documentation to see all requirements for requests (correct form, arguments, request body, etc).
```
#### Database schema: <br>
![image](https://github.com/alexdn7/GG-Hotels/assets/51855097/be5d0e30-61c0-458b-bb81-2d5ab652db10)


# Hotels
### POST: http://localhost:3000/hotels/add
  Used for adding a new hotel. <br>
  Request body: 
 ``` json
 {
   "name": <String>,
   "description": <String>,
   "stars": <Integer>,
   "rating": <Float>,
   "location": <String>,
   "available_rooms": <Integer>,
   "allowPets": <Boolean>,
   "parking": <Boolean>
 }
 ```
 You must be an Admin to perform this action.  <br>
 If you're an Admin, use your Bearer Token (In Postman, click on request, open Authorization tab -> Bearer Token and insert your token).  <br>
 If you have completed the request successfully, you will receive a (201 CREATED) response status and, in response body, the JSON for the created hotel, otherwise you will get a specific error. ![image](https://github.com/alexdn7/GG-Hotels/assets/51855097/56d48bb9-36a6-4a5b-9215-1794b1689b1e)


### GET: http://localhost:3000/hotels/
  
  Available for all users, even not authenticated. <br>
  Returns all hotels matching your arguments. (If no arguments presented, it will return absolutely all hotels).
  
  Arguments:
  ```json
    stars: <Number>
    parking: <Boolean>
    allowPets: <Boolean>
    location: <String>
    orderBy: <Column name> - used for sorting
    sord: <asc/desc> - sorting direction (optional, if not included, default value will be asc)
  ```
  Complete query with parameters example:  
  http://localhost:3000/hotels?stars=3&orderBy=rating&sort=desc - will return all hotels with 3 stars, sorted by rating in descending order.

### GET: http://localhost:3000/hotels/:id

  Available for all users, even not authenticated. <br>
  Returns the hotel with the specified ID

### PUT: http://localhost:3000/hotels/update/:id

 Used for updating an existing hotel. <br>
 You must be an Admin to perform this action.  <br>
 If you're an Admin, use your Bearer Token (In Postman, click on request, open Authorization tab -> Bearer Token and insert your token).  <br>
 If you have completed the request successfully, you will receive a (200 OK) response status and, in response body, the JSON for the updated hotel, otherwise you will get a specific error. <br>

 Request body: 
 ``` json
 {
   "name": <String>,
   "description": <String>,
   "stars": <Integer>,
   "rating": <Float>,
   "location": <String>,
   "available_rooms": <Integer>,
   "allowPets": <Boolean>,
   "parking": <Boolean>
 }
 ```

### DELETE: http://localhost:3000/hotels/delete/:id

  Used for deleting an existing hotel. <br>
  You must be an Admin to perform this action.  <br>
  If you're an Admin, use your Bearer Token (In Postman, click on request, open Authorization tab -> Bearer Token and insert your token).  <br>
  If you have completed the request successfully, you will receive a (200 OK) response status, otherwise you will get a specific error. <br>

 

# ROOMS

### POST: http://localhost:3000/rooms/add

  Used for adding a new room. <br>
  Request body: 
 ``` json
 {
   "number": <Number>,
   "floor": <Number>,
   "max_capacity": <Number>,
   "available": <Boolean>,
   "hotelId": <Number>,
   "allowPets": <Boolean>,
   "offersParkingSpot": <Boolean>,
   "fee": <Float>
 }

 ```
 The other columns of the entity will be set automatically based on those provided in the request body. For example, reservedOn will be null until a reservation is made, and availableFrom will have the current date.

 You must be an Admin to perform this action.  <br>
 If you're an Admin, use your Bearer Token (In Postman, click on request, open Authorization tab -> Bearer Token and insert your token).  <br>
 If you have completed the request successfully, you will receive a (201 CREATED) response status and, in response body, the JSON for the created room, otherwise you will get a specific error.
