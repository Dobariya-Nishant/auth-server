import Joi from "joi";

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  age: Joi.number().required().min(5).max(120),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email().lowercase(),
  password: Joi.string().required(),
}).xor("username", "email");

export { signupSchema, loginSchema };
