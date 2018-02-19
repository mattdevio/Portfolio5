module.exports = {
  "env": {
    "browser": true,
  },
  "extends": "airbnb",
  "rules": {
    "no-console": 0,
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    "jsx-quotes": ["error", "prefer-single"],
    "padded-blocks": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to", "hrefLeft", "hrefRight" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }],
  },
}
