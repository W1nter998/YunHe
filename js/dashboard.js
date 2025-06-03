// js/dashboard.js
// 仪表板页面的特定逻辑将在此处添加
import { initializeSupabase } from './supabase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const userDisplay = document.getElementById('user-display');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const logoutBtnMobile = document.getElementById('logout-btn-mobile');
    const welcomeUsername = document.getElementById('welcome-username');
    const userEmail = document.getElementById('user-email');
    const userId = document.getElementById('user-id');
    let supabaseClient;

    try {
        supabaseClient = await initializeSupabase();
        console.log("Dashboard Page (js/dashboard.js): Supabase client ready.");
    } catch (error) {
        console.error("Dashboard Page (js/dashboard.js): Supabase initialization failed:", error.message);
        // 如果初始化失败，用户可能无法进行认证操作
        return;
    }

    // 检查用户会话
    const { data: { user }, error } = await supabaseClient.auth.getUser();

    if (error) {
        console.error("Error fetching user:", error.message);
    }

    if (user) {
        // 用户已登录
        userDisplay.textContent = `欢迎，${user.user_metadata?.username || user.email}`;
        userDisplay.style.display = 'inline';
        logoutBtn.style.display = 'inline';
        logoutBtnMobile.style.display = 'block'; // for mobile nav
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';

        welcomeUsername.textContent = user.user_metadata?.username || user.email;
        userEmail.textContent = user.email;
        userId.textContent = user.id;

    } else {
        // 用户未登录，重定向到登录页面
        alert('您尚未登录，请先登录。');
        window.location.href = 'login.html';
    }

    // 退出登录逻辑
    const handleLogout = async () => {
        const { error: logoutError } = await supabaseClient.auth.signOut();
        if (logoutError) {
            console.error("Logout failed:", logoutError.message);
            alert("退出登录失败：" + logoutError.message);
        } else {
            alert("您已成功退出登录。");
            window.location.href = 'login.html'; // 退出后跳转到登录页
        }
    };

    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (logoutBtnMobile) logoutBtnMobile.addEventListener('click', handleLogout);
    const logoutButtonMain = document.getElementById('logout-button-main');
    if (logoutButtonMain) logoutButtonMain.addEventListener('click', handleLogout);
});
