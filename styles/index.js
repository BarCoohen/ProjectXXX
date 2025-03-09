// contact us form function
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // מונע את השליחה הרגילה של הטופס

    const numberInput = document.getElementById('number');
    const numberValue = numberInput.value.trim();

    // בדיקה אם הפלאפון מתחיל ב-05 ואורכו 10 תווים
    const phonePattern1 = /^05\d{1}-\d{7}$/;
    // בדיקה אם הפלאפון מתחיל במשהו אחר ואורכו 10 תווים
    const phonePattern2 = /^\d{2}-\d{3,8}$/;
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


// כשלוחצים על צור קשר בבאנר זה  גולל למטה לform
  document.getElementById('button2').addEventListener('click', function() {
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
});
  
// תפריט ניווט צדדי בסוגי אתרים שונים

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-container');
    const navLinks = document.querySelectorAll('.side-navigation a');
    
    // גלילה חלקה בלחיצה על לינק
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // מונע את התנהגות ברירת המחדל
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // חשב את המיקום בדף עם התחשבות בכותרת קבועה
                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // הדגשת הלינק הנוכחי
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // פונקציה להדגשת הלינק המתאים בתפריט בעת סקרול
    function highlightNavigation() {
        // מציאת החלק הנראה ביותר בחלון הדפדפן
        let maxVisibleSection = null;
        let maxVisiblePercentage = 0;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // חישוב כמה מהסקשן נראה כרגע בחלון
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const sectionHeight = rect.height;
            const visiblePercentage = visibleHeight / sectionHeight;
            
            // אם חלק גדול יותר נראה מהסקשן הנוכחי לעומת הקודם
            if (visiblePercentage > maxVisiblePercentage && visiblePercentage > 0.2) { // לפחות 20% מהסקשן נראה
                maxVisiblePercentage = visiblePercentage;
                maxVisibleSection = section;
            }
        });
        
        // עדכון הקישור הפעיל אם נמצא סקשן מתאים
        if (maxVisibleSection) {
            const currentId = maxVisibleSection.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentId) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // הוספת מאזין אירועים לסקרול
    window.addEventListener('scroll', highlightNavigation);
    
    // הפעלה ראשונית כדי לוודא שהלינק הנכון מודגש בטעינה
    highlightNavigation();
});