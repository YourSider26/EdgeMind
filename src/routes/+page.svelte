<script lang="ts">
    import { goto } from "$app/navigation"
    import edgeIcon from "$lib/assets/edge.png"
    import firefoxIcon from "$lib/assets/firefox.png"
    import googleIcon from "$lib/assets/google.png"

    function navigateToProjects() {
        goto("/projects")
    }

    function downloadExtension(browser: string = "chrome") {
        // 这里可以添加实际的下载逻辑
        const browserNames: Record<string, string> = {
            chrome: "Chrome",
            edge: "Edge",
            firefox: "Firefox"
        }
        alert(
            `${browserNames[browser] || "Chrome"}插件下载功能即将上线，敬请期待！`
        )
    }

    function scrollToBrowserSupport() {
        const element = document.getElementById("browser-support")
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }
</script>

<svelte:head>
    <title>EdgeMind - 智能浏览器AI助手</title>
    <meta
        name="description"
        content="EdgeMind是一款强大的浏览器AI插件，帮助您整合知识文档，实现对话式AI交互学习。" />
</svelte:head>

<div class="homepage">
    <!-- 导航栏 -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <span class="logo-text">EdgeMind</span>
            </div>
            <div class="nav-actions">
                <button class="nav-btn" on:click={navigateToProjects}>
                    项目管理
                </button>
                <button class="download-btn" on:click={scrollToBrowserSupport}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7,10 12,15 17,10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    下载插件
                </button>
            </div>
        </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="main-content">
        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-container">
                <div class="hero-content">
                    <div class="hero-badge">
                        <span> EdgeMind</span>
                    </div>

                    <h1 class="hero-title">
                        让浏览器变身<br />
                        <span class="highlight">AI学习助手</span>
                    </h1>

                    <p class="hero-description">
                        选中任意文字，即时AI对话。整合知识文档，打造个人学习空间。
                    </p>

                    <div class="hero-actions">
                        <button
                            class="download-btn"
                            on:click={scrollToBrowserSupport}>
                            <span>立即下载</span>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2">
                                <path
                                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7,10 12,15 17,10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="hero-visual">
                    <div class="preview-window">
                        <div class="window-header">
                            <div class="window-controls">
                                <span class="control red"></span>
                                <span class="control yellow"></span>
                                <span class="control green"></span>
                            </div>
                            <div class="window-title">EdgeMind AI</div>
                        </div>
                        <div class="window-content">
                            <div class="chat-message user">
                                <div class="message-content">
                                    <span class="selected-word"
                                        >Machine Learning</span>
                                    <span class="question">这是什么？</span>
                                </div>
                            </div>
                            <div class="chat-message ai">
                                <div class="ai-icon">🤖</div>
                                <div class="message-content">
                                    机器学习是人工智能的一个分支，它让计算机能够从数据中学习并做出预测...
                                </div>
                            </div>
                            <div class="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 功能特性 -->
        <section class="features">
            <div class="features-container">
                <h2 class="section-title">强大功能，简单易用</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">✨</div>
                        <h3>选中即问</h3>
                        <p>
                            选中网页中的任何文字，一键启动AI对话，获得即时解答和深度分析。
                        </p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📚</div>
                        <h3>项目分类</h3>
                        <p>
                            创建专属学习项目，如英语学习、日语学习等，让知识整合更有条理。
                        </p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🔗</div>
                        <h3>知识整合</h3>
                        <p>
                            自动整合浏览过的学习资料，构建个人知识图谱，提升学习效率。
                        </p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">💬</div>
                        <h3>对话式学习</h3>
                        <p>
                            与AI进行自然对话，深入理解复杂概念，让学习变得更加有趣。
                        </p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🎯</div>
                        <h3>个性化推荐</h3>
                        <p>
                            基于学习历史和兴趣，智能推荐相关学习资源和知识点。
                        </p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📊</div>
                        <h3>学习统计</h3>
                        <p>
                            详细的学习数据分析，帮助您了解学习进度和知识掌握情况。
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 使用场景 -->
        <section class="use-cases">
            <div class="use-cases-container">
                <h2 class="section-title">适用场景</h2>
                <div class="use-cases-grid">
                    <div class="use-case">
                        <div class="use-case-icon">🌍</div>
                        <h3>语言学习</h3>
                        <p>
                            创建英语、日语等语言学习项目，整合各类学习资料，与AI练习对话，快速提升语言能力。
                        </p>
                    </div>
                    <div class="use-case">
                        <div class="use-case-icon">💻</div>
                        <h3>技术研究</h3>
                        <p>
                            收集编程、AI、区块链等技术文档，通过AI对话深入理解复杂技术概念。
                        </p>
                    </div>
                    <div class="use-case">
                        <div class="use-case-icon">📖</div>
                        <h3>学术研究</h3>
                        <p>
                            整理论文资料，与AI讨论学术观点，加速研究进程，提升学术水平。
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 浏览器支持 -->
        <section class="browser-support" id="browser-support">
            <div class="browser-support-container">
                <h2 class="section-title">支持主流浏览器</h2>
                <p class="browser-subtitle">
                    EdgeMind插件支持多款主流浏览器，让您在任何环境下都能享受AI助手服务
                </p>
                <div class="browsers-grid">
                    <div class="browser-card recommended">
                        <div class="browser-icon">
                            <img
                                src={googleIcon}
                                alt="Google Chrome"
                                width="96"
                                height="96" />
                        </div>
                        <h3>Google Chrome</h3>
                        <p>谷歌官方浏览器</p>
                        <span class="recommended-badge">最受欢迎</span>
                        <button
                            class="browser-download-btn"
                            on:click={() => downloadExtension("chrome")}>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2">
                                <path
                                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7,10 12,15 17,10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            下载插件
                        </button>
                    </div>
                    <div class="browser-card">
                        <div class="browser-icon">
                            <img
                                src={edgeIcon}
                                alt="Microsoft Edge"
                                width="96"
                                height="96" />
                        </div>
                        <h3>Microsoft Edge</h3>
                        <p>微软官方浏览器</p>
                        <button
                            class="browser-download-btn"
                            on:click={() => downloadExtension("edge")}>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2">
                                <path
                                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7,10 12,15 17,10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            下载插件
                        </button>
                    </div>
                    <div class="browser-card">
                        <div class="browser-icon">
                            <img
                                src={firefoxIcon}
                                alt="Mozilla Firefox"
                                width="96"
                                height="96" />
                        </div>
                        <h3>Mozilla Firefox</h3>
                        <p>火狐官方浏览器</p>
                        <button
                            class="browser-download-btn"
                            on:click={() => downloadExtension("firefox")}>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2">
                                <path
                                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7,10 12,15 17,10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            下载插件
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="cta">
            <div class="cta-container">
                <h2 class="cta-title">开始您的智能学习之旅</h2>
                <p class="cta-subtitle">
                    立即下载EdgeMind浏览器插件，体验全新的AI辅助学习方式
                </p>
            </div>
        </section>
    </main>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        background: #ffffff;
        color: #2d3748;
        line-height: 1.6;
    }

    .homepage {
        min-height: 100vh;
    }

    /* 导航栏 */
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid #e2e8f0;
        z-index: 1000;
    }

    .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.5rem;
        font-weight: 700;
    }

    .logo-text {
        background: linear-gradient(135deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .nav-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .nav-btn {
        background: none;
        border: 2px solid #667eea;
        color: #667eea;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .nav-btn:hover {
        background: #667eea;
        color: white;
    }

    .download-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .download-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    /* 主要内容 */
    .main-content {
        padding-top: 80px;
    }

    /* Hero Section */
    .hero {
        padding: 4rem 0 6rem;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        position: relative;
    }

    .hero-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
    }

    .hero-content {
        max-width: 500px;
    }

    .hero-badge {
        display: inline-flex;
        align-items: center;
        background: rgba(102, 126, 234, 0.1);
        color: #667eea;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        border: 1px solid rgba(102, 126, 234, 0.2);
    }

    .hero-title {
        font-size: 2.8rem;
        font-weight: 800;
        line-height: 1.2;
        margin: 0 0 1.5rem 0;
        color: #1e293b;
    }

    .highlight {
        background: linear-gradient(135deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero-description {
        font-size: 1.1rem;
        color: #64748b;
        line-height: 1.6;
        margin: 0 0 2rem 0;
    }

    .hero-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .download-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 0.875rem 1.5rem;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .download-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .demo-btn {
        background: white;
        color: #667eea;
        border: 2px solid #e2e8f0;
        padding: 0.875rem 1.5rem;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .demo-btn:hover {
        border-color: #667eea;
        transform: translateY(-2px);
    }

    /* 预览窗口 */
    .hero-visual {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .preview-window {
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        border: 1px solid #e2e8f0;
        width: 100%;
        max-width: 400px;
        overflow: hidden;
    }

    .window-header {
        background: #f8fafc;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        border-bottom: 1px solid #e2e8f0;
    }

    .window-controls {
        display: flex;
        gap: 0.5rem;
    }

    .control {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }

    .control.red {
        background: #ff5f57;
    }

    .control.yellow {
        background: #ffbd2e;
    }

    .control.green {
        background: #28ca42;
    }

    .window-title {
        font-size: 0.9rem;
        font-weight: 600;
        color: #64748b;
        flex: 1;
        text-align: center;
    }

    .window-content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-height: 200px;
    }

    .chat-message {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
    }

    .chat-message.user {
        justify-content: flex-end;
    }

    .chat-message.user .message-content {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        max-width: 80%;
    }

    .chat-message.ai .message-content {
        background: #f8fafc;
        color: #1e293b;
        border: 1px solid #e2e8f0;
        max-width: 85%;
    }

    .message-content {
        padding: 0.75rem 1rem;
        border-radius: 16px;
        font-size: 0.9rem;
        line-height: 1.4;
    }

    .selected-word {
        background: rgba(255, 255, 255, 0.2);
        padding: 0.2rem 0.4rem;
        border-radius: 6px;
        font-weight: 600;
        margin-right: 0.5rem;
    }

    .question {
        opacity: 0.9;
    }

    .ai-icon {
        width: 32px;
        height: 32px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        flex-shrink: 0;
        margin-top: 0.2rem;
    }

    .typing-indicator {
        display: flex;
        gap: 0.25rem;
        align-items: center;
        padding: 0.75rem 1rem;
        background: #f8fafc;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        width: fit-content;
        margin-left: 2.5rem;
    }

    .typing-indicator span {
        width: 6px;
        height: 6px;
        background: #94a3b8;
        border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out;
    }

    .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes typing {
        0%,
        60%,
        100% {
            transform: translateY(0);
            opacity: 0.4;
        }
        30% {
            transform: translateY(-10px);
            opacity: 1;
        }
    }

    /* 功能特性 */
    .features {
        padding: 6rem 0;
        background: white;
    }

    .features-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .section-title {
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 3rem 0;
        color: #2d3748;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .feature-card {
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 20px;
        padding: 2.5rem 2rem;
        text-align: center;
        transition: all 0.3s ease;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        min-height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        overflow: hidden;
    }

    .feature-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .feature-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.15);
        border-color: #667eea;
    }

    .feature-card:hover::before {
        opacity: 1;
    }

    .feature-icon {
        font-size: 3.5rem;
        margin-bottom: 1.5rem;
        filter: grayscale(0.2);
        transition: filter 0.3s ease;
    }

    .feature-card:hover .feature-icon {
        filter: grayscale(0);
    }

    .feature-card h3 {
        font-size: 1.6rem;
        font-weight: 700;
        margin: 0 0 1rem 0;
        color: #2d3748;
        background: linear-gradient(135deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .feature-card p {
        color: #4a5568;
        line-height: 1.7;
        margin: 0;
        font-size: 1rem;
    }

    /* 使用场景 */
    .use-cases {
        padding: 6rem 0;
        background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    }

    .use-cases-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .use-cases-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
    }

    .use-case {
        background: white;
        border-radius: 20px;
        padding: 3rem 2rem;
        text-align: center;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        border: 2px solid transparent;
        min-height: 280px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .use-case:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.15);
        border-color: #667eea;
    }

    .use-case-icon {
        font-size: 3.5rem;
        margin-bottom: 1.5rem;
    }

    .use-case h3 {
        font-size: 1.6rem;
        font-weight: 700;
        margin: 0 0 1rem 0;
        color: #2d3748;
        background: linear-gradient(135deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .use-case p {
        color: #4a5568;
        line-height: 1.7;
        margin: 0;
        font-size: 1rem;
    }

    /* 浏览器支持 */
    .browser-support {
        padding: 6rem 0;
        background: white;
    }

    .browser-support-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        text-align: center;
    }

    .browser-subtitle {
        font-size: 1.1rem;
        color: #4a5568;
        margin: 0 0 3rem 0;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
    }

    .browsers-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        max-width: 1000px;
        margin: 0 auto;
    }

    .browser-card {
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 16px;
        padding: 1.5rem 1rem;
        text-align: center;
        transition: all 0.3s ease;
        position: relative;
        min-height: 240px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
    }

    .browser-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        border-color: #667eea;
    }

    .browser-card.recommended {
        background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.05),
            rgba(118, 75, 162, 0.05)
        );
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
    }

    .browser-card.recommended:hover {
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.25);
    }

    .browser-icon {
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .browser-icon img {
        border-radius: 8px;
        transition: transform 0.3s ease;
    }

    .browser-card:hover .browser-icon img {
        transform: scale(1.05);
    }

    .browser-card h3 {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        color: #2d3748;
    }

    .browser-card p {
        color: #718096;
        margin: 0 0 1.5rem 0;
        font-size: 0.9rem;
    }

    .recommended-badge {
        position: absolute;
        top: -8px;
        right: 15px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 16px;
        font-size: 0.75rem;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .browser-download-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 0.6rem 1rem;
        border-radius: 10px;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
        width: 100%;
        margin-top: auto;
    }

    .browser-download-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
    }

    .browser-card.recommended .browser-download-btn {
        background: linear-gradient(135deg, #4c51bf, #553c9a);
        box-shadow: 0 4px 12px rgba(76, 81, 191, 0.3);
    }

    .browser-card.recommended .browser-download-btn:hover {
        box-shadow: 0 6px 20px rgba(76, 81, 191, 0.4);
    }

    /* CTA Section */
    .cta {
        padding: 6rem 0;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        text-align: center;
    }

    .cta-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .cta-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 1rem 0;
    }

    .cta-subtitle {
        font-size: 1.25rem;
        margin: 0 0 2rem 0;
        opacity: 0.9;
        line-height: 1.6;
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .nav-container {
            padding: 1rem;
        }

        .nav-actions {
            flex-direction: column;
            gap: 0.5rem;
        }

        .hero-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
        }

        .hero-content {
            max-width: none;
        }

        .hero-title {
            font-size: 2.2rem;
        }

        .hero-description {
            font-size: 1rem;
        }

        .hero-actions {
            justify-content: center;
        }

        .preview-window {
            max-width: 100%;
        }

        .window-content {
            padding: 1rem;
        }

        .features-container,
        .use-cases-container,
        .browser-support-container,
        .cta-container {
            padding: 0 1rem;
        }

        .section-title {
            font-size: 2rem;
        }

        .cta-title {
            font-size: 2rem;
        }
    }

    @media (max-width: 480px) {
        .hero-actions {
            flex-direction: column;
            width: 100%;
        }

        .features-grid,
        .use-cases-grid {
            grid-template-columns: 1fr;
        }

        .browsers-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .browser-card {
            min-height: 200px;
        }

        .browser-icon img {
            width: 64px !important;
            height: 64px !important;
        }
    }
</style>
