const Tour = require('../models/Tour');
nodeGeocoder = require('node-geocoder');
const fs = require('fs');
const options = {
    provider: 'openstreetmap'
  };

var add_schedule =  function (dt, hours,mins) {
    return new Date(dt.getTime() + hours*60*60*1000+mins*60*1000);
}
const crg = require('country-reverse-geocoding').country_reverse_geocoding();
const geoCoder = nodeGeocoder(options);
// creating tour
//TODO: auth for guide id
const create = async (req, res) => {
    
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    let new_tour;
    let new_dates=[];
    await geoCoder.geocode({
        city: req.body.city,
        country: req.body.country,
        lat:req.body.lat,
        lon:req.body.lon
      })
      .then(geo_json=>{
          latitude = req.body.lat;
          longitude = req.body.lon;
          address = geo_json[0]["streetName"];
        })
        dates = req.body.dates;
        
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
        console.log(booking_dates);
             // this is the final request
             new_tour = new Tour ({
                title:req.body.title,
                guide_id:'5f0828638684b26dbfe747ff', //TODO
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
                img: {data: fs.readFileSync(req.body.imgPath),
                    type: 'image/png'}
             })
           
          

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
    }
    else{query.price_min=-1;}
    
    if (req.body.price_max){
        query.price_max = req.body.price_max;
    }
    else{query.price_max = 999999999;}

    //date period : start_date ,end_date
    if(req.body.start_date){
        query.pre =  new Date(req.body.start_date);
    }
    else{query.pre =new Date( "2018-01-01");}
    if(req.body.end_date){
        query.post =  new Date(req.body.end_date)
    }
    else{query.post =new Date ("2025-01-01");}
    
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



// listing all tours
//TODO: 
const list  = async(req, res) => {
    console.log('I am here getting tour');
    try{
        const tours = await Tour.find();
        res.json(tours);
    }catch(err){
        res.json({message:err});
    }

};

const remove = (req, res) => {
    Tour.findByIdAndRemove(req.params.id).exec()
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
    }

    Tour.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true})
        .exec()
        .then(tour => res.status(200).json(tour))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};
module.exports = {
    create,
    search,
    //  read,
    update,
    remove,
    list
};