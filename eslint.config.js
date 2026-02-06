const nextConfig = require("eslint-config-next/core-web-vitals")

module.exports = [
  {
    ignores: ["storybook-static/**"],
  },
  ...(Array.isArray(nextConfig) ? nextConfig : [nextConfig]),
]
