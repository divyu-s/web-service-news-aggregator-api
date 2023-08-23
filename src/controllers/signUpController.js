import bcrypt from "bcrypt";
import { signUpUserSchema } from "../validators/signUpUserSchema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Method handles registration process of a user
 * @param {*} req
 * @param {*} res
 */
export const signUpController = async (req, res) => {
  let data;
  if (process.env.NODE_ENV === "test") {
    data = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "data_test.json"))
    );
  }
  if (process.env.NODE_ENV === "dev") {
    data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data.json")));
  }

  try {
    let value = await signUpUserSchema.validateAsync({
      id: Date.now(),
      ...req.body,
    });
    const user = data.usersList.find((user) => user.email === value.email);
    if (user) {
      throw { message: "Email is already registered" };
    }
    value = {
      ...value,
      password: bcrypt.hashSync(value.password, 8),
    };
    data.usersList.push(value);

    const writePath =
      process.env.NODE_ENV === "test"
        ? path.join(__dirname, "..", "data_test.json")
        : path.join(__dirname, "..", "data.json");
    fs.writeFileSync(writePath, JSON.stringify(data), {
      encoding: "utf-8",
      flag: "w",
    });

    res.status(200).send("User registered successfully");
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
