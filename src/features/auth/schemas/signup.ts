import Joi, { ObjectSchema } from 'joi'

const signupSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().required().min(4).max(8).messages({
    "string.base": "Username must be of type string",
    "string.min": "Username must be at least 4 characters long",
    "string.max": "Username must be at most 8 characters long",
    "string.empty": "Username cannot be empty",
  }),
  password: Joi.string().required().min(4).max(8).messages({
    "string.base": "Password must be of type string",
    "string.min": "Password must be at least 4 characters long",
    "string.max": "Password must be at most 8 characters long",
    "string.empty": "Password cannot be empty",
  }),
  email: Joi.string().required().email().messages({
    "string.base": "Email must be of type string",
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email address",
  }),
  avatarColor: Joi.string().required().messages({
    "any.required": "Avatar color is required"
  }),
  avatarImage: Joi.string().messages({
    "any.required": "Avatar Image is required"
  })
})

export {signupSchema}
