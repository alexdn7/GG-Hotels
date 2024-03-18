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

# AUTH 
### POST: http://localhost:3000/auth/register
  Used for creating an account.
  Request body:
  ``` json
    {
    "name": <String>,
    "email": <String>,
    "password": <String>
   }
  ```
  It will check if already exists an user with given email. If yess, will throw an eror. <br>
  Otherwise, it will return the authentication token. (used lately to perform some actions).

### POST: http://localhost:3000/auth/login
  Used for login.
  Request body:
  ``` json
    {
    "email": <String>,
    "password": <String>
   }
  ```
   Will return a token.


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
  ```
    stars: <Number>
    parking: <Boolean>
    allowPets: <Boolean>
    location: <String>
    orderBy: <Column name> - used for sorting
    sord: <asc/desc> - sorting direction (optional, if not included, default value will be asc)
  ```
  Complete query with parameters example:  
  ```
  http://localhost:3000/hotels?stars=3&orderBy=rating&sort=desc
  ```
- will return all hotels with 3 stars, sorted by rating in descending order.

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

### GET: http://localhost:3000/rooms/
  
  Available for all users, even not authenticated. <br>
  Returns all rooms matching your arguments. (If no arguments presented, it will return absolutely all rooms).
  
  Arguments:
  ```
    hotelId: <Number>
    available: <Boolean>
    allowPets: <Boolean>
    offersParkingSpot: <Boolean>
    fee: <Number>
    orderBy: <Column name> - used for sorting
    sord: <asc/desc> - sorting direction (optional, if not included, default value will be asc)
  ```
  Complete query with parameters example:  
  ```
  http://localhost:3000/rooms?hotelId=4&orderBy=fee&sort=desc
  ```
   - will return all rooms from Hotel with id 4, sorted by fee in descending order. 

### GET: http://localhost:3000/rooms/:id

  Available for all users, even not authenticated. <br>
  Returns the room with the specified ID

### PUT: http://localhost:3000/rooms/update/id
   Used for updating an existing room. <br>
   You must be an Admin to perform this action.  <br>

   ``` json
      {
    "number": <Number>,
    "floor": <Number>,
    "max_capacity": <Number>,
    "available": <Boolean>,
    "reservedOn": <DateTime>,
    "availableFrom": <DateTime>,
    "hotelId": <Number>,
    "allowPets": <Boolean,
    "offersParkingSpot": <Boolean>,
    "fee": <Float>
    }
   ```


### DELETE: http://localhost:3000/rooms/delete/:id

  Used for deleting an existing room. <br>
  You must be an Admin to perform this action.  <br>
  If you're an Admin, use your Bearer Token (In Postman, click on request, open Authorization tab -> Bearer Token and insert your token).  <br>
  If you have completed the request successfully, you will receive a (200 OK) response status, otherwise you will get a specific error. <br>



# RESERVATION

### POST: http://localhost:3000/reservations/add

  Used for adding a new reservations. <br>
  Available only for authenticated users. <br>

  Request body:
  ``` json
    {
    "hotelId": <Number>,
    "roomId": <Number>,
    "number_of_people": <Number>,
    "hasPets": <Boolean>,
    "needParkingSpot": <Boolean>,
    "reservationEndDate": <DateTime>
   }  
  ```
  The other columns of the entity will be set automatically based on those provided in the request body. <br>
  In addition, when a reservation is created, the Rooms and Hotel tables will also be modified.
  
  ```
    In the Rooms table: - the "available" column will receive the value false
                        - the "reservedOn" column receives the current date
                        - the "availableFrom" column receives the value from the "reservationEndDate" field of the request

    In the Hotel table: - the value of the "available_rooms" column is decremented
  ```

### GET: http://localhost:3000/reservations/
  Returns all reservations. <br>
  Only admins can use that.

### GET: http://localhost:3000/reservations/:id
  Returns an existing reservation. <br>
  Only admins and user that created it can perform this action.

### PATCH: http://localhost:3000/reservations/update/:id
  Update the end date of the reservation and the fee. If you want to change data such as userId, hotelId, roomId, you need to make a new reservation (to delete the current one /delete/:id, and to add a new one, /add) <br>
  Only admins and user that created it can perform this action. <br>
  Request body:
  ``` json
    {
    "reservationEndDate": <DateTime>
    }
  ```
  Fee will be updated automatically.

### DELETE: http://localhost:3000/reservations/delete/:id
  Used for deleting an existing reservation. <br>
  Only the user that created it or an admin can perform this operation.
