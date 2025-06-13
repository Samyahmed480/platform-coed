document.addEventListener('DOMContentLoaded', function () {
    // نافذة الكود
    const modal = document.getElementById('codeModal');
    const input = document.getElementById('accessCodeInput');
    const btn = document.getElementById('submitCodeBtn');
    const error = document.getElementById('codeError');
    const CORRECT_CODE = 'TSH2007'; // يمكنك تغيير الكود هنا
    if (modal && input && btn) {
        modal.style.display = 'flex';
        input.focus();
        btn.onclick = checkCode;
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') checkCode();
        });
        function checkCode() {
            if (input.value === CORRECT_CODE) {
                modal.style.display = 'none';
                error.style.display = 'none';
                input.value = '';
            } else {
                error.style.display = 'block';
            }
        }
        // منع التفاعل مع الصفحة أثناء ظهور المودال
        document.body.style.overflow = 'hidden';
        const hideModal = () => { document.body.style.overflow = ''; };
        const observer = new MutationObserver(() => {
            if (modal.style.display === 'none') hideModal();
        });
        observer.observe(modal, { attributes: true, attributeFilter: ['style'] });
    }

    // Accordion logic
    const accordionTitles = document.querySelectorAll('.accordion-title');
    accordionTitles.forEach(function (title) {
        title.addEventListener('click', function () {
            const item = this.parentElement;
            document.querySelectorAll('.accordion-item').forEach(function (i) {
                if (i !== item) i.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // Add video icon to each lesson and open in iframe modal
    document.querySelectorAll('.accordion-list li').forEach(function (li) {
        // Skip if already has a video icon
        if (li.querySelector('.video-icon')) return;
        // Add click event to open modal directly on li
        li.addEventListener('click', function (e) {
            e.stopPropagation();
            // Modal overlay
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.background = 'rgba(0,0,0,0.85)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = 9999;
            // Video box
            const videoBox = document.createElement('div');
            videoBox.style.background = '#181f32';
            videoBox.style.borderRadius = '16px';
            videoBox.style.padding = '16px';
            videoBox.style.maxWidth = '90vw';
            videoBox.style.maxHeight = '80vh';
            videoBox.style.boxShadow = '0 4px 32px rgba(0,0,0,0.3)';
            videoBox.style.position = 'relative';
            // Close button
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '×';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '8px';
            closeBtn.style.left = '8px';
            closeBtn.style.fontSize = '2rem';
            closeBtn.style.background = 'transparent';
            closeBtn.style.color = '#fff';
            closeBtn.style.border = 'none';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.zIndex = 10001;
            closeBtn.addEventListener('click', function () {
                document.body.removeChild(overlay);
            });
            // Video iframe (replace src as needed)
            const video = document.createElement('iframe');
            video.width = '800';
            video.height = '450';
            video.style.maxWidth = '90vw';
            video.style.maxHeight = '70vh';
            video.style.border = 'none';
            video.setAttribute('allow', 'autoplay; encrypted-media');
            video.setAttribute('allowfullscreen', '');
            video.setAttribute('sandbox', 'allow-scripts allow-same-origin'); // أمان iframe
            video.src = 'https://samyyty2007.wistia.com/medias/9c5951t696';
            videoBox.appendChild(closeBtn);
            videoBox.appendChild(video);
            overlay.appendChild(videoBox);
            document.body.appendChild(overlay);
        });
    });

    // إضافة دعم زر مشاهدة الفيديو لكل حصة
    document.querySelectorAll('.watch-video-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            // استخدم data-video-url إذا وجد، وإلا استخدم data-wistia
            const videoUrl = btn.getAttribute('data-video-url');
            const wistiaId = btn.getAttribute('data-wistia');
            let src = '';
            if (videoUrl) {
                src = videoUrl;
            } else if (wistiaId) {
                src = `https://fast.wistia.net/embed/iframe/${wistiaId}?seo=false&videoFoam=true`;
            } else {
                return;
            }
            // Modal overlay
            const overlay = document.createElement('div');
            overlay.className = 'wistia-modal-overlay';
            // Video box
            const videoBox = document.createElement('div');
            videoBox.className = 'wistia-modal-box';
            // Close button
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '×';
            closeBtn.className = 'wistia-modal-close';
            closeBtn.addEventListener('click', function () {
                document.body.removeChild(overlay);
            });
            // Video iframe (Wistia)
            const video = document.createElement('iframe');
            video.className = 'wistia-modal-iframe';
            video.setAttribute('allow', 'autoplay; encrypted-media');
            video.setAttribute('allowfullscreen', '');
            video.setAttribute('sandbox', 'allow-scripts allow-same-origin');
            video.src = src;
            // عنوان أعلى الفيديو
            const videoTitle = document.createElement('div');
            videoTitle.textContent = 'مشاهدة الفيديو';
            videoTitle.className = 'wistia-modal-title';
            videoBox.appendChild(closeBtn);
            videoBox.appendChild(videoTitle);
            videoBox.appendChild(video);
            overlay.appendChild(videoBox);
            document.body.appendChild(overlay);
        });
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
