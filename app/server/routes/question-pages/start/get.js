module.exports = (req, res, next) => {
  try {
    res.render("start.njk");
  } catch (err) {
    next(err);
  }
};
