const Joi = require('@hapi/joi')

const registerloginValidation = data => {
const schema = {
    username:Joi.string().max(20),
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
    module.exports = {
        registerloginValidation
    };