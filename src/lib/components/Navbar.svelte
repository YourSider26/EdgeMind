<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    
    const dispatch = createEventDispatcher()
    
    function handleProjectsClick() {
        dispatch('navigate-to-projects')
    }
    
    function handleDownloadClick() {
        dispatch('download-plugin')
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
            <button class="nav-btn" on:click={handleProjectsClick}>
                项目管理
            </button>
            <button class="download-btn" on:click={handleDownloadClick}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        z-index: 100;
    }

    .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem 2rem;
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
    }

    .logo-text {
        font-size: 1.5rem;
        font-weight: 700;
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
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }

    .download-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .nav-container {
            padding: 1rem;
        }

        .nav-actions {
            gap: 0.5rem;
        }

        .nav-btn,
        .download-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }

        .logo-text {
            font-size: 1.25rem;
        }
    }
</style>
