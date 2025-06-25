const loanSection = document.getElementById('loanRequestSection');
const withdrawSection = document.getElementById('withdrawSection');
const formRequestSection = document.getElementById('formRequestSection');
const withdrawAmountChoice = document.getElementById('withdrawAmountChoice');
const customWithdrawAmount = document.getElementById('customWithdrawAmount');
const allButtons = document.querySelectorAll('.buttonAction');
const deliveryRadios = document.getElementsByName('deliveryMethod');
const formRequestMessage = document.getElementById('formRequestMessage');
const guarantorSection = document.getElementById('guarantorSection');


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


allButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const text = btn.textContent.trim();

    // הסתרת כל החלקים
    loanSection.style.display = 'none';
    withdrawSection.style.display = 'none';
    formRequestSection.style.display = 'none';
    guarantorSection.style.display = 'none';

    // הצגת הקטע הרלוונטי
    if (text === 'בקשת הלוואה') {
      loanSection.style.display = 'block';
    } else if (text === 'משיכת פיקדון') {
      withdrawSection.style.display = 'block';
    } else if (text === 'בקשת טפסים') {
      formRequestSection.style.display = 'block';
    }

    if (text === 'חתימת ערב להלוואה') {
      guarantorSection.style.display = 'block';
    } else {
      guarantorSection.style.display = 'none';
    }


    // ניקוי שדות של כל אזור שלא בשימוש

    if (loanSection.style.display === 'none') {
      loanSection.querySelectorAll('input, select, textarea').forEach((el) => {
        if (el.type === 'radio' || el.type === 'checkbox') {
          el.checked = false;
        } else {
          el.value = '';
        }



      });
      ['loanOver10k', 'loanOver20k', 'loanOver30k'].forEach(name => {
        document.getElementsByName(name).forEach(r => r.checked = false);
      });
      document.getElementById('arevBSection').style.display = 'none';
      document.getElementById('arevCSection').style.display = 'none';
      document.getElementById('arevDSection').style.display = 'none';
    }

    if (guarantorSection.style.display === 'none') {
      guarantorSection.querySelectorAll('input').forEach(el => el.value = '');
    }

    if (withdrawSection.style.display === 'none') {
      withdrawSection.querySelectorAll('input, select').forEach((el) => {
        if (el.type === 'radio' || el.type === 'checkbox') {
          el.checked = false;
        } else {
          el.value = '';
        }
      });
      withdrawAmountChoice.value = '';
      customWithdrawAmount.style.display = 'none';
      customWithdrawAmount.querySelector('input').value = '';
    }

    if (formRequestSection.style.display === 'none') {
      formRequestSection.querySelectorAll('input, textarea').forEach((el) => {
        if (el.type === 'radio' || el.type === 'checkbox') {
          el.checked = false;
        } else {
          el.value = '';
        }
      });
    }
  });
});

// ערב ב'
document.getElementsByName('loanOver10k').forEach((el) =>
  el.addEventListener('change', (e) => {
    const show = e.target.value === 'yes';
    document.getElementById('arevBSection').style.display = show ? 'block' : 'none';
    if (!show) {
      clearInputs(document.getElementById('arevBSection'));
      document.getElementById('arevCSection').style.display = 'none';
      clearInputs(document.getElementById('arevCSection'));
      document.getElementById('arevDSection').style.display = 'none';
      clearInputs(document.getElementById('arevDSection'));
      ['loanOver20k', 'loanOver30k'].forEach(name => {
        document.getElementsByName(name).forEach(r => r.checked = false);
      });
    }
  })
);

// ערב ג'
document.getElementsByName('loanOver20k').forEach((el) =>
  el.addEventListener('change', (e) => {
    const show = e.target.value === 'yes';
    document.getElementById('arevCSection').style.display = show ? 'block' : 'none';
    if (!show) {
      clearInputs(document.getElementById('arevCSection'));
      document.getElementById('arevDSection').style.display = 'none';
      clearInputs(document.getElementById('arevDSection'));
      document.getElementsByName('loanOver30k').forEach(r => r.checked = false);
    }
  })
);

// ערב ד'
document.getElementsByName('loanOver30k').forEach((el) =>
  el.addEventListener('change', (e) => {
    const show = e.target.value === 'yes';
    document.getElementById('arevDSection').style.display = show ? 'block' : 'none';
    if (!show) clearInputs(document.getElementById('arevDSection'));
  })
);

// הצגת שדה סכום מותאם אישית למשיכת פיקדון
withdrawAmountChoice?.addEventListener('change', (e) => {
  if (e.target.value === 'other') {
    customWithdrawAmount.style.display = 'flex';
  } else {
    customWithdrawAmount.style.display = 'none';
    customWithdrawAmount.querySelector('input').value = '';
  }
});

// פונקציה לניקוי שדות
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
