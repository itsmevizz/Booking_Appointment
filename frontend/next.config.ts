import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = {
      react: "React",
      "react-dom": "ReactDOM",
    };
    return config;
  },
  output: "standalone", // Ensures the app is packaged correctly for standalone deployment
};

export default nextConfig;
