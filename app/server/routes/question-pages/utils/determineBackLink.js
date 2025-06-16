/**
 * Determines the appropriate URL for the back link component.
 *
 * @param {import('express').Request} req
 * @param {string} defaultBackLink
 * @returns {string}
 */
function determineBackLink(req, defaultBackLink) {
  const referer = req.get("Referer") || "";
  if (referer.includes("/check-answers")) {
    return "/apply-juggling-license/check-answers";
  }

  return defaultBackLink;
}

module.exports = {
  determineBackLink,
};
