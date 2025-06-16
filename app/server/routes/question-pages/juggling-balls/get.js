const { determineBackLink } = require("../utils");

/**
 * Render the 'How many balls can you juggle?' question page.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
module.exports = (req, res, next) => {
  try {
    const backLinkUrl = determineBackLink(req, "/apply-juggling-license/start");

    res.render("juggling-balls.njk", {
      data: req.session.data,
      backLinkUrl,
    });
  } catch (err) {
    next(err);
  }
};
