# Shoppy-API

## Description

the following project is the implementation of a restAPI that is built with:

- [Node.js](https://nodejs.org/es/)
- [express.js](https://expressjs.com/es/)


## How to clone

Comando para clonar:

```bash
cd folder
git clone [REPOSITORY]

```

## installation

Once the project has been cloned, it is necessary to install all the dependencies with the command:

```bash
npm install
```

### Run in LocalHost:

- Change the value of isAdmin key in order to test authorized routes (isAdmin = true or false) in the file [config.js](/config/config.js)

Execute the command 

```bash
npm run dev
```

The previous command will run nodemon server.js, which will start the server.


# ENDPOINTS

Endpoint list for the services provided


## PRODUCTS

### GET `api/productos`

### GET `api/productos/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  product's ID

### POST `api/productos`
**Parameters in body**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
| `name`        | required | string  |  product's name
| `description` | required | string  |  product's description
| `code`        | required | string  |  product's code
| `image`       | required | string  |  iproduct's imgage
| `price`       | required | number  |  product's price
| `stock`       | required | number  |  stock 

### UPDATE `api/productos/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  updated product's ID
|     `{data}`  | optional |         |  update data

### DELETE `api/productos/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  deleted product's ID

 <br/>

## CARTS

### GET `api/carrito`

### GET `api/carrito/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  cart's ID

### POST `api/carrito/`


### DELETE `api/carrito/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  deleted cart's ID


### POST `api/carrito/{id}/productos`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  cart's ID

**Parameters in body**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
| `name`        | required | string  |  product's name
| `description` | required | string  |  product's description
| `code`        | required | string  |  product's code
| `image`       | required | string  |  iproduct's imgage
| `price`       | required | number  |  product's price
| `stock`       | required | number  |  stock 

### DELETE `api/carrito/{id}/productos/{id_prod}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  cart's ID
| `id_prod`  | required | number  |  product's ID


### POST `api/carrito/{id}/order`
*This endpoint place a cart order, that close a purchase of the selected ID's cart
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | number  |  cart's ID


## AUTHORIZATION

### GET `api/auth/home`

### POST `api/auth/register`

**Parameters in body**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
| `email`        | required | string  |  user email
| `password`        | required | string  |  user password
| `name` | required | string  |  user name
| `age`        | required | number  |  user age
| `phone`       | required | string  |  user phone number
| `address`       | required | string  |  user address
| `avatar`       | required | string  |  image url 

### POST `api/auth/login`

**Parameters in body**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
| `email`        | required | string  |  user email
| `password`        | required | string  |  user password

### POST `api/auth/logout`






