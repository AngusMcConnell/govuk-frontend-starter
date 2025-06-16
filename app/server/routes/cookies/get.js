const getCookiePreferences = require("./utils/getCookiePreferences");

/**
 * Render the cookies page with the user's cookie preferences.
 *
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 * @param {import('express').NextFunction} next - Next middleware function
 * @returns {void}
 */
module.exports = (req, res, next) => {
  try {
    res.render("cookies.njk", {
      cookiePreferences: getCookiePreferences(req),
    });
  } catch (err) {
    next(err);
  }
};
