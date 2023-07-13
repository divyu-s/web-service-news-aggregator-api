import { getData } from "../services/httpService.js";
import { GNEWS_API_PATH, CATEGORY_MAPPING } from "../constants/appConstant.js";

// Cache object
const cache = {};
const cacheExpirationTime = 60 * 1000;

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
    const path = `${GNEWS_API_PATH}?category=${query}&lang=en&apikey=${process.env.GNEWS_API_KEY}`;

    if (checkCache(path).cached) {
      res.send(checkCache(path).data);
    } else {
      getData(path)
        .then((resp) => {
          cache[path] = { timestamp: Date.now(), data: resp.data.articles };
          res.status(200).json(resp.data.articles);
        })
        .catch((err) => {
          res.status(404).json({ message: err.message });
        });
    }
  } else {
    res.status(403).send(req.message);
  }
};

const checkCache = (cacheKey) => {
  if (cache.hasOwnProperty(cacheKey)) {
    const cachedData = cache[cacheKey];
    const currenTime = Date.now();
    if (currenTime - cachedData.timestamp < cacheExpirationTime) {
      return { cached: true, data: cache[cacheKey] };
    }
    delete cache[cacheKey];
    return { cached: false, data: [] };
  }
  return { cached: false, data: [] };
};
