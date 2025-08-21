module.exports = {
  "frontend/**/*.{js,jsx,ts,tsx}": ["npm run --prefix frontend format", "npm run --prefix frontend lint"],
  "backend/**/*.{js,jsx,ts,tsx}": ["npm run --prefix backend format", "npm run --prefix backend lint"],
  "./*.{md,yml,yaml,json}": ["prettier --write"],
};
