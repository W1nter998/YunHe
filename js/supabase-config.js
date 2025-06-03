// js/supabase-config.js

// 替换为你的 Supabase Project URL
const SUPABASE_URL = "https://atboelnclvzasufztcxk.supabase.co"; 
// 替换为你的 Supabase Anon Public Key
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0Ym9lbG5jbHZ6YXN1Znp0Y3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MTk4ODEsImV4cCI6MjA2NDQ5NTg4MX0.iP1yCdJ72jBAPsrehjLfnKZr6xBlc7BsXGamtpcxl88";

let supabase = null; // 初始化为 null

// 异步函数，用于等待 Supabase SDK 加载并初始化客户端
async function initializeSupabase(timeout = 25000) { // 增加超时时间到25秒
    const startTime = Date.now();
    
    // 如果supabase已经初始化，直接返回
    if (supabase && supabase.auth) {
        console.log("Supabase Client (js/supabase-config.js v2.1): Already initialized.");
        return supabase;
    }

    // 检查全局的 'supabase' 对象是否可用
    // 这个 'supabase' 对象是由 CDN 加载的 supabase.min.js 脚本设置的
    while (typeof window.supabase === 'undefined' || typeof window.supabase !== 'function') {
        if (Date.now() - startTime > timeout) {
            throw new Error("Supabase SDK (global 'supabase' object) not available within " + (timeout / 1000) + " seconds.");
        }
        await new Promise(resolve => setTimeout(resolve, 100)); // 每100毫秒检查一次
    }

    // 确保它是一个函数，并且可以用来创建客户端
    if (typeof window.supabase === 'function') {
        try {
            supabase = window.supabase(SUPABASE_URL, SUPABASE_KEY);
            console.log("Supabase Client (js/supabase-config.js v2.1): Successfully initialized.");
            return supabase;
        } catch (e) {
            console.error("Supabase Client (js/supabase-config.js v2.1): Error during client creation:", e);
            throw new Error("Failed to create Supabase client: " + e.message);
        }
    } else {
        throw new Error("Supabase SDK (global 'supabase' object) is not a function after loading.");
    }
}

// 导出 initializeSupabase 函数，以便其他模块可以调用它来获取 Supabase 客户端
export { initializeSupabase };
