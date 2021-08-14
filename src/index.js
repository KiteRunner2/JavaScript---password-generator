const KEY = "generatedPasswordHistory";

function generateRandCharacter(str) {
  let num = Math.floor(Math.random() * str.length);
  return str[num];
}

function disableButton() {
  const checkbox = document.querySelectorAll("input");
  const button = document.getElementById("generate");
  button.disabled = false;
  if (
    checkbox[0].checked == false &&
    checkbox[1].checked == false &&
    checkbox[2].checked == false &&
    checkbox[3].checked == false
  ) {
    button.disabled = true;
  }
}

function savePassword(password) {
  let history = localStorage.getItem(KEY);
  let newHistory = [];
  if (!history) {
    const now = Date.now().toString();
    const data = {
      time: now,
      password,
    };
    newHistory.unshift(data);
    localStorage.setItem(KEY, JSON.stringify(newHistory));
  } else {
    const now = Date.now().toString();
    const data = {
      time: now,
      password,
    };
    history = JSON.parse(history);
    newHistory = [data, ...history];
    newHistory.length = 10;
    localStorage.setItem(KEY, JSON.stringify(newHistory));
  }
}

function getWorkingString() {
  const digits = "0123456789";
  const lowers = "abcdefghijklmnopqrstuvwxyz";
  const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const symbols = "!@#$%^&*()_+=?<>,.";
  let workingString = "";
  const checkbox = document.querySelectorAll("input");
  if (checkbox[0].checked) {
    workingString += uppers;
  }
  if (checkbox[1].checked) {
    workingString += lowers;
  }
  if (checkbox[2].checked) {
    workingString += digits;
  }
  if (checkbox[3].checked) {
    workingString += symbols;
  }
  return workingString;
}

function isMatchingConditions(password) {
  const pattSpec = /[!@#$%^&*()_+=?<>,.]/;
  const pattUp = /[A-Z]/;
  const pattLo = /[a-z]/;
  const pattDig = /\d/;
  let isMatching = true;

  const checkbox = document.querySelectorAll("input");
  if (checkbox[0].checked) {
    if (!pattUp.test(password)) {
      isMatching = false;
    }
  } else {
    if (pattUp.test(password)) {
      isMatching = false;
    }
  }
  if (checkbox[1].checked) {
    if (!pattLo.test(password)) {
      isMatching = false;
    }
  } else {
    if (pattLo.test(password)) {
      isMatching = false;
    }
  }
  if (checkbox[2].checked) {
    if (!pattDig.test(password)) {
      isMatching = false;
    }
  } else {
    if (pattDig.test(password)) {
      isMatching = false;
    }
  }
  if (checkbox[3].checked) {
    if (!pattSpec.test(password)) {
      isMatching = false;
    }
  } else {
    if (pattSpec.test(password)) {
      isMatching = false;
    }
  }
  return isMatching;
}

function generatePassword() {
  let password = "";
  const workingString = getWorkingString();
  while (true) {
    password = "";
    for (n = 1; n <= slider.value; n++) {
      password += generateRandCharacter(workingString);
    }
    if (isMatchingConditions(password)) break;
  }
  savePassword(password);

  document.getElementById("password").value = password;
  displayHistory();
}

function displayHistory() {
  const history = getHistory();
  const historybox = document.getElementById("history");
  historybox.innerHTML = "";
  history.forEach((el, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${el.password}`;
    historybox.appendChild(li);
  });
}

function clearPasswordHistory() {
  localStorage.removeItem(KEY);
  displayHistory();
}

function getHistory() {
  const value = localStorage.getItem(KEY);
  if (value) {
    const history = JSON.parse(value);
    return history;
  }
  return [];
}

function copyPassToClipboard() {
  let copyText = document.getElementById("password");
  copyText.select();
  copyText.setSelectionRange(0, 9999);
  document.execCommand("copy");
  alert("Copied the text: " + copyText.value);
}

function init() {
  let slider = document.getElementById("slider");
  let output = document.getElementById("passlen");
  output.value = slider.value;
  slider.oninput = function () {
    output.value = this.value;
  };
  document
    .querySelectorAll("input")[0]
    .addEventListener("click", disableButton);
  document
    .querySelectorAll("input")[1]
    .addEventListener("click", disableButton);
  document
    .querySelectorAll("input")[2]
    .addEventListener("click", disableButton);
  document
    .querySelectorAll("input")[3]
    .addEventListener("click", disableButton);
  document
    .getElementById("generate")
    .addEventListener("click", generatePassword);
  document
    .getElementById("copy")
    .addEventListener("click", copyPassToClipboard);
  document
    .getElementById("clearHistory")
    .addEventListener("click", clearPasswordHistory);
  displayHistory();
}

init();
