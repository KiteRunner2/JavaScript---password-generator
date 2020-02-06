# Password Generator
 Password generator in JavaScript

Application for password generation created in JavaScript.
1. User can select password that can contain eiter: lower case, upper case, digits or special characters.
2. User can choose password length between 8-128 characters. Initial setting is 12 characters.

How code works:
1. Based on user selection, "working string" is created that is used to pick up random characters from
2. I am using function in the loop (based on password length) to pick up random characters from "working string"
3. After password is generated I am doing addtitional check if password contains characters required by user. If it does not contain required characters then password generation is invoked again.
4. User has an option to copy password string to computer/mobile clipboard.

Website with application: https://kiterunner2.github.io/Boothomework_03/


