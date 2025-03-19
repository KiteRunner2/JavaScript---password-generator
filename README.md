# 🔐 Secure Password Generator

A modern, feature-rich password generator built with vanilla JavaScript that helps create strong, customizable passwords instantly.

## ✨ Features

- **Customizable Password Composition**

  - Include uppercase letters (A-Z)
  - Include lowercase letters (a-z)
  - Include numbers (0-9)
  - Include special characters (!@#$%^&\*()\_+=?<>,.)

- **Flexible Length Options**

  - Choose password length from 8 to 128 characters
  - Default length of 16 characters

- **User-Friendly Interface**

  - Visual sliders for easy length adjustment
  - One-click password generation
  - Copy to clipboard functionality
  - Visual feedback for successful actions

- **Password History**

  - Stores last 10 generated passwords locally
  - Quick access to recently generated passwords
  - Clear history option for privacy

## 🛠️ How It Works

1. The application builds a character set based on user's selected criteria (uppercase, lowercase, numbers, symbols)
2. Random characters are selected from this set to build a password of the specified length
3. The password is validated to ensure it contains at least one character from each selected category
4. If validation fails, the generation process repeats until all criteria are met

## 🚀 Live Demo

Try it out: [Secure Password Generator](https://safe-password-generator.netlify.app)

## 💻 Technologies Used

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- Local Storage API

## 🔍 Security Notes

- All password generation happens client-side - no data is sent to any server
- Generated passwords are stored only in your browser's local storage
- Clear your password history after use on shared devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⚡ Made with vanilla JavaScript
