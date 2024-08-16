# The Customer Support API 

Built with NestJS

# Prerequesites 

-Docker & Docker compose - for PostgreSQL database <br/>
-Node.js <br/>
-Git <br/> 
-Postman (optional)

# Setup
1. Clone repo
```
git clone https://github.com/your-username/customer-support-api.git
cd customer-support-api
```

2. Intall dependecies
```
npm install
```

3. Run the docker postgres DB
```
docker-compose up -d 
```
DB gets populted on start with data from the seed <br/>

4. Run the application
```
npm run start:dev
```

5. Postman (use provided postman collection) or any other tool for API testing

# REST Endpoints

base url: http://localhost:3000

Endpoints:

Login:

Endpoint: POST /auth/login <br/>
Request Body example: <br/>
```JSON
{
  "username": "Jure",
  "password": "pass"
}
```

getUserById <br/>
Endpoint: GET /user/:id

getAllUsers <br/>
Endpoint: GET /user

getAllRooms <br/>
/room <br/>
Endpoint: GET /room

createMessage <br/>
Endpoint: POST /message <br/>
Request body example: 
```JSON
{
  "message" : "messageTest",
    "room" : {
        "id" : 2
    },
    "user" : {
        "id" : 1
    }
}
```
Only users with role = "user" can create messages

getOpenMessages  <br/>
Endpoint: GET /message/open <br/>
Only users with role = "operator" can view messages

getClosedMessages <br/>
Endpoint: GET /message/closed <br/>
Only users with role = "operator" can view messages

getMessageByid <br/>
Endpoint: GET /message/:id <br/>
Only users with role = "operator" can view messages

messageResponse <br/>
Endpoint: POST /message/:id/response <br/>
Request body example:
```JSON
{
  {
    "response": "responseTest",
    "operatorId": 7
}
}
```
Only users with role = "operator" can respond to messages

getMessageResponseByUserId <br/>
Endpoint: GET /message/user/:id <br/>
Only users with role = "user" can view messge responses



