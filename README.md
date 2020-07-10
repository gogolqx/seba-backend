# seba-backend
  "name": "golocal-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  
API is running in port 3000 (default) 

***API***

**authRoute: /auth**
router.post('/login', AuthController.login);/
router.post('/register', AuthController.register);/
router.get('/logout', middlewares.checkAuthentication, AuthController.logout);/

**guideRoute: /guide_dashboard**
router.get('/:id', GuideController.list); //dashboard for guide


**bookingRoute: /booking**
router.get('/:id', BookController.load); // List a tour
router.post('/:id', BookController.book); // Create a booking based on a tour id

**toursRoute: /tours**
router.post('/search', TourController.search);
router.get('/', TourController.list); // List all tours
router.post('/', TourController.create); // Create a new tours   
router.put('/:id',  TourController.update); // Update a tours by Id  
router.delete('/:id',  TourController.remove); // Delete a tours by Id 


**Install node dependencies**

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
