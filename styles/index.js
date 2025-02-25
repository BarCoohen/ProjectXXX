// contact us form function
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // מונע את השליחה הרגילה של הטופס

    const nameInput = document.getElementById('name');
    const nameValue = nameInput.value.trim();

    // בדיקה אם השם מכיל רק אותיות בעברית או אנגלית ואורכו מעל 2 תווים
    const namePattern = /^[a-zA-Z\u0590-\u05FF]{3,}$/;
    if (!namePattern.test(nameValue)) {
        alert('אנא הזן שם תקין המכיל רק אותיות בעברית או אנגלית ואורכו מעל 2 תווים.');
        return;
    }

    const numberInput = document.getElementById('number');
    const numberValue = numberInput.value.trim();

    // בדיקה אם הפלאפון מתחיל ב-05 ואורכו 10 תווים
    const phonePattern1 = /^05\d{1}-\d{7}$/;
    // בדיקה אם הפלאפון מתחיל במשהו אחר ואורכו 10 תווים
    const phonePattern2 = /^\d{2}-\d{3,7}$/;
    if (!phonePattern1.test(numberValue) && !phonePattern2.test(numberValue)) {
        alert('אנא הזן מספר פלאפון תקין.');
        return;
    }

    document.getElementById('contactFormContainer').style.display = 'none'; // מסתיר את הטופס
    document.getElementById('thankYouMessage').style.display = 'flex'; // מציג את הודעת התודה
});

document.getElementById('backToFormButton').addEventListener('click', function() {
    document.getElementById('thankYouMessage').style.display = 'none'; // מסתיר את הודעת התודה
    document.getElementById('contactFormContainer').style.display = 'flex'; // מציג את הטופס מחדש
});

document.getElementById('number').addEventListener('input', function(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // מסיר כל תו שאינו מספר

    if (value.startsWith('05')) {
        if (value.length > 3) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        }
        value = value.slice(0, 11); // מגביל את האורך ל-11 תווים (כולל '-')
    } else {
        if (value.length > 2) {
            value = value.slice(0, 2) + '-' + value.slice(2);
        }
        value = value.slice(0, 11); // מגביל את האורך ל-10 תווים (כולל '-')
    }

    input.value = value;
});

