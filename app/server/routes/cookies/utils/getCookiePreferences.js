/**
 * Gets the user's cookie preferences from the request.
 *
 * @param {import('express').Request} req - Request object
 * @returns {CookiePreferences | null} - Cookie preferences
 */
function getCookiePreferences(req) {
  if (!req.cookies?.cookie_policy) {
    return null;
  }

  return JSON.parse(req.cookies.cookie_policy);
}

module.exports = getCookiePreferences;

/** A user's cookie preferences for this service.
 * @typedef {Object} CookiePreferences
 * @property {boolean} analytics - Whether the user has opted in to analytics.
 */
