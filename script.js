function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// منع إرسال النموذج الافتراضي
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('تم إرسال رسالتك بنجاح!');
        form.reset();
    });
}

// زر الوضع الليلي
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    // حفظ الوضع في localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'on');
        darkModeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('darkMode', 'off');
        darkModeToggle.textContent = '🌙';
    }
});
// تفعيل الوضع الليلي تلقائياً إذا كان محفوظاً
if (localStorage.getItem('darkMode') === 'on') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
} else {
    darkModeToggle.textContent = '🌙';
}

document.querySelectorAll('.accordion-title').forEach(btn => {
    btn.addEventListener('click', function () {
        const item = this.parentElement;
        item.classList.toggle('active');
    });
});

// منع كلك يمين وفتح أدوات المطور
window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
window.addEventListener('keydown', function (e) {
    // F12 أو Ctrl+Shift+I أو Ctrl+Shift+J أو Ctrl+U
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key.toLowerCase() === 'u')
    ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
});

// البحث عن الكورسات
const courseSearchInput = document.getElementById('courseSearchInput');
if (courseSearchInput) {
    courseSearchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        document.querySelectorAll('.course-card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            if (title.includes(query) || desc.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}
