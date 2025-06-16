const setCookiePreferences = require("../utils/setCookiePreferences");

/**
 * Set the user's cookie preferences and render the cookie banner.
 *
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 * @param {import('express').NextFunction} next - Next middleware function
 * @returns {void}
 */
module.exports = (req, res, next) => {
  try {
    const isHtmx = req.headers["hx-request"] === "true";

    const analytics = req.body.cookies.analytics === "yes";
    setCookiePreferences(res, { analytics });

    if (isHtmx) {
      res.render("partials/cookie-banner/confirmation.njk", {
        analytics,
      });
      return;
    }

    const referrer = req.get("Referrer") ?? "/";
    res.redirect(
      `${referrer}?cookieMessage=true&analytics=${String(analytics)}`,
    );
  } catch (err) {
    next(err);
  }
};
