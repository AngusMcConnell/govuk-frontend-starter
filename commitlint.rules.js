// const configConventional = require("@commitlint/config-conventional");

module.exports = {
  // rules: {
  //   "type-enum": [
  //     2,
  //     "always",
  //     [
  //       ...configConventional.rules["type-enum"][2],
  //       "deps", // Required for Release Please support
  //     ],
  //   ],
  // },
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "deps", // Required for Release Please support
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
};
