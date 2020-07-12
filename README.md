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

## Creating/Updating POST methods:
#### please read the corresponding code from controllers folder carefully.

### Request JSON examples (using Postman to post request)
#### 1. create a tour (router.post('/:user_id', TourController.create))
##### POST http://localhost:3000/tours/5f0828638684b26dbfe747ff
```
{"title": "Munich English Garden",
"city": "Munich",
"country":"Germany",
"lat": 48.1642,
"lon": 11.6056,
"description":"The English Garden (Englischer Garten) lies in the midst of bustling Munich and is one of the largest city parks in Europe",
"dates":["2020-08-21","2020-08-22","2020-08-23"],
"schedules":[{"hours":10,"minutes":0},{"hours":18,"minutes":0}],
"price":10,
"preference":"nature",
"duration": 2,
"max_participants": 4,
"imgPath": "/Users/liu0001q/webeng/golocal/seba-backend/image/englischer-garten-schwabing.jpg"
}
```

#### 2. create a booking (router.post('/:tour_id', BookingController.create))
##### POST http://localhost:3000/booking/5f0882d518a99d0200a8932b
##### the wishdate should be choosen from given avaiable date_blocks from tour.dates_seats
##### update 7.11: the request of wishdate is not yet implemented. Please see the controllers/booking.js --> book method TODO
```
{
"num_participants":2
}

```
#### 3.create a review (router.post('/:tour_id', ReviewController.create))
##### POST http://localhost:3000/reviews/5f0867ce13535180a0c159c6

```
{
"rating": 4,
"comment": "A Test Review"
}

```

#### 4.create a blog (router.post('/:username', BlogController.create))
##### POST http://localhost:3000/blog/guide_1

```
{"lat":48.1374,
"lon":11.5754,
"city":"Munich",
"title":"Heart of Munich",
"content": "Most large cities have a place where the crowds gather automatically or by arrangement for big events—celebrations, demonstrations, markets and the like. Times Square, Piccadilly Circus, the Zocalo, Red Square, the names are familiar. In Munich, for nearly 900 years, it's been Marienplatz."
}

```







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
