Login and Register API
Overview
This API provides endpoints for users to register and login to the system.

Endpoints
Register
POST /register
Request Body:
username: string (required)
email: string (required)
password: string (required)
Response:
201 Created on successful registration
400 Bad Request if request body is invalid
409 Conflict if username or email already exists
Login
POST /login
Request Body:
username: string (required)
password: string (required)
Response:
200 OK on successful login with a JSON Web Token (JWT) in the response body
401 Unauthorized if credentials are invalid
404 Not Found if user not found
Request Headers
Content-Type: application/json
Request Body
JSON object with the required fields
Response
JSON object with the following fields:
token: string (JWT token)
expires_in: integer (token expiration time in seconds)
Error Handling
Error responses will have a JSON object with the following fields:
error: string (error message)
status_code: integer (HTTP status code)
Security
The API uses JSON Web Tokens (JWT) for authentication.
Passwords are stored securely using a salted hash.
Testing
You can test the API using a tool like Postman or cURL.
Example requests and responses are provided below.
Example Requests
Register
bash











