
    const loanSection = document.getElementById('loanRequestSection');
    const allButtons = document.querySelectorAll('.buttonAction');

    allButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.textContent === 'בקשת הלוואה') {
          loanSection.style.display = 'block';
        } else {
          loanSection.style.display = 'none';

          // איפוס שדות בקשת הלוואה וערבים
          loanSection.querySelectorAll('input, select, textarea').forEach((el) => {
            if (el.type === 'radio' || el.type === 'checkbox') {
              el.checked = false;
            } else {
              el.value = '';
            }
          });

          document.getElementById('arevBSection').style.display = 'none';
          document.getElementById('arevCSection').style.display = 'none';
          document.getElementById('arevDSection').style.display = 'none';

          // איפוס רדיו של כל השאלות
          ['loanOver10k', 'loanOver20k', 'loanOver30k'].forEach(name => {
            document.getElementsByName(name).forEach(radio => radio.checked = false);
          });
        }
      });
    });

    const loanAmountInput = document.getElementById('loanAmount');
    const arevBSection = document.getElementById('arevBSection');
    const arevCSection = document.getElementById('arevCSection');
    const arevDSection = document.getElementById('arevDSection');

    // לפי השאלה האם ההלוואה מעל 10,000 ש"ח (להציג ערב ב')
    const loanOver10kRadios = document.getElementsByName('loanOver10k');
    loanOver10kRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'yes' && radio.checked) {
          arevBSection.style.display = 'block';
        } else {
          arevBSection.style.display = 'none';
          clearInputs(arevBSection);

          // גם נסגור ערב ג' וד' כי הם תלויים בערב ב'
          arevCSection.style.display = 'none';
          clearInputs(arevCSection);
          arevDSection.style.display = 'none';
          clearInputs(arevDSection);

          // איפוס רדיו 20k ו-30k
          document.getElementsByName('loanOver20k').forEach(r => r.checked = false);
          document.getElementsByName('loanOver30k').forEach(r => r.checked = false);
        }
      });
    });

    // לפי השאלה האם ההלוואה מעל 20,000 ש"ח (להציג ערב ג')
    const loanOver20kRadios = document.getElementsByName('loanOver20k');
    loanOver20kRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'yes' && radio.checked) {
          arevCSection.style.display = 'block';
        } else {
          arevCSection.style.display = 'none';
          clearInputs(arevCSection);

          // גם נסגור ערב ד' כי תלוי בערב ג'
          arevDSection.style.display = 'none';
          clearInputs(arevDSection);

          // איפוס רדיו 30k
          document.getElementsByName('loanOver30k').forEach(r => r.checked = false);
        }
      });
    });

    // לפי השאלה האם ההלוואה מעל 30,000 ש"ח (להציג ערב ד')
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

    // פונקציה לניקוי שדות בקבוצה
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