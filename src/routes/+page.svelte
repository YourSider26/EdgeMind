<script lang="ts">
    import { goto } from "$app/navigation"
    import BrowserSupportSection from "$lib/components/BrowserSupportSection.svelte"
    import FeaturesSection from "$lib/components/FeaturesSection.svelte"
    import HeroSection from "$lib/components/HeroSection.svelte"
    import LoginModal from "$lib/components/LoginModal.svelte"
    // 导入组件
    import Navbar from "$lib/components/Navbar.svelte"
    import UseCasesSection from "$lib/components/UseCasesSection.svelte"
    import { onMount } from "svelte"

    let showLoginModal = false
    let userId = ""
    let userIdError = ""
    let isLoggedIn = false

    // 检查登录状态
    function checkLoginStatus() {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem("EDGEMIND_USERID")
            if (storedUserId) {
                isLoggedIn = true
            }
        }
    }

    // 导航到项目管理页面（需要登录检查）
    function navigateToProjects() {
        if (!isLoggedIn) {
            showLoginModal = true
            return
        }
        goto("/projects")
    }

    // 处理登录成功
    function handleLoginSuccess(event: CustomEvent<{ userId: string }>) {
        const { userId: loginUserId } = event.detail
        localStorage.setItem("EDGEMIND_USERID", loginUserId)
        isLoggedIn = true
        showLoginModal = false
        userId = ""
        userIdError = ""

        // 登录成功后跳转到项目管理页面
        goto("/projects")
    }

    // 关闭登录弹窗
    function handleLoginClose() {
        showLoginModal = false
        userId = ""
        userIdError = ""
    }

    // 下载插件
    function downloadExtension(browser: string = "chrome") {
        const browserNames: Record<string, string> = {
            chrome: "Chrome",
            edge: "Edge",
            firefox: "Firefox"
        }
        alert(
            `${browserNames[browser] || "Chrome"}插件下载功能即将上线，敬请期待！`
        )
    }

    // 滚动到浏览器支持区域
    function scrollToBrowserSupport() {
        const element = document.getElementById("browser-support")
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }

    // 处理下载插件事件
    function handleDownloadPlugin() {
        scrollToBrowserSupport()
    }

    // 处理浏览器下载事件
    function handleBrowserDownload(event: CustomEvent<{ browser: string }>) {
        const { browser } = event.detail
        downloadExtension(browser)
    }

    onMount(() => {
        checkLoginStatus()
    })
</script>

<svelte:head>
    <title>EdgeMind - 智能浏览器AI助手</title>
    <meta
        name="description"
        content="EdgeMind是一款强大的浏览器AI插件，帮助您整合知识文档，实现对话式AI交互学习。" />
</svelte:head>

<div class="homepage">
    <!-- 导航栏 -->
    <Navbar
        on:navigate-to-projects={navigateToProjects}
        on:download-plugin={handleDownloadPlugin} />

    <!-- 主要内容区域 -->
    <main class="main-content">
        <!-- Hero区域 -->
        <HeroSection
            on:download-plugin={handleDownloadPlugin}
            on:navigate-to-projects={navigateToProjects} />

        <!-- 功能特性 -->
        <FeaturesSection />

        <!-- 浏览器支持 -->
        <BrowserSupportSection on:download-extension={handleBrowserDownload} />

        <!-- 使用场景 -->
        <UseCasesSection />

        <!-- 行动号召 -->
        <section class="cta-section">
            <div class="cta-container">
                <div class="cta-content">
                    <h2 class="cta-title">开始您的智能学习之旅</h2>
                    <p class="cta-description">
                        立即下载EdgeMind浏览器插件，体验全新的AI辅助学习方式。
                    </p>
                </div>
            </div>
        </section>
    </main>
</div>

<!-- 登录弹窗 -->
<LoginModal
    bind:show={showLoginModal}
    bind:userId
    bind:userIdError
    on:login={handleLoginSuccess}
    on:close={handleLoginClose} />

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        background: white;
    }

    .homepage {
        min-height: 100vh;
    }

    .main-content {
        padding-top: 80px; /* 为固定导航栏留出空间 */
    }

    /* 行动号召样式 */
    .cta-section {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 80px 0;
        text-align: center;
        color: white;
    }

    .cta-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .cta-content {
        max-width: 1200px;
        margin: 0 auto;
    }

    .cta-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        line-height: 1.2;
    }

    .cta-description {
        font-size: 1.2rem;
        line-height: 1.6;
        margin-bottom: 2.5rem;
        opacity: 0.95;
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .main-content {
            padding-top: 70px;
        }

        .cta-section {
            padding: 60px 0;
        }

        .cta-title {
            font-size: 2rem;
        }

        .cta-description {
            font-size: 1.1rem;
        }
    }
</style>
