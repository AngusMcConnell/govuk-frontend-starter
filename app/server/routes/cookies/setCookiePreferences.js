function setCookiePreferences(res, preferences) {
  res.cookie(
    "cookie_policy",
    JSON.stringify({
      analytics: preferences.analytics,
      version: 1,
    }),
    {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      secure:
        process.env.NODE_ENV === "production" &&
        // Safari doesn't allow setting secure cookies on http connections
        !process.env.CI,
      httpOnly: true,
      sameSite: "strict",
    },
  );
}

module.exports = setCookiePreferences;
