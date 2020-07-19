# seba-backend
> basic info
  "name": "golocal-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  
> API is running in port 3000 (default) 
## Install and Configuration
### Before first run

Go to your project root folder via command line
```
cd /seba-group34-golocal-backend
```


### Add node dependencies


```
npm install
```

### Set up the local configuration for JWT, database and cloudinary

In order to make a quicker delivery for submission, we already add  .env file. So you do not need set them manually.  
But it is only for this special case.  

-------------this is our mongodb database --------------------
* URI for mongodb-compass: mongodb+srv://golocal:<password>@cluster0-dvenz.mongodb.net/test
* URI for node.js:  mongodb+srv://golocal:<password>@cluster0-dvenz.mongodb.net/<dbname>?retryWrites=true&w=majority
  
substitute <dbname> to golocal-db and <password>.  
--------------this is our mongodb database -------------------
  
## Start the project

**Production environment**
```bash
npm start
```

## API routes

**authRoute: /auth**

+ router.post('/login', AuthController.login);
+ router.post('/register_guide', AuthController.register_guide);
+ router.post('/register_traveler', AuthController.register_traveler);
+ router.get('/logout', middlewares.checkAuthentication, AuthController.logout);



**toursRoute: /tours**

+ router.post('/search', TourController.search);
+ router.get('/', TourController.list); // List all tours
+ router.post('/:username/create',  middlewares.checkGuideAuthentication,TourController.create); // Create a new tours   middlewares.checkAuthentication, 
+ router.put('/:username/:tour_id',   middlewares.checkGuideAuthentication,TourController.update); // Update a tours by Id   middlewares.checkAuthentication,
+ router.delete('/:username/:tour_id',  middlewares.checkGuideAuthentication, TourController.remove); // Delete a tours by Id    middlewares.checkAuthentication,



**bookingRoute: /booking**


+ router.get('/:tour_id', BookController.load); // List details for this tour
+ router.post('/:tour_id', middlewares.checkTravellerAuthentication, BookController.book); // Create a booking with Authentication

**blogRoute: /blog**
+ router.get('/', BlogController.list_all);
+ router.post('/:username/create', middlewares.checkGuideAuthentication,BlogController.create); // create a blog
+ router.get('/:username', BlogController.list); // List blogs from a guide
+ router.get('/:username/:id', BlogController.read); // read one blog
+ router.post('/:username/:id', middlewares.checkGuideAuthentication, BlogController.update); // read one blog

**reviewsoute: /reviews**

+ router.post('/:tour_id',middlewares.checkTravellerAuthentication,  ReviewController.create);

<br/>
<br/>

## Creating/Updating POST methods:
### Please FIRST read the corresponding code from controllers folder BEFORE posting.

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
"img_url": "...url at cloudinary"
}
```
##### Logic for writing a Tour into database using req:
```
let booking_dates_seats=[];
        for (let date of dates) { //date is one date e.g."2020-08-21"
            new_date = new Date(date);
            // for each date, add the schedules to get a unique date_time e.g. 2020-10-11T10:00:00.000+00:00
            for(let schedule of req.body.schedules){ 
                date_time = add_schedule(new_date,schedule.hours,schedule.minutes);
                new_dates.push(date_time);
            }
        };
        
        for (let booking_d of new_dates) { //booking_d is a date_time
            booking_dates_seats.push({"date":booking_d,"seats":req.body.max_participants}); 
            }
        // booking_dates_seats is a list. each element is a dictionary, with two keys: "date" and "seats". the seats are the available seats.
        // e.g. as the guide created a new tour, seats=req.body.max_participants=4. Later, if user A booked 3 seats, then it changes to seats=1. 
        // once the wish_book_seats > available_seats, it can not be booked. 
        // e.g. If user B want to book 2 seats for the same time block as user A, it should be given a error message.
```
##### Example for one Tour in database:
```
{
  "_id": "5f08663f5e978680733ed4fc",
  "title": "Nymphenburg Palace",
  "guide_id": "5f0828638684b26dbfe747ff",
  "description": "using geocoder",
  "country": {
      "code": "DEU",
      "name": "Germany"
  },
  "city": "Munich",
  "lat": 48.1583,
  "lon": 11.5033,
  "language": "English",
  "price": 40,
  "preference": [
      "nature"
  ],
  "reviews": [],
  "avg_rating": 3,
  "dates_seats": [
              {
                  "_id": "5f08663f5e978680733ed4fd",
                  "date": "2020-10-11T10:00:00.000Z",
                  "seats": 8
              },
              {
                  "_id": "5f08663f5e978680733ed4fe",
                  "date": "2020-10-11T15:00:00.000Z",
                  "seats": 8
              },
              {
                  "_id": "5f08663f5e978680733ed4ff",
                  "date": "2020-10-12T10:00:00.000Z",
                  "seats": 8
              },
              {
                  "_id": "5f08663f5e978680733ed500",
                  "date": "2020-10-12T15:00:00.000Z",
                  "seats": 8
              }
          ],
  "img": {
    "data": {
        "type": "Buffer",
         "data": [...]
         }
  }
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







