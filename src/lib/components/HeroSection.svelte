<script lang="ts">
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    function handleDownloadClick() {
        dispatch("download-plugin")
    }
    function handleProjectsClick() {
        dispatch("navigate-to-projects")
    }

    function handleDemoClick() {
        dispatch("navigate-to-projects")
    }
</script>

<section class="hero">
    <div class="hero-container">
        <div class="hero-content">
            <h1 class="hero-title">
                <span class="highlight"> EdgeMind AI学习助手<br /></span>
            </h1>
            <h2>学习系统化、更高效</h2>
            <p class="hero-description">
                选中任意网页文字，开启即时AI对话。自动整合知识文档，快速打造属于你的学习空间。
            </p>

            <div class="hero-actions">
                <button class="download-btn" on:click={handleDownloadClick}>
                    <span>立即下载</span>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7,10 12,15 17,10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                </button>
                <button class="nav-btn" on:click={handleProjectsClick}>
                    我的项目
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
                            <span class="selected-word">Machine Learning</span>
                            <span class="question">这是什么？</span>
                        </div>
                    </div>
                    <div class="chat-message ai">
                        <div class="ai-icon">AI</div>
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

<style>
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

    .hero-title {
        font-size: 3.5rem;
        font-weight: 800;
        line-height: 1.15;
        margin: 0 0 2rem 0;
        color: #0f172a;
        letter-spacing: -1.5px;
    }

    .highlight {
        display: block;
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(
            120deg,
            #667eea 0%,
            #764ba2 50%,
            #f093fb 100%
        );
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 3s linear infinite;
        margin-bottom: 0.8rem;
        letter-spacing: 0.5px;
        text-transform: none;
        filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.15));
    }

    @keyframes shimmer {
        0% {
            background-position: 0% center;
        }
        100% {
            background-position: 200% center;
        }
    }

    .hero-description {
        font-size: 1.15rem;
        color: #475569;
        line-height: 1.75;
        margin: 0 0 2.5rem 0;
        font-weight: 400;
        max-width: 95%;
        letter-spacing: 0.2px;
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

    .nav-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: none;
        color: #764ba2;
        border: none;
        padding: 0.875rem 1.5rem;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .nav-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        background-color: rgba(102, 126, 234, 0.1);
    }

    /* 预览窗口 */
    .hero-visual {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .preview-window {
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        width: 100%;
        max-width: 400px;
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
        background: #ef4444;
    }

    .control.yellow {
        background: #f59e0b;
    }

    .control.green {
        background: #10b981;
    }

    .window-title {
        font-size: 0.875rem;
        font-weight: 600;
        color: #64748b;
    }

    .window-content {
        padding: 1.5rem;
        min-height: 200px;
    }

    .chat-message {
        margin-bottom: 1rem;
        display: flex;
        gap: 0.75rem;
    }

    .chat-message.user {
        justify-content: flex-end;
    }

    .chat-message.user .message-content {
        background: #667eea;
        color: white;
        border-radius: 18px 18px 4px 18px;
    }

    .chat-message.ai .message-content {
        background: #f1f5f9;
        color: #334155;
        border-radius: 18px 18px 18px 4px;
    }

    .message-content {
        padding: 0.75rem 1rem;
        max-width: 80%;
        font-size: 0.875rem;
        line-height: 1.4;
    }

    .selected-word {
        background: rgba(255, 255, 255, 0.2);
        padding: 0.125rem 0.375rem;
        border-radius: 4px;
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
        color: #ffffff;
    }

    .typing-indicator {
        display: flex;
        gap: 0.25rem;
        align-items: center;
        padding: 0.75rem 1rem;
        background: #f1f5f9;
        border-radius: 18px 18px 18px 4px;
        width: fit-content;
    }

    .typing-indicator span {
        width: 6px;
        height: 6px;
        background: #94a3b8;
        border-radius: 50%;
        animation: typing 1.4s infinite;
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

    /* 响应式设计 */
    @media (max-width: 768px) {
        .hero {
            padding: 2rem 0 4rem;
        }

        .hero-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
        }

        .hero-title {
            font-size: 2.2rem;
        }

        .hero-description {
            font-size: 1rem;
        }

        .preview-window {
            max-width: 350px;
        }

        .window-content {
            padding: 1rem;
            min-height: 150px;
        }
    }
</style>
