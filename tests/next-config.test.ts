import assert from "node:assert/strict";
import test from "node:test";
import nextConfig from "../next.config";

test("next config traces content files for server-rendered routes", () => {
  assert.deepEqual(nextConfig.outputFileTracingIncludes, {
    "/*": ["./content/**/*"],
  });
});
