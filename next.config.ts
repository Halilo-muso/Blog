import type { NextConfig } from "next";
import { legacyContentRedirects } from "./lib/redirects";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
  async redirects() {
    return [...legacyContentRedirects];
  },
};

export default nextConfig;
