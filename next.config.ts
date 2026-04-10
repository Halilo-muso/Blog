import type { NextConfig } from "next";
import { legacyContentRedirects } from "./lib/redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return [...legacyContentRedirects];
  },
};

export default nextConfig;
