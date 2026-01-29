# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `npm run build` - Build the project (webpack, requires webpack to be installed)
- No automated tests currently configured
- To run locally: Open `index.html` directly in a browser (no build step needed; `src/index.js` is loaded via script tag)

## Architecture Overview
Client-side password generator built with vanilla JavaScript — single-page app with no framework or build step required for development. Deployed as a PWA to Netlify.

- **Entry point**: `index.html` loads `style.css` and `src/index.js` directly
- **All logic** lives in `src/index.js` — the `init()` function at the bottom wires up all event listeners on load
- **Generation flow**: `generatePassword()` → `getWorkingString()` (builds charset from `CHARSETS` based on checked checkboxes, optionally filtering `AMBIGUOUS_CHARS`) → loops `generateRandCharacter()` until `isMatchingConditions()` validates the password contains at least one char from each selected category
- **Configuration constants**: `CHARSETS` (character pools), `PATTERNS` (validation regexes), and `CHECKBOX_CONFIG` (maps checkbox element IDs to charset keys) drive all checkbox-dependent logic — `disableButton()`, `getWorkingString()`, `isMatchingConditions()`, and `init()` all iterate over `CHECKBOX_CONFIG` rather than using DOM index positions
- **State**: Two localStorage keys:
  - `'generatedPasswordHistory'` — array of `{time, password}` objects, capped at 10 entries
  - `'passwordGeneratorSettings'` — persists checkbox states and password length across sessions (`saveSettings()`/`loadSettings()`)
- **Strength meter**: `calculateStrength()` computes entropy from pool size and password length (thresholds: <28 weak, <36 fair, <60 strong, 60+ very strong), with a downgrade when only 1 category is used. `updateStrengthMeter()` applies the corresponding CSS class.
- **Length validation**: `clampLength()` enforces 8–128 range on the length input, applied on both `input` and `blur` events

## Code Style Guidelines
- **Strings**: Use single quotes for string literals
- **Naming**: Use camelCase for variables and functions
- **Functions**: Use standard function declarations (not arrow functions)
- **DOM Manipulation**: Use `getElementById`; reference checkboxes via `CHECKBOX_CONFIG`, not DOM index
- **Constants**: Uppercase for constants (e.g., `const KEY = 'generatedPasswordHistory'`)
- **Indentation**: 2 spaces
- **Formatting**: Prettier with `printWidth: 120`, `singleQuote: true`, `trailingComma: 'es5'`
