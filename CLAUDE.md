# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `npm run build` - Build the project (webpack, requires webpack to be installed)
- No automated tests currently configured
- To run locally: Open `index.html` directly in a browser (no build step needed; `src/index.js` is loaded via script tag)

## Architecture Overview
Client-side password generator built with vanilla JavaScript — single-page app with no framework or build step required for development.

- **Entry point**: `index.html` loads `style.css` and `src/index.js` directly
- **All logic** lives in `src/index.js` — the `init()` function at the bottom wires up all event listeners on load
- **Generation flow**: `generatePassword()` → `getWorkingString()` (builds charset from checked checkboxes) → loops `generateRandCharacter()` until `isMatchingConditions()` validates the password contains at least one char from each selected category
- **State**: localStorage key `'generatedPasswordHistory'` stores an array of `{time, password}` objects, capped at 10 entries
- **Checkbox ↔ button coupling**: `disableButton()` disables the generate button when no checkboxes are checked; checkboxes are identified by DOM index position (0=uppercase, 1=lowercase, 2=numbers, 3=symbols)

## Code Style Guidelines
- **Strings**: Use single quotes for string literals
- **Naming**: Use camelCase for variables and functions
- **Functions**: Use standard function declarations (not arrow functions)
- **DOM Manipulation**: Use standard methods (getElementById, querySelectorAll)
- **Constants**: Uppercase for constants (e.g., `const KEY = 'generatedPasswordHistory'`)
- **Indentation**: 2 spaces