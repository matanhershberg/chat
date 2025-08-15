module.exports = {
  "frontend/**/*.{js,jsx,ts,tsx}": [
    "npm run --prefix frontend format",
    "npm run --prefix frontend lint",
  ],
  "*.{md,yml,yaml,json}": ["prettier --write"],
};
