import Joi from "joi";

export const signInUserSchema = Joi.object()
  .keys({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(8).required(),
  })
  .unknown(false);
