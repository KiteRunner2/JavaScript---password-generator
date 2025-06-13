# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `yarn build` or `npm run build` - Build the project (uses webpack)
- No automated tests currently configured
- To run locally: Open index.html directly in browser or use a local HTTP server

## Architecture Overview
This is a client-side password generator built with vanilla JavaScript:

- **Core Logic**: Password generation happens in src/index.js with character set building, random selection, and validation
- **State Management**: Uses localStorage to persist password history (last 10 passwords) with the key 'generatedPasswordHistory'
- **UI Pattern**: Event-driven interface with checkbox validation to enable/disable generation button
- **Security Model**: All operations are client-side only - no server communication

## Key Functions
- `generateRandCharacter()` - Random character selection from character sets
- `savePassword()` - Manages localStorage persistence with 10-item limit
- `disableButton()` - UI state management based on checkbox selections
- `getWorkingString()` - Builds character sets based on user criteria

## Code Style Guidelines
- **Strings**: Use single quotes for string literals
- **Naming**: Use camelCase for variables and functions
- **Functions**: Use standard function declarations (not arrow functions)
- **DOM Manipulation**: Use standard methods (getElementById, querySelectorAll)
- **Constants**: Uppercase for constants (e.g., `const KEY = 'generatedPasswordHistory'`)
- **Indentation**: 2 spaces