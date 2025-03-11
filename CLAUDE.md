# Password Generator Project Guidelines

## Commands
- `yarn build` or `npm run build` - Build the project (uses webpack)
- `yarn start` or `npm start` - Run the project locally using a simple HTTP server (add manually)
- No automated tests currently configured

## Code Style Guidelines
- **Strings**: Use single quotes for string literals
- **Naming**: Use camelCase for variables and functions
- **Functions**: Use standard function declarations (not arrow functions)
- **DOM Manipulation**: Use standard methods (getElementById, querySelectorAll)
- **Error Handling**: Use simple conditional checks
- **Data Storage**: Use localStorage for persistent data (password history)
- **Regular Expressions**: Used for validation of password criteria
- **Constants**: Uppercase for constants (e.g., `const KEY = 'generatedPasswordHistory'`)

## Project Structure
- Separate HTML, CSS, and JavaScript files
- Entry point is src/index.js
- Password generation logic in JavaScript with configurable options
- Responsive design with CSS

## Best Practices
- Single responsibility functions
- Avoid global variables
- Keep functions small and focused
- Maintain proper indentation (2 spaces)
- Use clear and descriptive variable/function names