var numberList = '0123456789';
var letterList = 'abcdefghijklmnopqrstuvwxyz';
var specialList = '!@#$%^&*()_+=?<>,.';
var passLenght = 8;
var includeUpperCase = true;
var includeLowerCase = true;
var includeNumber = true;
var includeSpecial = true;
var password = '';
/*
// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

*/

function generateRandCharacter(str)
  {
    var num = Math.floor(Math.random()*str.length);
    return str[num];
  }

  for (var k=1;k<=passLenght;k++)
    {
      //if (inc)
      password += generateRandCharacter(letterList);
    }


function disableButton()
    {
      if (document.querySelectorAll("input")[0].checked == false &&
      document.querySelectorAll("input")[1].checked == false &&
      document.querySelectorAll("input")[2].checked == false &&
      document.querySelectorAll("input")[3].checked == false)
      { 
        document.getElementById("generate").disabled = true;
      }
      else document.getElementById("generate").disabled = false;
    }

function generatePassword()
    {
      //do somethin

      console.log('Generating...' + slider.value);
      
    }

function init()
    {
      document.querySelectorAll("input")[0].addEventListener("click",disableButton);
      document.querySelectorAll("input")[1].addEventListener("click",disableButton);
      document.querySelectorAll("input")[2].addEventListener("click",disableButton);
      document.querySelectorAll("input")[3].addEventListener("click",disableButton);
      document.getElementById("generate").addEventListener("click",generatePassword);
      
      var slider = document.getElementById("slider");
      var output = document.getElementById("passlen");
      output.value = slider.value; 
      slider.oninput = function() {
          output.value = this.value;
      }
    }

init();