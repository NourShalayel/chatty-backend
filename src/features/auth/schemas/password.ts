import Joi, { ObjectSchema } from 'joi'

const emailSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string().required().email().messages({
    "string.base": "Email must be of type string",
    "string.required": "Email cannot be empty",
    "string.email": "Email must be a valid email address",
  })
});

const passwordSchema: ObjectSchema = Joi.object().keys({
  password: Joi.string().required().min(4).max(8).messages({
    "string.base": "Password must be of type string",
    "string.min": "Password must be at least 4 characters long",
    "string.max": "Password must be at most 8 characters long",
    "string.empty": "Password cannot be empty",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    "any.only": "Password should match",
    "any.required": "Confirm Password is a required field ",

  }),
});

export {emailSchema , passwordSchema}
