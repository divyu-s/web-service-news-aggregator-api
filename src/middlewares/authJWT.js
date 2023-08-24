import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Method to verify JWT token and attach appropiate user in request
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const verifyToken = (req, res, next) => {
  let data;
  if (process.env.NODE_ENV === "test") {
    data = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "data_test.json"))
    );
  }
  if (process.env.NODE_ENV === "dev") {
    data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data.json")));
  }

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
