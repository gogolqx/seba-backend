const Tour = require('../models/Tour');
nodeGeocoder = require('node-geocoder');
const options = {
    provider: 'openstreetmap'
  };
function timeToString(h, m) {
    if (h < 10) h = '0' + h;
    if (m < 10) h = '0' + h;
    return 'T'+h + ':' + m + ':' + '00Z';
}
var add_schedule =  function (dt, hours,mins) {
    return new Date(dt.getTime() + hours*60*60*1000+mins*60*1000);
}
const crg = require('country-reverse-geocoding').country_reverse_geocoding();
const geoCoder = nodeGeocoder(options);
const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    let new_req ;
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
            // for reverse
            // latitude = geo_json[0]["latitude"];
            //latitude = geo_json[0]["longitude"];
             dates = req.body.dates;
             
             for (let date of dates) {
                new_date = new Date(date);
                 for(let schedule of req.body.schedules){
                    date_time = add_schedule(new_date,schedule.hours,schedule.minutes);
                    new_dates.push(date_time);
                }
             };
             new_req ={
                title:req.body.title,
                dates:dates,
                description:req.body.description,
                country: crg.get_country(latitude,longitude),
                city: req.body.city,
                lat:latitude,
                lon:longitude,
                dates:new_dates,
                schedules: req.body.schedules,
                duration:req.body.duration,
                price:req.body.price,
                preference:req.body.preference
             }
             console.log(geo_json[0]);
            })
            .catch((err)=> {
                console.log(err);
              });

    Tour.create(new_req)
        .then(tour => res.status(201).json(tour))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};
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
        runValidators: true}).exec()
        .then(tour => res.status(200).json(tour))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const list  = async(req, res) => {
    console.log('I am here getting tour');
    try{
        const tours = await Tour.find();
        res.json(tours);
    }catch(err){
        res.json({message:err});
    }

};
const search = async(req, res) => {
    var query ={};
  
    if (req.body.city){
        query.city = req.body.city;
    }
    
    if (req.body.price_min){
        query.price_min = req.body.price_min;
    }
    else{query.price_min=-1;}
    
    if (req.body.price_max){
        query.price_max = req.body.price_max;
    }
    else{query.price_max = 999999999;}
    if(req.body.start_date){
        query.pre =  new Date(req.body.start_date);
 }
 if(req.body.end_date){
    query.post =  new Date(req.body.end_date);
 }
 
//diff_days=(query.post-query.pre)/86400000;
//period=[];
//res = [];
//for (i = 0; i <= diff_days; i++) { 
   // period.push(add_schedule(query.pre,i*24,0));
   last_day =add_schedule(query.post,23,59);
  
    const tours = await Tour.find({
                        city:query.city,
                        //price:{$gte: query.price_min,  $lte: query.price_max},
                        //dates:{$gt: query.start_date}
                        dates:{$gte: query.pre,$lte:last_day } 
                    }).exec();
    res.json(tours);
//}
};



const remove = (req, res) => {
    Tour.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Tour with id${req.params.id} was deleted`}))
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