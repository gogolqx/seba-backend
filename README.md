# seba-backend
> basic info
  "name": "golocal-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  
> API is running in port 3000 (default) 

## API routes

**authRoute: /auth**

+ router.post('/login', AuthController.login);

+ router.post('/register', AuthController.register);

+ router.get('/logout', middlewares.checkAuthentication, AuthController.logout);



**toursRoute: /tours**

+ router.post('/search', TourController.search);

+ router.get('/', TourController.list); // List all tours

+ router.post('/:user_id', TourController.create); // Create a new tour by guide's id

+ router.put('/:tour_id',  TourController.update); // Update a tour by Id  

+ router.delete('/:tour_id',  TourController.remove); // Delete a tour by Id 


**bookingRoute: /booking**

+ router.get('/:tour_id', BookController.load); // Ahow a tour detail

+ router.post('/:tour_id', BookController.book); // Create a booking based on a tour id 

**blogRoute: /blog**
+ router.post('/:username', BlogController.create); // Create a blog under guide's username

+ router.get('/:username', BlogController.list); // List all blogs 
<br/>
<br/>

## Install and Configuration

**node dependencies**

```
npm install
```

**Set up your database**

* URI for mongodb-compass: mongodb+srv://golocal:<password>@cluster0-dvenz.mongodb.net/test
* URI for node.js:  mongodb+srv://golocal:<password>@cluster0-dvenz.mongodb.net/<dbname>?retryWrites=true&w=majority
  
substitute <dbname> to golocal-db
and <password>
  
## Start the project



**Development environment**
```bash
npm run devstart
```

**Production environment**
```bash
npm start
```
