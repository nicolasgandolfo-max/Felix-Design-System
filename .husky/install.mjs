// Sets up Husky git hooks for LOCAL development only.
//
// Skips entirely in CI / production builds (Vercel sets CI=1 and VERCEL=1):
// git hooks aren't used there, and husky may not be on PATH — which is what
// printed `sh: husky: command not found` during `npm install` on Vercel.
//
// Run via the root `prepare` script: `node .husky/install.mjs`.
if (process.env.CI || process.env.VERCEL || process.env.NODE_ENV === "production") {
  process.exit(0);
}

try {
  const husky = (await import("husky")).default;
  husky();
} catch {
  // husky not installed (e.g. a production/no-dev-deps install) — nothing to do.
}
