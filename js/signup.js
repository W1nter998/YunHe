// js/signup.js

import { initializeSupabase } from './supabase-config.js'; // 导入初始化函数

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Signup Page (js/signup.js): DOMContentLoaded.");

    const signupForm = document.getElementById('signup-form');
    const authMessage = document.getElementById('auth-message');
    const supabaseStatusDiv = document.getElementById('supabase-status');

    let supabase; // 在这里声明 supabase 变量，稍后赋值

    try {
        supabaseStatusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在初始化 Supabase 客户端...';
        supabase = await initializeSupabase(); // 等待 Supabase 客户端初始化完成
        supabaseStatusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Supabase 客户端已就绪。';
        console.log("Signup Page (js/signup.js): Supabase client ready.");
    } catch (error) {
        console.error("Signup Page (js/signup.js): Supabase initialization failed:", error.message);
        authMessage.textContent = `初始化Supabase失败：${error.message}`;
        authMessage.style.color = 'red';
        supabaseStatusDiv.innerHTML = '<i class="fas fa-times-circle" style="color: red;"></i> Supabase 客户端初始化失败。';
        return; // 初始化失败，阻止后续操作
    }

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = signupForm.email.value;
        const password = signupForm.password.value;
        const confirmPassword = signupForm['confirm-password'].value;

        authMessage.textContent = ''; // 清空之前的消息

        if (password !== confirmPassword) {
            authMessage.textContent = '两次输入的密码不一致！';
            authMessage.style.color = 'red';
            return;
        }

        if (!password || password.length < 6) {
            authMessage.textContent = '密码不能少于6位！';
            authMessage.style.color = 'red';
            return;
        }

        try {
            authMessage.textContent = '正在注册...';
            authMessage.style.color = 'orange';

            // 使用通过 initializeSupabase 获取的 supabase 实例
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) {
                console.error("Signup error:", error);
                authMessage.textContent = `注册失败：${error.message}`;
                authMessage.style.color = 'red';
            } else if (data.user) {
                authMessage.textContent = '注册成功！请检查您的邮箱以完成验证。';
                authMessage.style.color = 'green';
                signupForm.reset(); // 清空表单
                // 可以选择在注册成功后重定向用户
                // setTimeout(() => {
                //     window.location.href = 'login.html';
                // }, 3000);
            } else {
                authMessage.textContent = '注册成功，但未返回用户信息。请检查邮箱。';
                authMessage.style.color = 'orange';
            }
        } catch (error) {
            console.error("Unexpected signup error:", error);
            authMessage.textContent = `注册过程中发生未知错误：${error.message}`;
            authMessage.style.color = 'red';
        }
    });
});
