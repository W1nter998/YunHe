// js/login.js

import { initializeSupabase } from './supabase-config.js'; // 导入初始化函数

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Login Page (js/login.js): DOMContentLoaded.");

    const loginForm = document.getElementById('login-form');
    const authMessage = document.getElementById('auth-message');
    const supabaseStatusDiv = document.getElementById('supabase-status');

    let supabase; // 在这里声明 supabase 变量，稍后赋值

    try {
        supabaseStatusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在初始化 Supabase 客户端...';
        supabase = await initializeSupabase(); // 等待 Supabase 客户端初始化完成
        supabaseStatusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Supabase 客户端已就绪。';
        console.log("Login Page (js/login.js): Supabase client ready.");
    } catch (error) {
        console.error("Login Page (js/login.js): Supabase initialization failed:", error.message);
        authMessage.textContent = `初始化Supabase失败：${error.message}`;
        authMessage.style.color = 'red';
        supabaseStatusDiv.innerHTML = '<i class="fas fa-times-circle" style="color: red;"></i> Supabase 客户端初始化失败。';
        return; // 初始化失败，阻止后续操作
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        authMessage.textContent = ''; // 清空之前的消息

        try {
            authMessage.textContent = '正在登录...';
            authMessage.style.color = 'orange';

            // 使用通过 initializeSupabase 获取的 supabase 实例
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                console.error("Login error:", error);
                authMessage.textContent = `登录失败：${error.message}`;
                authMessage.style.color = 'red';
            } else if (data.user) {
                authMessage.textContent = '登录成功！正在跳转...';
                authMessage.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'dashboard.html'; // 登录成功后跳转到仪表盘页面
                }, 1000);
            } else {
                authMessage.textContent = '登录成功，但未返回用户信息。';
                authMessage.style.color = 'orange';
            }
        } catch (error) {
            console.error("Unexpected login error:", error);
            authMessage.textContent = `登录过程中发生未知错误：${error.message}`;
            authMessage.style.color = 'red';
        }
    });
});
