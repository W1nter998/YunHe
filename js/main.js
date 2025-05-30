document.addEventListener('DOMContentLoaded', () => {
    // 移动端菜单切换逻辑
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const closeBtn = document.querySelector('.close-btn');

    if (menuToggle && mobileNav && closeBtn) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('open');
        });

        closeBtn.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });

        // 点击菜单外部关闭菜单
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target) && mobileNav.classList.contains('open')) {
                mobileNav.classList.remove('open');
            }
        });

        // 阻止点击手机菜单内部时关闭菜单 (可选，但推荐)
        mobileNav.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // 其他页面特定的初始化逻辑（例如表单处理，Supabase集成将在后续步骤中添加）
    console.log("Main JavaScript loaded.");
});
