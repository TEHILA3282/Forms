// הגדרת כל הסקשנים לפי סוג פעולה
const sections = {
  'בקשת הלוואה': document.getElementById('loanRequestSection'),
  'משיכת פיקדון': document.getElementById('withdrawSection'),
  'הפקדת פיקדון': document.getElementById('depositSection'),
  'בקשת טפסים': document.getElementById('formRequestSection'),
  'הצטרפות לחברות בגמ"ח': document.getElementById('membershipSection'),
  'חתימת ערב להלוואה': document.getElementById('guarantorSection'),
  'שטר חוב': document.getElementById('shtarHovSection'),

};

// עזר לניקוי שדות
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

// הצגת סקשן לפי לחיצה
const allButtons = document.querySelectorAll('.buttonAction');
allButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selected = btn.textContent.trim();

    // הסתרת כל הסקשנים
    Object.values(sections).forEach(section => {
      if (section) {
        section.style.display = 'none';
        clearInputs(section);
      }
    });

    // הצגת הסקשן שנבחר
    if (sections[selected]) {
      sections[selected].style.display = 'block';
    }

    // איפוס ערבים אם לא הלוואה
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

// ערב ב'
document.getElementsByName('loanOver10k').forEach(radio => {
  radio.addEventListener('change', () => {
    const show = radio.value === 'yes' && radio.checked;
    const arevB = document.getElementById('arevBSection');
    const arevC = document.getElementById('arevCSection');
    const arevD = document.getElementById('arevDSection');

    arevB.style.display = show ? 'block' : 'none';
    if (!show) {
      clearInputs(arevB);
      arevC.style.display = 'none';
      arevD.style.display = 'none';
      clearInputs(arevC);
      clearInputs(arevD);
      document.getElementsByName('loanOver20k').forEach(r => r.checked = false);
      document.getElementsByName('loanOver30k').forEach(r => r.checked = false);
    }
  });
});

// ערב ג'
document.getElementsByName('loanOver20k').forEach(radio => {
  radio.addEventListener('change', () => {
    const show = radio.value === 'yes' && radio.checked;
    const arevC = document.getElementById('arevCSection');
    const arevD = document.getElementById('arevDSection');

    arevC.style.display = show ? 'block' : 'none';
    if (!show) {
      clearInputs(arevC);
      arevD.style.display = 'none';
      clearInputs(arevD);
      document.getElementsByName('loanOver30k').forEach(r => r.checked = false);
    }
  });
});

// ערב ד'
document.getElementsByName('loanOver30k').forEach(radio => {
  radio.addEventListener('change', () => {
    const show = radio.value === 'yes' && radio.checked;
    const arevD = document.getElementById('arevDSection');
    arevD.style.display = show ? 'block' : 'none';
    if (!show) {
      clearInputs(arevD);
    }
  });
});

// משיכת פיקדון – בחירה ב"אחר"
const withdrawAmountChoice = document.getElementById('withdrawAmountChoice');
const customWithdrawAmount = document.getElementById('customWithdrawAmount');
if (withdrawAmountChoice && customWithdrawAmount) {
  withdrawAmountChoice.addEventListener('change', () => {
    customWithdrawAmount.style.display = withdrawAmountChoice.value === 'other' ? 'flex' : 'none';
    if (withdrawAmountChoice.value !== 'other') {
      customWithdrawAmount.querySelector('input').value = '';
    }
  });
}

// משלוח טפסים – שינוי טקסט
const deliveryRadios = document.getElementsByName('deliveryMethod');
const formRequestMessage = document.getElementById('formRequestMessage');
deliveryRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      if (radio.value === 'מודפס') {
        formRequestMessage.textContent = 'גבאי הגמ"ח יצור קשר להעברת הטפסים.';
      } else if (radio.value === 'מייל') {
        formRequestMessage.textContent = 'שים לב שהטפסים ישלחו לכתובת מייל שהזנת בפרטים האישיים.';
      }
    }
  });
});

// הפקדת פיקדון
document.querySelectorAll('input[name="transferType"]').forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'regular' && radio.checked) {
      regularTransferSection.style.display = 'block';
      directDebitSection.style.display = 'none';
    } else if (radio.value === 'directDebit' && radio.checked) {
      directDebitSection.style.display = 'block';
      regularTransferSection.style.display = 'none';
    }
  });
});


const paymentOptions = document.getElementById('paymentOptions');
const paymentType = document.getElementById('paymentType');
const oneTimeAmount = document.getElementById('oneTimeAmount');
const recurringAmount = document.getElementById('recurringAmount');

document.getElementsByName('hasPermission').forEach(radio => {
  radio.addEventListener('change', () => {
    paymentOptions.style.display = radio.value === 'yes' && radio.checked ? 'block' : 'none';
    oneTimeAmount.style.display = 'none';
    recurringAmount.style.display = 'none';
  });
});

if (paymentType) {
  paymentType.addEventListener('change', () => {
    oneTimeAmount.style.display = paymentType.value === 'oneTime' ? 'block' : 'none';
    recurringAmount.style.display = paymentType.value === 'recurring' ? 'block' : 'none';
  });
}
