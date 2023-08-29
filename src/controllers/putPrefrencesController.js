import fs from "fs";
import path from "path";
import { prefSchema } from "../validators/prefSchema.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Method to set user's news Prefrences
 * @param {*} req
 * @param {*} res
 */
export const putPrefrencesController = async (req, res) => {
  let data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", process.env.USER_FILE_DB_NAME))
  );

  if (req.user) {
    try {
      let value = await prefSchema.validateAsync(req.body);
      const userIndex = data.usersList.findIndex(
        (user) => user?.id === req?.user?.id
      );
      data.usersList[userIndex].preferences = req.body;
      const writePath = path.join(
        __dirname,
        "..",
        process.env.USER_FILE_DB_NAME
      );
      fs.writeFileSync(writePath, JSON.stringify(data), {
        encoding: "utf-8",
        flag: "w",
      });
      res.status(200).send("Preferences updated successfully");
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  } else {
    res.status(403).send(req.message);
  }
};
