### Install:
install yarn (new package manager for nodejs)
```npm install -g yarn```
install dependencies package with yarn
```yarn``` 
### Config:
* default http protocol port is 3000, replace it at app.js
* change your api code in config.js file

### Run debug or start: 
```yarn dev``` or ```yarn start```


### *** Test API ***:

### Create Deposit Request
```http
  GET /create-request-deposit
```
### Create Withdraw Request
```http
  GET /create-request-deposit
```

### Receive Callback Data
- if you use GET method
```http
  GET /create-request-deposit
```
- if you use POST method
```http
  POST /create-request-deposit
```