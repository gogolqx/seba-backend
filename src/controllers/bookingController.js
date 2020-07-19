const Tour = require('../models/Tour');
const Booking = require('../models/Booking');
const User = require('../models/User');

const load  = async(req, res) => {
    const tour = await Tour.findById(
        req.params.tour_id
    ).exec();
    res.json(tour);
}

const book  = async(req, res) => {
    tour = await Tour.findById(
        req.params.tour_id
    ).exec();

    var wish = null;

    if (req.body.desiredDateTimeID) {
     wish = req.body.desiredDateTimeID; //TODO get wishtime from one of the dates_seats in frontend
    }
    else {console.log("Test mode: Please give a request of desiredDateTimeID. Using the first dates_seats for testing");
        wish = tour.dates_seats[0]
    }

    const rest_seats = wish.seats - req.body.num_participants;
    if(rest_seats > -1){
        let new_booking = new Booking ({
            tour_id: tour._id,
            traveller_id: req.userId,
            datetime: wish.date,
            num_participants:req.body.num_participants
        })
        let dates_seats_updated = []
        for (date_seats of tour.dates_seats){
            if (date_seats._id != wish._id)
            {dates_seats_updated.push(date_seats);}
            else
            {
                dates_seats_updated.push({"date" : date_seats.date,"seats": rest_seats})}
        }
        await Booking.create(new_booking)
        .then(booking => res.status(201).json(booking))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
        await Tour.findByIdAndUpdate(
            req.params.tour_id,{"dates_seats":dates_seats_updated},{
            new: true,
            runValidators: true})
            .exec();
        }
        else{
            // number of participants exceeds the rest seats
            console.log("not enough available seats!")
        };
};

const usersTour  = async(req, res) => {
  const user = await User.findOne(
      {username : req.params.username}
  ).select().exec();

  if (user.role === "guide") return res.status(404).json({
      error: 'Not Found',
      message: `User not found`
  });
  const bookings = await Booking.find(
    {traveller_id:user._id}
  ).exec();

  // const allTours = [];
  const allCategories = [];
  for (let booking of bookings) {
      const tours = await Tour.find(
        {_id:booking.tour_id}
      ).exec();
      for (let tour of tours) {
        allCategories.push(tour.preference);
      }
  };
  // sending all categories that coming from previous bookings of the user.
  res.json(allCategories);
};

module.exports = {
    load,
    book,
    usersTour
};
