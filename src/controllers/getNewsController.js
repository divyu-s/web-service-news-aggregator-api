import axios from "axios";
import {
  GNEWS_API_PATH,
  GNEWS_API_KEY,
  CATEGORY_MAPPING,
} from "../constants/appConstant.js";

/**
 * Method to get news article from a third party api and send responce back to client
 * @param {*} req
 * @param {*} res
 */
export const getNewsController = (req, res) => {
  if (req.user) {
    const category = req.user.preferences.categories;
    let query = "";
    if (category.length === 0) {
      for (let key in CATEGORY_MAPPING) {
        if (key == 9) {
          query += `${CATEGORY_MAPPING[key]}`;
        } else {
          query += `${CATEGORY_MAPPING[key]} OR `;
        }
      }
    } else {
      for (let i = 0; i < category.length; i++) {
        if (i === category.length - 1) {
          query += `${CATEGORY_MAPPING[i + 1]}`;
        } else {
          query += `${CATEGORY_MAPPING[i + 1]} OR `;
        }
      }
    }
    const path = `${GNEWS_API_PATH}?category=${query}&lang=en&apikey=${GNEWS_API_KEY}`;
    axios
      .get(path)
      .then((resp) => {
        res.status(200).json(resp.data.articles);
      })
      .catch((err) => {
        res.status(404).json({ message: err.message });
      });
  } else {
    res.status(403).send(req.message);
  }
};
