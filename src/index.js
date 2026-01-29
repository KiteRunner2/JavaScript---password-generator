const KEY = 'generatedPasswordHistory';
const SETTINGS_KEY = 'passwordGeneratorSettings';
const AMBIGUOUS_CHARS = 'ilI1LoO0';

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()_+=?<>,.'
};

const PATTERNS = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  digits: /\d/,
  symbols: /[!@#$%^&*()_+=?<>,.]/
};

const CHECKBOX_CONFIG = [
  { id: 'chckUppercase', key: 'uppercase' },
  { id: 'chckLowercase', key: 'lowercase' },
  { id: 'chckNumber', key: 'digits' },
  { id: 'chckSymbol', key: 'symbols' }
];

function generateRandCharacter(str) {
  let num = Math.floor(Math.random() * str.length);
  return str[num];
}

function disableButton() {
  var button = document.getElementById('generate');
  var anyChecked = CHECKBOX_CONFIG.some(function(cfg) {
    return document.getElementById(cfg.id).checked;
  });
  button.disabled = !anyChecked;
}

function savePassword(password) {
  try {
    let history = localStorage.getItem(KEY);
    let newHistory = [];
    var now = Date.now().toString();
    var data = { time: now, password: password };
    if (!history) {
      newHistory.unshift(data);
    } else {
      history = JSON.parse(history);
      newHistory = [data, ...history].slice(0, 10);
    }
    localStorage.setItem(KEY, JSON.stringify(newHistory));
  } catch (e) {
    console.error('Error saving password to localStorage:', e);
  }
}

function getWorkingString() {
  let workingString = '';
  CHECKBOX_CONFIG.forEach(function(cfg) {
    if (document.getElementById(cfg.id).checked) {
      workingString += CHARSETS[cfg.key];
    }
  });
  var ambiguousCheckbox = document.getElementById('chckAmbiguous');
  if (ambiguousCheckbox && ambiguousCheckbox.checked) {
    workingString = workingString.split('').filter(function(ch) {
      return AMBIGUOUS_CHARS.indexOf(ch) === -1;
    }).join('');
  }
  return workingString;
}

function isMatchingConditions(password) {
  let isMatching = true;
  CHECKBOX_CONFIG.forEach(function(cfg) {
    var checked = document.getElementById(cfg.id).checked;
    var matches = PATTERNS[cfg.key].test(password);
    if (checked && !matches) {
      isMatching = false;
    } else if (!checked && matches) {
      isMatching = false;
    }
  });
  return isMatching;
}

function generatePassword() {
  const generateBtn = document.getElementById('generate');

  // Store the original text
  const originalText = generateBtn.textContent;

  // Update button state
  generateBtn.textContent = 'Generating...';
  generateBtn.disabled = true;

  try {
    // Generate the password
    let password = '';
    const workingString = getWorkingString();
    const slider = document.getElementById('slider');

    while (true) {
      password = '';
      for (let n = 1; n <= slider.value; n++) {
        password += generateRandCharacter(workingString);
      }
      if (isMatchingConditions(password)) break;
    }

    // Save and display the password
    savePassword(password);
    document.getElementById('password').value = password;
    displayHistory();
    updateStrengthMeter(password);
  } catch (error) {
    console.error('Error generating password:', error);
  } finally {
    // Always reset the button state, even if an error occurs
    setTimeout(function() {
      generateBtn.textContent = originalText;
      generateBtn.disabled = false;
    }, 100);
  }
}

function displayHistory() {
  const history = getHistory();
  const historybox = document.getElementById('history');
  historybox.innerHTML = '';
  history.forEach(function(el, index) {
    const li = document.createElement('div');
    li.classList.add('history-item');
    const date = new Date(Number(el.time));
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    const textSpan = document.createElement('span');
    textSpan.textContent = index + 1 + '. ' + el.password + ' \u2014 ' + dd + '-' + mm + '-' + yyyy + ' ' + hh + ':' + min + ':' + ss;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn-history-copy';
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', function() {
      navigator.clipboard.writeText(el.password);
      copyBtn.textContent = 'Copied!';
      setTimeout(function() {
        copyBtn.textContent = 'Copy';
      }, 1500);
    });

    li.appendChild(textSpan);
    li.appendChild(copyBtn);
    historybox.appendChild(li);
  });
}

function clearPasswordHistory() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    console.error('Error clearing password history:', e);
  }
  displayHistory();
}

function getHistory() {
  try {
    const value = localStorage.getItem(KEY);
    if (value) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.error('Error reading password history:', e);
  }
  return [];
}

function copyPassToClipboard() {
  let copyText = document.getElementById('password');
  const password = copyText.value;

  if (!password) return;

  copyText.select();
  copyText.setSelectionRange(0, 9999);
  navigator.clipboard.writeText(password);

  // Visual feedback instead of alert
  const btn = document.getElementById('copy');
  const originalText = btn.textContent;
  btn.textContent = 'Copied!';
  btn.style.backgroundColor = 'var(--success)';

  setTimeout(function() {
    btn.textContent = originalText;
    btn.style.backgroundColor = '';
  }, 1500);
}

