# Installation

1. Install latest node.js.

2. In root run,

    ```npm install```

# How to run

1. Set your database configuration in ```./dbconfig/.env``` file.

2. Set your server port corresponding to the stage in ```./.env.[stage]```

    Stages are "__dev__" - "__prod__" - "__test__"

3. If you don't have a database that specified in ```./dbconfig/.env```, you must run this command: 
```npx sequelize-cli db:create --env [STAGE]```

4. Start server:

    __DEV__: ```npm run dev```
    
    __PROD__: ```npm run start```
    
    __TEST__: ``` npm run test-sv```


# How to Seed DB

After doing the **_4th How to run article_** run this command: 

```npx sequelize-cli db:seed:all --env [STAGE]```

## Example of commands - Stage DEV

1. ```npx sequelize-cli db:create --env dev```

2. ```npm run dev```

3. ```npx sequelize-cli db:seed:all --env dev```


# Paths

__BASE_URL__: http://localhost:{port no}

### Signup API

- POST - /api/signup

body: 
``` 
    username: "[A-Za-z0-9]",
    password: "Any",
    rePassword: "Any"
```

Return: 
```
200 OK - { message: "Successful!" }
```

### Login API

- POST - /api/login

body: 
``` 
    username: "[A-Za-z0-9]",
    password: "Any",
```

Return: 
```
200 OK - { token: "JWT Token" }
```

### Create Contact API

- POST - /api/contact

headers:
```
Authorization: "Bearer {JWT token}"
```

body: 
``` 
    firstName: "[A-Za-z]",
    lastName: "[A-Za-z]",
    company: "[A-Za-z0-9]",
    firstName: "[A-Za-z0-9]",
    mobile: ["mobile phone:tr-TR"]
```

Return: 
```
200 OK - { contact: {created contact} }
```

### Update Contact API

- PUT - /api/contact

headers:
```
Authorization: "Bearer {JWT token}"
```

body: 
``` 
    id: "Contact ID: UUID"
    firstName: "[A-Za-z]",
    lastName: "[A-Za-z]",
    company: "[A-Za-z0-9]",
    firstName: "[A-Za-z0-9]",
    mobile: ["mobile phone:tr-TR"]
```

Return: 
```
200 OK - { contact: {updated contact} }
```

### Delete Contact API

- DELETE - /api/contact

headers:
```
Authorization: "Bearer {JWT token}"
```

body: 
``` 
    id: "Contact ID: UUID"
```

Return: 
```
200 OK - { message: "Success!" }
```

### List Contacts API

- GET - /api/contact

headers:
```
Authorization: "Bearer {JWT token}"
```

Return: 
```
200 OK - { contacts: {List of contact} }
```

### Search Contact API

- POST - /api/contact/search

headers:
```
Authorization: "Bearer {JWT token}"
```

body: 
``` 
    search: "[A-Za-z0-9]"
```

Return: 
```
200 OK - { contacts: {List of contact} }
```