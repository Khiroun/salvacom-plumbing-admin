//next.config.js
const withImages = require("next-images");

const withTM = require("next-transpile-modules")(["react-bingmaps"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(withImages(nextConfig));