function clampLength(value) {
  var num = parseInt(value, 10);
  if (isNaN(num) || num < 8) return 8;
  if (num > 128) return 128;
  return num;
}

function saveSettings() {
  try {
    var settings = { length: document.getElementById('slider').value };
    CHECKBOX_CONFIG.forEach(function(cfg) {
      settings[cfg.id] = document.getElementById(cfg.id).checked;
    });
    var ambiguousCheckbox = document.getElementById('chckAmbiguous');
    if (ambiguousCheckbox) {
      settings['chckAmbiguous'] = ambiguousCheckbox.checked;
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings:', e);
  }
}

function loadSettings() {
  try {
    var raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return;
    var settings = JSON.parse(raw);
    var slider = document.getElementById('slider');
    var output = document.getElementById('passlen');
    if (settings.length !== undefined) {
      var len = clampLength(settings.length);
      slider.value = len;
      output.value = len;
    }
    CHECKBOX_CONFIG.forEach(function(cfg) {
      if (settings[cfg.id] !== undefined) {
        document.getElementById(cfg.id).checked = settings[cfg.id];
      }
    });
    var ambiguousCheckbox = document.getElementById('chckAmbiguous');
    if (ambiguousCheckbox && settings['chckAmbiguous'] !== undefined) {
      ambiguousCheckbox.checked = settings['chckAmbiguous'];
    }
  } catch (e) {
    console.error('Error loading settings:', e);
  }
}

function calculateStrength(password) {
  var poolSize = 0;
  var categoriesUsed = 0;
  CHECKBOX_CONFIG.forEach(function(cfg) {
    if (document.getElementById(cfg.id).checked) {
      poolSize += CHARSETS[cfg.key].length;
      categoriesUsed++;
    }
  });
  var ambiguousCheckbox = document.getElementById('chckAmbiguous');
  if (ambiguousCheckbox && ambiguousCheckbox.checked) {
    var removed = 0;
    CHECKBOX_CONFIG.forEach(function(cfg) {
      if (document.getElementById(cfg.id).checked) {
        for (var i = 0; i < CHARSETS[cfg.key].length; i++) {
          if (AMBIGUOUS_CHARS.indexOf(CHARSETS[cfg.key][i]) !== -1) {
            removed++;
          }
        }
      }
    });
    poolSize -= removed;
  }
  if (poolSize <= 0) return 0;
  var entropy = password.length * Math.log2(poolSize);
  var score;
  if (entropy < 28) {
    score = 0;
  } else if (entropy < 36) {
    score = 1;
  } else if (entropy < 60) {
    score = 2;
  } else {
    score = 3;
  }
  if (categoriesUsed <= 1 && score > 1) {
    score = 1;
  }
  return score;
}

function updateStrengthMeter(password) {
  var container = document.getElementById('strengthContainer');
  var fill = document.getElementById('strengthFill');
  var label = document.getElementById('strengthLabel');
  if (!container || !fill || !label) return;
  if (!password) {
    container.style.display = 'none';
    return;
  }
  container.style.display = 'flex';
  var score = calculateStrength(password);
  var levels = [
    { label: 'Weak', cls: 'strength-weak' },
    { label: 'Fair', cls: 'strength-fair' },
    { label: 'Strong', cls: 'strength-strong' },
    { label: 'Very Strong', cls: 'strength-very-strong' }
  ];
  fill.className = 'strength-fill ' + levels[score].cls;
  label.textContent = levels[score].label;
}

function init() {
  var slider = document.getElementById('slider');
  var output = document.getElementById('passlen');

  loadSettings();
  output.value = slider.value;

  slider.oninput = function() {
    output.value = this.value;
    saveSettings();
  };

  output.addEventListener('input', function() {
    var clamped = clampLength(this.value);
    slider.value = clamped;
    this.value = clamped;
    saveSettings();
  });

  output.addEventListener('blur', function() {
    var clamped = clampLength(this.value);
    this.value = clamped;
    slider.value = clamped;
    saveSettings();
  });

  CHECKBOX_CONFIG.forEach(function(cfg) {
    document.getElementById(cfg.id).addEventListener('click', function() {
      disableButton();
      saveSettings();
    });
  });

  var ambiguousCheckbox = document.getElementById('chckAmbiguous');
  if (ambiguousCheckbox) {
    ambiguousCheckbox.addEventListener('click', function() {
      saveSettings();
    });
  }

  document.getElementById('generate').addEventListener('click', generatePassword);
  document.getElementById('copy').addEventListener('click', copyPassToClipboard);
  document.getElementById('clearHistory').addEventListener('click', clearPasswordHistory);

  disableButton();
  displayHistory();
}

init();
