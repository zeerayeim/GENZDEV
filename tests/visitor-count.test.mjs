import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

// --- Isolate the pure endpoint-resolution logic from src/App.tsx so it can
// be unit-tested with plain Node, without needing a DOM/React test setup. ---
async function loadResolveVisitEndpoint() {
  const source = await readFile(new URL("src/App.tsx", projectRoot), "utf8");

  const constants = source.match(
    /const VISIT_NAMESPACE = .*;\nconst VISIT_KEY = .*;/,
  );
  assert.ok(constants, "VISIT_NAMESPACE/VISIT_KEY should exist in src/App.tsx");

  const fn = source.match(
    /export function resolveVisitEndpoint\(alreadyCountedThisSession: boolean\) \{[\s\S]*?\n\}/,
  );
  assert.ok(fn, "resolveVisitEndpoint should exist in src/App.tsx");

  const jsBody = fn[0].replace(
    "export function resolveVisitEndpoint(alreadyCountedThisSession: boolean) {",
    "function resolveVisitEndpoint(alreadyCountedThisSession) {",
  );

  const module = await import(
    `data:text/javascript,${encodeURIComponent(`${constants[0]}\n${jsBody}\nexport { resolveVisitEndpoint };`)}`
  );
  return module.resolveVisitEndpoint;
}

test("a first-time view increments the visitor counter (hit endpoint)", async () => {
  const resolveVisitEndpoint = await loadResolveVisitEndpoint();
  const endpoint = resolveVisitEndpoint(false);
  assert.match(endpoint, /\/hit\//);
});

test("repeat views within the same session only read the count, never increment it", async () => {
  const resolveVisitEndpoint = await loadResolveVisitEndpoint();

  // Simulates a visitor who has already been counted this session (the flag
  // set right after the first successful "hit") browsing further — e.g.
  // reloading the page or opening several product detail views. None of
  // these subsequent "views" should be able to bump the visitor count.
  for (let view = 0; view < 5; view += 1) {
    const endpoint = resolveVisitEndpoint(true);
    assert.match(endpoint, /\/get\//);
    assert.doesNotMatch(endpoint, /\/hit\//);
  }
});

test("opening a product's detail view never touches the visitor-count fetch", async () => {
  const source = await readFile(new URL("src/App.tsx", projectRoot), "utf8");

  // The "View product" button (and the modal it opens) must only ever
  // update local UI state — it must not call fetch(), and must not call
  // resolveVisitEndpoint()/hit the CountAPI counter. This keeps browsing
  // products from ever inflating "site visitors".
  const productViewHandlers = [...source.matchAll(/setSelectedProduct\([^)]*\)/g)].map((m) => m[0]);
  assert.ok(productViewHandlers.length > 0, "expected to find setSelectedProduct usages");
  for (const handler of productViewHandlers) {
    assert.doesNotMatch(handler, /fetch|resolveVisitEndpoint|countapi/i);
  }

  // The visitor-count effect itself must run at most once per mount (empty
  // dependency array + one-shot ref guard), so re-rendering the page while
  // browsing products can't trigger extra hits either.
  assert.match(source, /useEffect\(\(\) => \{\s*if \(hasRun\.current\) return;/);
});
