The Customer Support API is a backend service built with NestJS

Prerequesites 
Docker & Docker compose - for PostgreSQL database
Node.js

1. Clone repo
git clone https://github.com/your-username/customer-support-api.git
cd customer-support-api

2. Intall dependecies
npm install

3. Run the docker postgres DB
docker-compose up -d

4. Run the application
npm run start:dev

5. Postman (use provided postman collection) or any other tool for API testing

base url: http://localhost:3000

Endpoints:

Login:
Endpoint: POST /auth/login
Request Body example:
{
  "username": "Jure",
  "password": "pass"
}

getUserById
Endpoint: GET /user/:id

getAllUsers
Endpoint: GET /user

getAllRooms
/room
Endpoint: GET /room

createMessage
Endpoint: POST /message
Request body example:
{
    "message" : "messageTest",
    "room" : {
        "id" : 2
    },
    "user" : {
        "id" : 1
    }
}
Only users with role = "user" can create messages

getOpenMessages
Endpoint: GET /message/open
Only users with role = "operator" can view messages

getClosedMessages
Endpoint: GET /message/closed
Only users with role = "operator" can view messages

getMessageByid
Endpoint: GET /message/:id
Only users with role = "operator" can view messages

messageResponse
Endpoint: POST /message/:id/response
Request body example:
{
    "response": "responseTest",
    "operatorId": 7
}
Only users with role = "operator" can respond to messages

getMessageResponseByUserId
Endpoint: GET /message/user/:id
Only users with role = "user" can view messge responses



