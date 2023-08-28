import Joi from "joi";

export const prefSchema = Joi.object()
  .keys({
    categories: Joi.array()
      .items(Joi.number().integer().valid(1, 2, 3, 4, 5, 6, 7, 8, 9))
      .unique()
      .required(),
  })
  .unknown(false);
