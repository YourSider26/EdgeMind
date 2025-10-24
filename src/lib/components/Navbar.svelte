<script lang="ts">
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    function handleDownloadClick() {
        dispatch("download-plugin")
    }
</script>

<nav class="navbar">
    <div class="nav-container">
        <div class="nav-brand">
            <div class="logo">
                <span class="logo-text">EdgeMind</span>
            </div>
        </div>

        <div class="nav-actions">
            <button class="download-btn" on:click={handleDownloadClick}>
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

<style>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(102, 126, 234, 0.15);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
        z-index: 100;
    }

    .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1.25rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-brand {
        display: flex;
        align-items: center;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .logo:hover {
        transform: scale(1.05);
    }

    .logo-text {
        font-size: 1.75rem;
        font-weight: 800;
        letter-spacing: -0.5px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradientShift 3s ease infinite;
        filter: drop-shadow(0 2px 4px rgba(102, 126, 234, 0.2));
        text-shadow: 0 0 30px rgba(102, 126, 234, 0.3);
    }

    @keyframes gradientShift {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .nav-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .download-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 0.875rem 1.75rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.35),
                    0 2px 8px rgba(118, 75, 162, 0.25);
        position: relative;
        overflow: hidden;
    }

    .download-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.5s ease;
    }

    .download-btn:hover::before {
        left: 100%;
    }

    .download-btn:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.45),
                    0 4px 15px rgba(118, 75, 162, 0.35);
    }

    .download-btn:active {
        transform: translateY(-1px) scale(0.98);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .download-btn svg {
        transition: transform 0.3s ease;
    }

    .download-btn:hover svg {
        transform: translateY(2px);
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .nav-container {
            padding: 1rem;
        }

        .nav-actions {
            gap: 0.5rem;
        }

        .download-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }

        .logo-text {
            font-size: 1.25rem;
        }
    }
</style>
