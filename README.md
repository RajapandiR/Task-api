# Simple Task Management API

Built using Nodejs, MongoDB, Expressjs

## Software Requirements

- Node.js **18+**
- MongoDB **6+** 

## How to run the application
```
// To install all dependencies
npm install

// To start the application
npm run serve

```

## Environment variables

Copy content from .env.sample into a new file .env in the root directory

## API End points

### User Signup - POST
http://localhost:9000/api/users/auth/signup

#### Request body
```
{
    "email": "raja@gmail.com",
    "password": "Test@123"
}
```

#### Response - 200 OK

```
{
    "success": true,
    "message": "User created"
}
```



### User Login - POST
http://localhost:9000/api/users/auth/login

#### Request body
```
{
    "email": "raja@gmail.com",
    "password": "Test@123"
}
```

#### Response - 200 OK

```
{
    "success": true,
    "message": "User login successfull",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzExMTNkODU2OGM4YjUzNDZjZjliNzgiLCJpYXQiOjE3MjkxNzI1ODUsImV4cCI6MTcyOTE3NDk4NX0.x-xY18loF-ZF8_5JcsBNJHcDGhHksLLLP3Z_EO4G6TE"
    }
}
```



### Create Task - POST
http://localhost:9000/api/tasks

#### Request body
```
{
    "title": "Test",
    "description": "Test"
}
```

#### Response - 200 OK

```
{
    "success": true,
    "message": "Task created",
    "data": {
        "task": {
            "title": "Test",
            "description": "Test",
            "status": "pending",
            "_id": "671114fa5914aa668e140117",
            "createdAt": "2024-10-17T13:45:30.592Z",
            "updatedAt": "2024-10-17T13:45:30.592Z"
        }
    }
}
```


### Update Task - PUT
http://localhost:9000/api/tasks/:taskId
#### Request body
```
{
    "title": "Testing",
    "description": "Testing"
}
```

#### Response - 200 OK

```
{
    "success": true,
    "message": "Task updated"
}
```


### Task Detail - GET
http://localhost:9000/api/tasks/:taskId


#### Response - 200 OK

```
{
    "success": true,
    "message": "Task detail",
    "data": {
        "task": {
            "_id": "671114fa5914aa668e140117",
            "title": "Testing",
            "description": "Testinging",
            "status": "pending",
            "createdAt": "2024-10-17T13:45:30.592Z",
            "updatedAt": "2024-10-17T13:46:46.506Z"
        }
    }
}
```


### Tasks List - GET
http://localhost:9000/api/tasks?page=2&limit=1


#### Response - 200 OK

```
{
    "success": true,
    "message": "Tasks",
    "data": {
        "tasks": [
            {
                "_id": "671108c13e64138cc2266d96",
                "title": "Test",
                "description": "Testing",
                "status": "pending"
            }
        ],
        "total": 2
    }
}

```

### Delete Task - DELETE
http://localhost:9000/api/tasks/671114fa5914aa668e140117


#### Response - 200 OK

```
{
    "success": true,
    "message": "Task deleted"
}
```


## License

[MIT](https://choosealicense.com/licenses/mit/)