<script lang="ts">
    import edgeIcon from "$lib/assets/edge.png"
    import firefoxIcon from "$lib/assets/firefox.png"
    import googleIcon from "$lib/assets/google.png"
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    const browsers = [
        {
            id: "chrome",
            name: "Google Chrome",
            description: "谷歌官方浏览器",
            icon: googleIcon,
            recommended: true
        },
        {
            id: "edge",
            name: "Microsoft Edge",
            description: "微软官方浏览器",
            icon: edgeIcon,
            recommended: false
        },
        {
            id: "firefox",
            name: "Mozilla Firefox",
            description: "火狐官方浏览器",
            icon: firefoxIcon,
            recommended: false
        }
    ]

    function handleDownload(browserId: string) {
        dispatch("download-extension", { browser: browserId })
    }
</script>

<section class="browser-support" id="browser-support">
    <div class="browser-support-container">
        <h2 class="section-title">支持主流浏览器</h2>
        <p class="browser-subtitle">
            EdgeMind插件支持多款主流浏览器，让您在任何环境下都能享受AI助手服务
        </p>
        <div class="browsers-grid">
            {#each browsers as browser}
                <div
                    class="browser-card"
                    class:recommended={browser.recommended}>
                    {#if browser.recommended}
                        <span class="recommended-badge">最受欢迎</span>
                    {/if}
                    <div class="browser-icon">
                        <img
                            src={browser.icon}
                            alt={browser.name}
                            width="96"
                            height="96" />
                    </div>
                    <h3>{browser.name}</h3>
                    <p>{browser.description}</p>
                    <button
                        class="browser-download-btn"
                        on:click={() => handleDownload(browser.id)}>
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
            {/each}
        </div>
    </div>
</section>

<style>
    .browser-support {
        padding: 6rem 0;
        background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    }

    .browser-support-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        text-align: center;
    }

    .section-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 1rem 0;
        background: linear-gradient(135deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .browser-subtitle {
        font-size: 1.1rem;
        color: #64748b;
        line-height: 1.6;
        max-width: 600px;
        margin: 0 auto 4rem auto;
    }

    .browsers-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        max-width: 1000px;
        margin: 0 auto;
    }

    .browser-card {
        background: #f8fafc;
        border-radius: 16px;
        padding: 2rem 1.5rem;
        text-align: center;
        transition: all 0.3s ease;
        border: 2px solid #e2e8f0;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .browser-card.recommended {
        background: linear-gradient(135deg, #667eea0d, #764ba20d);
    }

    .browser-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
        background: white;
        border-color: #667eea;
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
        font-weight: 600;
        color: #1e293b;
        margin: 0 0 0.5rem 0;
    }

    .browser-card p {
        color: #64748b;
        margin: 0 0 1rem 0;
        font-size: 0.95rem;
        line-height: 1.6;
    }

    .recommended-badge {
        position: absolute;
        top: -12px;
        right: 12px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.7rem;
        font-weight: 600;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        z-index: 10;
    }

    .browser-download-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        width: 100%;
        margin-top: auto;
    }

    .browser-download-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .browser-support {
            padding: 4rem 0;
        }

        .browser-support-container {
            padding: 0 1rem;
        }

        .section-title {
            font-size: 2rem;
        }

        .browser-subtitle {
            font-size: 1rem;
            margin-bottom: 3rem;
        }

        .browsers-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .browser-card {
            padding: 1.5rem;
            min-height: 280px;
        }

        .browser-icon img {
            width: 64px !important;
            height: 64px !important;
        }
    }
</style>
