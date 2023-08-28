import Joi from "joi";

export const signUpUserSchema = Joi.object()
  .keys({
    id: Joi.number().integer().required(),
    name: Joi.string().min(1).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(8).required(),
    preferences: Joi.object()
      .keys({
        categories: Joi.array()
          .items(Joi.number().integer().valid(1, 2, 3, 4, 5, 6, 7, 8, 9))
          .unique()
          .required(),
      })
      .required()
      .unknown(false),
  })
  .unknown(false);
