// শুধুমাত্র আপনি এডমিন প্যানেল দেখতে পাবেন
const ADMIN_PASSWORD = 'আপনার_ইচ্ছামতো_পাসওয়ার্ড'; // পরিবর্তন করুন

function checkAdminAccess() {
    const entered = prompt('Enter admin password:');
    if (entered !== ADMIN_PASSWORD) {
        alert('⛔ Unauthorized access!');
        window.location.href = '/';
        return false;
    }
    return true;
}

// admin.html পেজ লোড হলে কল হবে
if (window.location.pathname.includes('/admin')) {
    checkAdminAccess();
}
