const Joi = require("joi");

module.exports.serverValidationSchema = Joi.object({
  card: Joi.object({
    dishname: Joi.string().required(),
    avtar: Joi.string().allow("", null),
    protein: Joi.number().required().min(2),
    duration: Joi.number().required().min(0),
    msg: Joi.string().required().min(10),
    Ing: Joi.string().allow("", null),
    req: Joi.string().allow("", null),
  }),
});

module.exports.serverValidationSchemaReviews = Joi.object({
  review: Joi.object({
    Comment : Joi.string().required(),
    rating:Joi.number().min(1).max(5),
  }),
});
