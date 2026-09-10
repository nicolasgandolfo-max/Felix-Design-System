---
"@felix/ui": patch
---

Ship the typography tokens with real values and a single `@font-face` source:

- `theme.css` now defines `--font-sans` (`"Saans", system-ui, sans-serif`), `--font-heading` (`"Plain", "Saans", system-ui, sans-serif`) and `--font-mono` in `:root`. Before, `@theme inline` referenced them without ever setting a value, so consumers that did not redefine them rendered in the browser fallback.
- `fonts.css` registers `Saans` and `Plain` as unified families with weight ranges (Saans 300 / 400–500 / 600–700, Plain 800–900) instead of the unused weight-suffixed `Saans-300` / `Plain-500` names.
- `tokens.fonts` matches the emitted CSS (no `serif` fallback for Plain, Regular as the Saans base).
