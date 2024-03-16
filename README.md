# GG-Hotels

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
