/**
 * Method to retrive user's news Prefrences
 * @param {*} req
 * @param {*} res
 */
export const retrivePrefrenceController = (req, res) => {
  if (req.user) {
    res.status(200).json(req.user.preferences);
  } else {
    res.status(403).send(req.message);
  }
};
