const Joi = require('@hapi/joi')

const registerloginValidation = data => {
const schema = {
    email: Joi.string()
    .min(6)
    .required()
    .email(),
    password: Joi.string()
    .min(5)
    .required()
};
return Joi.ValidationError(data,schema);
}
/*
const countryCodeValidator = function(code) {
    //...some validation against a list of country codes
    const code = countries.getNames('en');
    if (code === undefined) {
        return next(new NotFoundError('Country not found'));
 }

  };
   
  //Set validator
  JoiCountry.setValidator(countryCodeValidator);
   
  module.exports = Joi.extend(JoiCountry);

const tourValidation = data => {
    const schema = {
        date: Joi.string()
        .min(6)
        .required(),
        country: Joi.string()
    };
    return Joi.ValidationError(data,schema);
    }
   
     */
    module.exports = {
        registerloginValidation
    };