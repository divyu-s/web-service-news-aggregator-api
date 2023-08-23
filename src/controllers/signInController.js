import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signInUserSchema } from "../validators/signInUserSchema.js";
import devData from "../data.json" assert { type: "json" };
import testData from "../data_test.json" assert { type: "json" };

/**
 * Method handles signIn process
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const signInController = async (req, res) => {
  let data;
  if (process.env.NODE_ENV === "test") {
    data = testData;
  }
  if (process.env.NODE_ENV === "dev") {
    data = devData;
  }

  try {
    let value = await signInUserSchema.validateAsync(req.body);
    const user = data.usersList.find((user) => user.email === value.email);
    if (!user) {
      throw { message: "Email is not registered" };
    } else {
      const isPasswordVailed = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordVailed) {
        throw { message: "Invailed Password" };
      }
      const token = jwt.sign(
        {
          id: user?.id,
        },
        process.env.JWT_TOKEN_SECRET,
        {
          expiresIn: 86400,
        }
      );

      res.status(200).json({
        name: user.name,
        email: user.email,
        accessToken: token,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
