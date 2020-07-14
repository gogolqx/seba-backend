const Tour = require('../models/Tour');
const Booking = require('../models/Booking');

const load  = async(req, res) => {
    console.log('Tour ID:', req.params.id);
    const tour = await Tour.findById(
        req.params.tour_id
    ).exec();
    console.log(tour.dates_seats);
    res.json(tour);

}


const book  = async(req, res) => {
    tour = await Tour.findById(
        req.params.tour_id
    ).exec();
    
    console.log(tour.title);
    const wish = tour.dates_seats[0]; //TODO get wishtime from one of the dates_seats in frontend 
    console.log(tour.dates_seats[0]);
    const rest_seats = wish.seats - req.body.num_participants;
    if(rest_seats>0){
        let new_booking = new Booking ({
            tour_id: tour._id,
            traveller_id: "5ef3c202a01963452bd6fc82", //TODO AUTH
            datetime: wish.date,
            num_participants:req.body.num_participants
        })
        let dates_seats_updated = []
        for (date_seats of tour.dates_seats){
            if (date_seats != wish)
            {dates_seats_updated.push(date_seats);}
            else
            {dates_seats_updated.push({"date" : date_seats.date,"seats": rest_seats})}
        }
        console.log(dates_seats_updated);
        await Booking.create(new_booking)
        .then(booking => res.status(201).json(booking))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
        await Tour.findByIdAndUpdate(
            req.params.id,{"dates_seats":dates_seats_updated},{
            new: true,
            runValidators: true})
            .exec();
        }
        else{ 
            // number of participants exceeds the rest seats
            console.log("not enough available seats!")
        };
};



module.exports = {
    
    load,
    book
};