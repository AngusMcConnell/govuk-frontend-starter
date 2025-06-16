/**
 * Render the check answers page.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
module.exports = (req, res, next) => {
  try {
    if (req.session.data == null) {
      throw new Error(
        "Attempted to load check answers page without session data",
      );
    }

    const backLinkUrl = "/apply-juggling-license/juggling-trick";

    res.render("check-answers.njk", {
      data: req.session.data,
      backLinkUrl,
    });
  } catch (err) {
    next(err);
  }
};
