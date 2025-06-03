// js/login.js
// 登录页面的特定逻辑将在此处添加
import { initializeSupabase } from './supabase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const authMessage = document.getElementById('auth-message');
    const supabaseStatusDiv = document.getElementById('supabase-status');
    let supabaseClient;

    try {
        supabaseStatusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在加载核心组件...';
        authMessage.textContent = ''; // Clear previous messages

        supabaseClient = await initializeSupabase();
        console.log("Login Page (js/login.js): Supabase client ready.");
        supabaseStatusDiv.innerHTML = '<i class="fas fa-check-circle"></i> 核心组件已加载。';
        supabaseStatusDiv.style.color = 'var(--success-color)';

        // Here you can start using supabaseClient for login operations
        // For now, just a successful message
        authMessage.textContent = 'Supabase客户端初始化成功。';
        authMessage.style.color = 'var(--success-color)';

    } catch (error) {
        console.error("Login Page (js/login.js): Supabase initialization failed:", error.message);
        supabaseStatusDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 核心组件加载失败。';
        supabaseStatusDiv.style.color = 'var(--error-color)';
        authMessage.textContent = 'Supabase初始化失败：' + error.message;
        authMessage.style.color = 'var(--error-color)';
        return;
    }

    // TODO: Add login form submission logic here in the next stage
});
