const Review = require('../models/Review');
const Tour = require('../models/Tour');

const create = async (req, res) => {
    
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    tour = await Tour.findById(
        req.params.tour_id
    ).exec();
    let updated_reviews = tour.reviews
    const num_old_reviews = Object.keys(tour.reviews).length;
    new_review = new Review({
            tour_id: tour._id, 
            rating: req.body.rating,
            content: req.body.comment
    })
    created_review = await Review.create(new_review,async (err,review)=>{
        if (err) {};
        updated_reviews.push(review._id);
        console.log('old avg rating:');
        console.log(tour.avg_rating );
        const updated_avg_rating = (tour.avg_rating * num_old_reviews + req.body.rating)/(num_old_reviews+1);
        
        await Tour.findByIdAndUpdate(
            req.params.id,
            {avg_rating: updated_avg_rating,
                reviews: updated_reviews}
        );
        
    });
    res.json(created_review); 
    
}



module.exports = {
    create
};