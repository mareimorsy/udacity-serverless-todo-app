# Serverless TODO
This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```
Backend is already deployed on the following link:
  https://jn0ccdjky6.execute-api.us-east-1.amazonaws.com/prod/
and you may use the following endpoints to test the app
```
  GET - https://jn0ccdjky6.execute-api.us-east-1.amazonaws.com/prod/todos
  POST - https://jn0ccdjky6.execute-api.us-east-1.amazonaws.com/prod/todos
  PATCH - https://jn0ccdjky6.execute-api.us-east-1.amazonaws.com/prod/todos/{todoId}
  DELETE - https://jn0ccdjky6.execute-api.us-east-1.amazonaws.com/prod/todos/{todoId}
  POST - https://jn0ccdjky6.execute-api.us-east-1.amazonaws.com/prod/todos/{todoId}/attachment
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```
PS: 

- `client/src/config.ts` is already mapping into production endpoint, you don't have to modify it.
- There's a postman collection called `Final Project.postman_collection.json`, you may import it, and just change the authorization token if needed