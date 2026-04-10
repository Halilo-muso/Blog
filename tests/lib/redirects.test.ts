import assert from "node:assert/strict";
import test from "node:test";
import { legacyContentRedirects } from "@/lib/redirects";

test("legacy diary URLs permanently redirect to their notes equivalents", () => {
  assert.deepEqual(legacyContentRedirects, [
    {
      source: "/blog/2026-04-06-diary",
      destination: "/notes/2026-04-06-diary",
      permanent: true,
    },
    {
      source: "/blog/2026-04-07-diary",
      destination: "/notes/2026-04-07-diary",
      permanent: true,
    },
  ]);
});
