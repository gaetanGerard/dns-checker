import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: {
    resolve: { alias: { [x: string]: string } };
    module: { rules: { test: RegExp; issuer: RegExp; use: string[] }[] };
  }) => {
    config.resolve.alias["@/sass"] = path.resolve(process.cwd(), "src/sass");
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
