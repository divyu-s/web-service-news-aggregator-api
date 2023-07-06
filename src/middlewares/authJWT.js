import jwt from "jsonwebtoken";
import data from "../data.json" assert { type: "json" };

/**
 * Method to verify JWT token and attach appropiate user in request
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_TOKEN_SECRET,
      (err, decode) => {
        if (err) {
          req.user = undefined;
          req.message = "Invailed JWT Token";
          next();
        }
        const user = data.usersList.find((user) => user.id === decode.id);
        if (!user) {
          req.user = undefined;
          req.message = "Invailed JWT Token";
          next();
        }
        req.user = user;
        next();
      }
    );
  } else {
    req.user = undefined;
    req.message = "Authorization header not found";
    next();
  }
};
