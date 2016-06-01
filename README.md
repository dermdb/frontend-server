# Dermatology Database (dermdb)

An API for tracking changes in skin conditions.

### Installation Instructions

First Clone:
```
git clone https://github.com/haleleicester/dermdb
```

Install bower:
```
npm i bower -g
```

Install bower components:
```
bower i
```

Install node modules
```
npm i
```

### Run The Server

```
node bin/www
```

Find the server [here](http://localhost:3000).

### API Documentation

The API is the one way that data is made accessible, it powers most of the frontend functions.

### Endpoints

All endpoints begin with `/_/`, then followed by a more descriptive extension, e.g. `/_/auth/create`, which is the endpoint to create an account.

| Endpoint | Function | Method |
|----------|----------|--------|
| /auth/create | Create an account | POST |
| /auth/login | Login | POST |
| /auth/logout | Logout | DELETE |
| /account | Create user profile | POST |
| /problem | Create a new problem | POST |
| /snapshot | Create a new snapshot | POST |


#### Responses

```json
{
  "data":{
    "message":"Success"
  },
  "status":"ok",
  "time":3.140904
}
```

#### Error Responses

```js
{ [AuthError]
  status: 'invalidPassword',
  statusCode: 401,
  data: { message: 'Invalid Password',
    description: 'Password is too common!',
    code: 'E_INVALID_PASSWORD' 
  } 
}
```

### Contributors
* [Sam Mills](https://github.com/hunchmun) (therealhenchman@gmail.com)
* Jillian Pawlyn

Copyright (C) HALE 2015. Licensed under MIT & GPL2
