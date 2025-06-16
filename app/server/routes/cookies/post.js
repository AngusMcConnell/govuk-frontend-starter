const getCookiePreferences = require("./utils/getCookiePreferences");
const setCookiePreferences = require("./utils/setCookiePreferences");

/**
 * Set the user's cookie preferences in a cookie.
 *
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 * @param {import('express').NextFunction} next - Next middleware function
 * @returns {void}
 */
module.exports = (req, res, next) => {
  try {
    const isHtmx = req.headers["hx-request"] === "true";
    const analytics = req.body.analytics === "yes";

    setCookiePreferences(res, { analytics });

    if (isHtmx) {
      res.render("partials/cookies-page/notification-banner.njk");
    } else {
      res.render("cookies.njk", {
        cookiePreferences: getCookiePreferences(req),
        notification: true,
      });
    }
  } catch (err) {
    next(err);
  }
};
