import assert from "node:assert/strict";
import test from "node:test";
import { siteConfig } from "@/lib/site";

test("siteConfig exposes the about-page content needed for the new route", () => {
  assert.ok(siteConfig.about.intro.length > 0);
  assert.ok(siteConfig.about.sections.length >= 2);
  assert.ok(siteConfig.about.sections.every((section) => section.title && section.body));
});
