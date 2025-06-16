const { init } = require("@paralleldrive/cuid2");

/**
 * Handle the form submission on the check answers page.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
module.exports = (req, res, next) => {
  try {
    // Do something with the data, for example storing it in a database
    const createId = init({ length: 8 });
    // In practice, you might get this from an API response
    const referenceNumber = createId().toUpperCase();

    // Clear the session
    req.session.data = null;

    res.render("confirmation.njk", { referenceNumber });
  } catch (err) {
    next(err);
  }
};
