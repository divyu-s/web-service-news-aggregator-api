import Joi from "joi";

export const userSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().min(1).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(8).required(),
  preferences: Joi.object({
    categories: Joi.array().required(),
  }).required(),
});
