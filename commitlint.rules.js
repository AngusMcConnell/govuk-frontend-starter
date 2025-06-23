const configConventional = require("@commitlint/config-conventional");

module.exports = {
  rules: {
    "type-enum": [
      2,
      "always",
      [
        ...configConventional.rules["type-enum"][2],
        "deps", // Required for Release Please support
      ],
    ],
  },
};
