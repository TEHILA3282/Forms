// סקשנים לפי סוג פעולה
const sections = {
  'בקשת הלוואה': document.getElementById('loanRequestSection'),
  'משיכת פיקדון': document.getElementById('withdrawSection'),
  'הפקדת פיקדון': document.getElementById('depositSection'),
  'הצטרפות לחברות בגמ"ח': document.getElementById('membershipSection'),
  // הוסיפי כאן עוד אם צריך
};

// ניקוי שדות
function clearInputs(container) {
  if (!container) return;
  container.querySelectorAll('input, textarea, select').forEach(el => {
    if (el.type === 'radio' || el.type === 'checkbox') {
      el.checked = false;
    } else {
      el.value = '';
    }
  });
}

// מאזין לכל הכפתורים
const allButtons = document.querySelectorAll('.buttonAction');
allButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selected = btn.textContent.trim();

    // הסתרה של כל הסקשנים
    Object.values(sections).forEach(section => {
      section.style.display = 'none';
      clearInputs(section);
    });

    // הצגה של הסקשן הרלוונטי
    if (sections[selected]) {
      sections[selected].style.display = 'block';
    }

    // הלוואה – איפוס ערבים
    if (selected !== 'בקשת הלוואה') {
      ['arevBSection', 'arevCSection', 'arevDSection'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.style.display = 'none';
          clearInputs(el);
        }
      });

      ['loanOver10k', 'loanOver20k', 'loanOver30k'].forEach(name => {
        document.getElementsByName(name).forEach(radio => radio.checked = false);
      });
    }
  });
});

// לוגיקה לערבים – כמו שהיה קודם

const arevBSection = document.getElementById('arevBSection');
const arevCSection = document.getElementById('arevCSection');
const arevDSection = document.getElementById('arevDSection');

const loanOver10kRadios = document.getElementsByName('loanOver10k');
loanOver10kRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'yes' && radio.checked) {
      arevBSection.style.display = 'block';
    } else {
      arevBSection.style.display = 'none';
      clearInputs(arevBSection);
      arevCSection.style.display = 'none';
      clearInputs(arevCSection);
      arevDSection.style.display = 'none';
      clearInputs(arevDSection);
      document.getElementsByName('loanOver20k').forEach(r => r.checked = false);
      document.getElementsByName('loanOver30k').forEach(r => r.checked = false);
    }
  });
});

const loanOver20kRadios = document.getElementsByName('loanOver20k');
loanOver20kRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'yes' && radio.checked) {
      arevCSection.style.display = 'block';
    } else {
      arevCSection.style.display = 'none';
      clearInputs(arevCSection);
      arevDSection.style.display = 'none';
      clearInputs(arevDSection);
      document.getElementsByName('loanOver30k').forEach(r => r.checked = false);
    }
  });
});

const loanOver30kRadios = document.getElementsByName('loanOver30k');
loanOver30kRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'yes' && radio.checked) {
      arevDSection.style.display = 'block';
    } else {
      arevDSection.style.display = 'none';
      clearInputs(arevDSection);
    }
  });
});

// לוגיקת הפקדת פיקדון

const transferType = document.getElementById('transferType');
const regularTransferSection = document.getElementById('regularTransferSection');
const directDebitSection = document.getElementById('directDebitSection');
const paymentOptions = document.getElementById('paymentOptions');
const paymentType = document.getElementById('paymentType');
const oneTimeAmount = document.getElementById('oneTimeAmount');
const recurringAmount = document.getElementById('recurringAmount');

transferType.addEventListener('change', () => {
  regularTransferSection.style.display = (transferType.value === 'regular') ? 'block' : 'none';
  directDebitSection.style.display = (transferType.value === 'directDebit') ? 'block' : 'none';
});

document.getElementsByName('hasPermission').forEach(radio => {
  radio.addEventListener('change', () => {
    paymentOptions.style.display = (radio.value === 'yes') ? 'block' : 'none';
    oneTimeAmount.style.display = 'none';
    recurringAmount.style.display = 'none';
  });
});

paymentType.addEventListener('change', () => {
  oneTimeAmount.style.display = (paymentType.value === 'oneTime') ? 'block' : 'none';
  recurringAmount.style.display = (paymentType.value === 'recurring') ? 'block' : 'none';
});

// לוגיקה למשיכת פיקדון – תת שדה "אחר"
const withdrawAmountChoice = document.getElementById('withdrawAmountChoice');
const customWithdrawAmount = document.getElementById('customWithdrawAmount');

if (withdrawAmountChoice) {
  withdrawAmountChoice.addEventListener('change', () => {
    customWithdrawAmount.style.display = (withdrawAmountChoice.value === 'other') ? 'block' : 'none';
  });
}
