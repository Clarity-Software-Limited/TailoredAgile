const test = require("node:test");
const assert = require("node:assert/strict");

const {
  escapeHtml,
  buildPdfBundleMarkup,
  openPdfBundle,
} = require("../pdf-export.js");

test("escapeHtml sanitizes reserved characters", () => {
  const input = `<tag attr="x">Tom & Jerry's</tag>`;
  const output = escapeHtml(input);
  assert.equal(output, "&lt;tag attr=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/tag&gt;");
});

test("buildPdfBundleMarkup includes a cover page and one page per item", () => {
  const markup = buildPdfBundleMarkup([
    {
      type: "Planning",
      name: "Story Points",
      description: "Relative sizing",
      overview: "Overview text",
      good: "Good text",
      bad: "Bad text",
      ugly: "Ugly text",
    },
    {
      type: "Collaboration",
      name: "Bike Shedding",
      description: "Too much debate",
      overview: "Overview 2",
      good: "Good 2",
      bad: "Bad 2",
      ugly: "Ugly 2",
    },
  ]);

  const pageMatches = markup.match(/<section class="page/g) || [];
  assert.equal(pageMatches.length, 3);
  assert.match(markup, /Ways of Working/);
  assert.match(markup, /Story Points/);
  assert.match(markup, /Bike Shedding/);
});

test("buildPdfBundleMarkup renders a custom ways of working name", () => {
  const markup = buildPdfBundleMarkup([], { waysOfWorkingName: "Platform Team Playbook" });
  assert.match(markup, /Platform Team Playbook/);
});

test("openPdfBundle opens a writable tab and writes markup", () => {
  const calls = [];
  const fakePrintWindow = {
    document: {
      open() {
        calls.push("doc-open");
      },
      write(value) {
        calls.push(["doc-write", value]);
      },
      close() {
        calls.push("doc-close");
      },
    },
    focus() {
      calls.push("focus");
    },
  };

  const fakeWindow = {
    open(url, target) {
      calls.push(["open", url, target]);
      return fakePrintWindow;
    },
  };

  const didOpen = openPdfBundle(
    [
      {
        type: "Planning",
        name: "Story Points",
        description: "Relative sizing",
        overview: "Overview text",
        good: "Good text",
        bad: "Bad text",
        ugly: "Ugly text",
      },
    ],
    fakeWindow,
    () => {
      throw new Error("alert should not be called when popup opens");
    },
    { waysOfWorkingName: "Team Atlas Ways of Working" },
  );

  assert.equal(didOpen, true);
  assert.deepEqual(calls[0], ["open", "about:blank", "_blank"]);
  assert.equal(calls[1], "doc-open");
  assert.equal(calls[2][0], "doc-write");
  assert.match(calls[2][1], /Team Atlas Ways of Working/);
  assert.match(calls[2][1], /Story Points/);
  assert.equal(calls[3], "doc-close");
  assert.equal(calls[4], "focus");
});

test("openPdfBundle returns false and alerts if popup is blocked", () => {
  let alertCalled = 0;
  const fakeWindow = {
    open() {
      return null;
    },
  };

  const didOpen = openPdfBundle([], fakeWindow, () => {
    alertCalled += 1;
  });

  assert.equal(didOpen, false);
  assert.equal(alertCalled, 1);
});
