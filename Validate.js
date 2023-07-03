const Joi = require("joi");

const User = (data) => {
  const schema = Joi.object({
    Name: Joi.string().required(),
    Email: Joi.string().required(),
    Password: Joi.string().required(),
    phoneNumber: Joi.number().required(),
  });
  return schema.validate(data);
};

const Products = (data) => {
  const schema = Joi.object({
    productName: Joi.string().required(),
    Price: Joi.string().required(),
    Category: Joi.string().required(),
    Description: Joi.string(),
    Rating: Joi.number(),
  });
  return schema.validate(data);
};

module.exports.User = User;
module.exports.Products = Products;
