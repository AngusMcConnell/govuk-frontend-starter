/**
 * Render the start page.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
module.exports = (req, res, next) => {
  try {
    res.render("start.njk");
  } catch (err) {
    next(err);
  }
};
