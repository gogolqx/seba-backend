const Tour = require('../models/Tour');
const User = require('../models/User');
const Booking = require('../models/Booking');
nodeGeocoder = require('node-geocoder');

const options = {
    provider: 'openstreetmap'
  };

var add_schedule =  function (dt, hours,mins) {
    return new Date(dt.getTime() + hours*60*60*1000+mins*60*1000);
}
const crg = require('country-reverse-geocoding').country_reverse_geocoding();
const geoCoder = nodeGeocoder(options);


// creating tour
const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    let new_tour;
    let new_dates=[];
    dates = req.body.dates;
    const latitude = req.body.lat;
    const longitude = req.body.lon;
    let booking_dates=[];
    for (let date of dates) {
        new_date = new Date(date);
        for(let schedule of req.body.schedules){
            date_time = add_schedule(new_date,schedule.hours,schedule.minutes);
            new_dates.push(date_time);
        }
    };

    for (let booking_d of new_dates) {
        booking_dates.push({"date":booking_d,"seats":req.body.max_participants});
    }

    // this is the final request
    new_tour = new Tour ({
    title:req.body.title,
    guide_id:req.userId,
    description:req.body.description,
    country: crg.get_country(latitude,longitude),
    city: req.body.city,
    lat: latitude,
    lon: longitude,
    dates_seats: booking_dates,
    schedules: req.body.schedules,
    duration: req.body.duration,
    price: req.body.price,
    preference: req.body.preference,
    max_participants: req.body.max_participants,
    img_url: req.body.image_url
    });


   await Tour.create(new_tour)
        .then(tour => res.status(201).json(tour))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

// searching for tours on conditions
const search = async(req, res) => {
    var query ={};
    //city
    if (req.body.city){
        query.city = req.body.city;
    }
    //num of participants
    if(req.body.num){
        query.num =  req.body.num;
    }
    else{query.num = 1}
    //price
    if (req.body.price_min){
        query.price_min = req.body.price_min;
    }else{query.price_min=-1;}
    if (req.body.price_max){
        query.price_max = req.body.price_max;
    }else{query.price_max = 999999;}

    //date period : start_date ,end_date
    if(req.body.start_date){
        query.pre =  new Date(req.body.start_date);
    }
    else{query.pre =new Date( "2018-01-01");}
    if(req.body.end_date){
        query.post =  new Date(req.body.end_date)
    }
    else{query.post =new Date ("2025-01-01");}
    //preference
    if(req.body.preference){
        query.preference=req.body.preference;
 }
   last_day = add_schedule(query.post,23,59);

   //preference and return a list of tours
   if(req.body.preference){
       query.preference=req.body.preference;
       const tours = await Tour.find({
           city:query.city,
           price:{$gte: query.price_min,  $lte: query.price_max},
           'dates_seats.date':{$gte: query.pre,$lte:last_day} ,
           'dates_seats.seats':{$gte: query.num},
           preference:{$in:query.preference}
        }).exec();
        res.json(tours);
    }
    else{
        const tours = await Tour.find({
            city:query.city,
            price:{$gte: query.price_min,  $lte: query.price_max},
            'dates_seats.date':{$gte: query.pre,$lte:last_day},
            'dates_seats.seats':{$gte: query.num},
         }).exec();
         res.json(tours);
     }
};

const read  = async(req, res) => {
    console.log('I am here reading a tour');
    console.log(req.params)
    try{
        const tours = await Tour.findById(req.params.tour_id);
        res.json(tours);
    }catch(err){
        res.json({message:err});
    }

};

// listing all tours

const list  = async(req, res) => {
    try{
        const tours = await Tour.find();
        res.json(tours);
    }catch(err){
        res.json({message:err});
    }

};

const remove = (req, res) => {
    Tour.findByIdAndRemove(req.params.tour_id).exec()
        .then(() => res.status(200).json({message: `Tour with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};
// updating tour
//TODO:
const update = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    };
    Tour.findByIdAndUpdate(req.params.tour_id,req.body,{
        new: true,
        runValidators: true})
        .exec()
        .then(tour => res.status(200).json(tour))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};
const usersTours  = async(req, res) => {
    console.log(req.params.username);
    const user = await User.findOne(
        {username : req.params.username}
    ).select().exec();
    console.log('user: ', user);

    const tours = [];
    if (user.role === "guide") {
        const allTours = await Tour.find(
          {guide_id:user._id}
        ).exec();
        for (let t of allTours) {
            tours.push(t);
        };
        console.log('tours: ', tours);
    } else if (user.role === "traveler") {
      const bookings = await Booking.find(
        {traveller_id:user._id}
      ).exec();

      for (let booking of bookings) {
          const allTours = await Tour.find(
            {_id:booking.tour_id}
          ).exec();
          for (let t of allTours) {
              tours.push(t);
          };
      };
      console.log('tours: ', tours);
    };
    //console.log('allTours: ', allTours);
    //console.log('allCategories: ', allCategories);

    // sending all categories that coming from previous bookings of the user.
    res.json(tours);
};
module.exports = {
    create,
    search,
    read,
    update,
    remove,
    list,
    usersTours
};

/*backup using boy to upload file in local disk

const upload = async(req,res)=>{
    if (req.busboy) {
        console.log(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
           var saveTo = path.join(__dirname.replace('routes', 'static'), "yourFileName");
           console.log(saveTo);
            file.pipe(fs.createWriteStream(saveTo));
            file.on('end', function () {
                   //database
               res.json({
                   success: true
                });
            });
        });
        req.pipe(req.busboy);
    }

};
*/
