import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const signUpBodyValidation = (body) => {
  const schema = Joi.object({
    username: Joi.string().required().label("User Name"),
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(body);
};

const logInBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(body);
};  
export { signUpBodyValidation, logInBodyValidation };
