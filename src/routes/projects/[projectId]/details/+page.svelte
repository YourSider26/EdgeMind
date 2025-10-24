<script lang="ts">
    import { page } from "$app/stores"
    import { onMount } from "svelte"
    import mermaid from "mermaid"
    import {
        getProjectDocumentList,
        getProjectCollectList,
        getPrompt,
        updatePrompt
    } from "$lib/services/common.service"

    let projectId = ""
    let projectName = ""
    let documentCount = 0
    let favoriteCount = 0
    let currentUserId = ""
    let promptText = ""
    let savedPrompt = ""
    let isPromptSaved = false
    let isSaving = false
    let mermaidContainer: HTMLElement
    let dailyNewsEnabled = true // 每日新知开关
    
    // 每日新知数据（模拟数据）
    const dailyNews = [
        { title: "AI技术突破：GPT-5模型发布", url: "https://example.com/news1" },
        { title: "量子计算机实现新里程碑", url: "https://example.com/news2" },
        { title: "Web3.0开发框架更新", url: "https://example.com/news3" },
        { title: "机器学习在医疗领域的应用", url: "https://example.com/news4" },
        { title: "区块链技术最新进展", url: "https://example.com/news5" }
    ]
    
    // Mermaid 思维导图内容
    const mermaidContent = `graph TD

%% ==== 样式定义 ====
classDef api fill:#F5EBFF,stroke:#BE8FED,stroke-width:2px
classDef terms fill:#E5F6FF,stroke:#73A6FF,stroke-width:2px
classDef controller fill:#FFF6CC,stroke:#FFBC52,stroke-width:2px

%% ==== 图结构 ====
A[Swagger API 文档]:::api --> B[Select a spec]
B --> C[All]
A --> D[Terms of service]:::terms
D --> E[Jeb - Website]
D --> F[Send email to Jeb]
D --> G[Apache 2.0]
A --> H[AI聊天]
H --> I[Ai Choose Job Chat Controller]:::controller
A --> J[basic-error-controller]:::controller
A --> K[Basic Error Controller]:::controller
A --> L[用户收藏]
L --> M[User Favorite Controller]:::controller
A --> N[用户项目]
N --> O[User Project Controller]:::controller
A --> P[用户项目提示词]
P --> Q[User Project Prompt Controller]:::controller
A --> R[Models]`

    // 获取当前用户ID
    function getCurrentUserId() {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem("EDGEMIND_USERID")
            return storedUserId || ""
        }
        return ""
    }

    // 加载项目数据
    async function loadProjectData() {
        try {
            currentUserId = getCurrentUserId()
            
            // 获取文档列表数量
            const documents = await getProjectDocumentList({
                projectId,
                userId: currentUserId
            })
            documentCount = documents.length
            
            // 获取收藏列表数量
            const favorites = await getProjectCollectList({
                projectId,
                userId: currentUserId
            })
            favoriteCount = favorites.length

            // 加载保存的提示词
            await loadSavedPrompt()
        } catch (error) {
            console.error("加载项目数据失败:", error)
            documentCount = 0
            favoriteCount = 0
        }
    }

    // 加载保存的提示词
    async function loadSavedPrompt() {
        if (!projectId || !currentUserId) return
        
        try {
            const response = await getPrompt({
                projectId,
                userId: currentUserId
            })
            
            if (response && response.promptText) {
                promptText = response.promptText
                savedPrompt = response.promptText
                isPromptSaved = true
            }
        } catch (error) {
            console.error("加载提示词失败:", error)
        }
    }

    // 保存提示词
    async function savePrompt() {
        if (!promptText.trim() || !projectId || !currentUserId) return
        
        isSaving = true
        try {
            await updatePrompt({
                projectId,
                userId: currentUserId,
                promptText: promptText.trim()
            })
            
            savedPrompt = promptText
            isPromptSaved = true
            
            // 模拟API延迟
            await new Promise(resolve => setTimeout(resolve, 500))
        } catch (error) {
            console.error("保存提示词失败:", error)
            alert("保存失败，请重试")
        } finally {
            isSaving = false
        }
    }

    // 跳转到文档列表页
    function goToDocuments() {
        const encodedName = encodeURIComponent(projectName)
        window.location.href = `/projects/${projectId}?name=${encodedName}`
    }

    // 跳转到收藏列表页
    function goToFavorites() {
        const encodedName = encodeURIComponent(projectName)
        window.location.href = `/projects/${projectId}/favorites?name=${encodedName}`
    }

    // 返回项目列表页
    function goBack() {
        window.location.href = '/projects'
    }

    // 下载思维导图
    function downloadMindmap() {
        try {
            const svgElement = mermaidContainer?.querySelector('svg')
            if (!svgElement) {
                alert('思维导图尚未加载完成，请稍后再试')
                return
            }

            // 克隆SVG元素以避免修改原始元素
            const clonedSvg = svgElement.cloneNode(true) as SVGElement
            
            // 设置SVG的xmlns属性
            clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
            
            // 获取SVG的XML字符串
            const svgData = new XMLSerializer().serializeToString(clonedSvg)
            
            // 创建Blob对象
            const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
            
            // 创建下载链接
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${projectName || 'project'}-architecture-${Date.now()}.svg`
            
            // 触发下载
            document.body.appendChild(link)
            link.click()
            
            // 清理
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('下载思维导图失败:', error)
            alert('下载失败，请重试')
        }
    }

    onMount(async () => {
        projectId = $page.params.projectId || ""
        // 从URL查询参数中获取项目名称
        projectName = $page.url.searchParams.get("name") || "项目"
        loadProjectData()
        
        // 初始化 Mermaid
        mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'basis'
            }
        })
        
        // 渲染思维导图
        if (mermaidContainer) {
            try {
                const { svg } = await mermaid.render('mermaid-diagram', mermaidContent)
                mermaidContainer.innerHTML = svg
            } catch (error) {
                console.error('Mermaid 渲染失败:', error)
                mermaidContainer.innerHTML = '<p style="color: #e53e3e;">思维导图渲染失败</p>'
            }
        }
    })
</script>

<svelte:head>
    <title>{projectName} - 项目详情 - EdgeMind</title>
</svelte:head>

<div class="container">
    <header class="header">
        <div class="header-content">
            <div class="header-left">
                <button class="back-btn" on:click={goBack}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    返回
                </button>
                <h1 class="title">{projectName}</h1>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="project-details">
            <div class="detail-header">
                <h2 class="section-title">项目详情</h2>
            </div>
            
            <div class="detail-cards">
                <!-- 第一行：预设规则/提示词、每日新知 -->
                <div class="detail-card prompt-card">
                    <div class="card-icon">💬</div>
                    <div class="card-info">
                        <h3 class="card-title">预设规则/提示词</h3>
                        <div class="prompt-input-container">
                            <textarea 
                                class="prompt-input" 
                                bind:value={promptText} 
                                placeholder="输入项目预设规则或提示词..."
                                rows="3"></textarea>
                            <button 
                                class="save-btn" 
                                on:click={savePrompt} 
                                disabled={isSaving || (!promptText.trim()) || (promptText === savedPrompt)}
                                class:saved={isPromptSaved && promptText === savedPrompt}>
                                {#if isSaving}
                                    保存中...
                                {:else if isPromptSaved && promptText === savedPrompt}
                                    已保存
                                {:else}
                                    保存
                                {/if}
                            </button>
                        </div>
                    </div>
                </div>

                <div class="detail-card news-card">
                    <div class="card-header">
                        <div class="card-title-row">
                            <div class="card-icon">📰</div>
                            <h3 class="card-title">每日新知</h3>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" bind:checked={dailyNewsEnabled} />
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    {#if dailyNewsEnabled}
                        <div class="news-list">
                            {#each dailyNews as news, index}
                                <a href={news.url} target="_blank" rel="noopener noreferrer" class="news-item">
                                    <span class="news-number">{index + 1}</span>
                                    <span class="news-title">{news.title}</span>
                                    <svg class="news-link-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </a>
                            {/each}
                        </div>
                    {/if}
                </div>

                <!-- 第二行：文档、收藏 -->
                <div 
                    class="detail-card" 
                    on:click={goToDocuments}
                    on:keydown={(e) => e.key === 'Enter' && goToDocuments()}
                    role="button"
                    tabindex="0">
                    <div class="card-icon">📄</div>
                    <div class="card-info">
                        <h3 class="card-title">文档</h3>
                        <div class="card-stats">
                            <span class="stat-count">{documentCount}</span>
                            <span class="stat-label">个文档</span>
                        </div>
                        <p class="card-description">查看和管理项目文档</p>
                    </div>
                </div>

                <div 
                    class="detail-card"
                    on:click={goToFavorites}
                    on:keydown={(e) => e.key === 'Enter' && goToFavorites()}
                    role="button"
                    tabindex="0">
                    <div class="card-icon">⭐</div>
                    <div class="card-info">
                        <h3 class="card-title">收藏</h3>
                        <div class="card-stats">
                            <span class="stat-count">{favoriteCount}</span>
                            <span class="stat-label">个收藏</span>
                        </div>
                        <p class="card-description">查看项目收藏内容</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Mermaid 思维导图区域 -->
        <div class="mindmap-section">
            <div class="mindmap-header">
                <h2 class="section-title">知识图谱</h2>
                <button class="download-btn" on:click={downloadMindmap} title="下载思维导图">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>下载</span>
                </button>
            </div>
            <div class="mindmap-container" bind:this={mermaidContainer}>
                <!-- Mermaid 图表将在此处渲染 -->
            </div>
        </div>
    </main>
</div>

<style>
    :global(body) {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
    }

    .header {
        margin-bottom: 2.5rem;
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .back-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.325rem 1.25rem;
        background-color: rgba(255, 255, 255, 0.95);
        border: none;
        border-radius: 0.5rem;
        color: #4a5568;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .back-btn:hover {
        background-color: white;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .title {
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
        color: white;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .main {
        min-height: calc(100vh - 250px);
    }

    .project-details {
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
        backdrop-filter: blur(10px);
        border-radius: 1rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .detail-header {
        margin-bottom: 2rem;
        padding-bottom: 1.25rem;
        border-bottom: 2px solid rgba(102, 126, 234, 0.2);
    }

    .section-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .detail-cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }

    .detail-card {
        display: flex;
        padding: 2rem;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
        border-radius: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.5);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .detail-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .detail-card:hover::before {
        opacity: 1;
    }

    .detail-card:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 12px 32px rgba(102, 126, 234, 0.3);
        border-color: rgba(102, 126, 234, 0.4);
    }

    .card-icon {
        font-size: 2.5rem;
        margin-right: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 1rem;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        position: relative;
        z-index: 1;
    }

    .card-info {
        flex: 1;
        position: relative;
        z-index: 1;
    }

    .card-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0 0 0.75rem 0;
        color: #2d3748;
    }

    .card-stats {
        display: flex;
        align-items: baseline;
        margin-bottom: 1rem;
        padding: 0.75rem 1rem;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        border-radius: 0.5rem;
        border-left: 3px solid #667eea;
    }

    .stat-count {
        font-size: 2rem;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-right: 0.5rem;
    }

    .stat-label {
        color: #4a5568;
        font-size: 0.875rem;
        font-weight: 600;
    }

    .card-description {
        font-size: 0.875rem;
        color: #718096;
        margin: 0;
        line-height: 1.6;
    }
    
    .prompt-card {
        cursor: default;
    }
    
    .prompt-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
    }
    
    .prompt-input-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
        width: 100%;
    }
    
    .prompt-input {
        width: 100%;
        padding: 1rem;
        border: 2px solid rgba(102, 126, 234, 0.2);
        border-radius: 0.75rem;
        font-size: 0.875rem;
        resize: vertical;
        min-height: 120px;
        color: #2d3748;
        background-color: rgba(255, 255, 255, 0.8);
        transition: all 0.3s ease;
        font-family: inherit;
        line-height: 1.6;
        box-sizing: border-box;
    }
    
    .prompt-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        background-color: white;
    }
    
    .prompt-input::placeholder {
        color: #a0aec0;
    }
    
    .save-btn {
        align-self: flex-end;
        padding: 0.75rem 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        position: relative;
        overflow: hidden;
    }
    
    .save-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.5s ease;
    }
    
    .save-btn:hover:not(:disabled)::before {
        left: 100%;
    }
    
    .save-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
    }
    
    .save-btn:active:not(:disabled) {
        transform: translateY(0);
    }
    
    .save-btn:disabled {
        background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
        cursor: not-allowed;
        opacity: 0.7;
        box-shadow: none;
    }
    
    .save-btn.saved {
        background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
    }

    /* 每日新知卡片样式 */
    .news-card {
        cursor: default;
        flex-direction: column;
    }

    .news-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 1rem;
    }

    .card-title-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 24px;
    }

    .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%);
        transition: all 0.3s ease;
        border-radius: 24px;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .toggle-slider:before {
        position: absolute;
        content: '';
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background: white;
        transition: all 0.3s ease;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    input:checked + .toggle-slider {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    input:checked + .toggle-slider:before {
        transform: translateX(24px);
    }

    .news-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: 100%;
    }

    .news-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.6);
        border: 1px solid rgba(102, 126, 234, 0.15);
        border-radius: 0.5rem;
        text-decoration: none;
        color: #2d3748;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .news-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        transform: scaleY(0);
        transition: transform 0.3s ease;
    }

    .news-item:hover::before {
        transform: scaleY(1);
    }

    .news-item:hover {
        background: rgba(255, 255, 255, 0.9);
        border-color: rgba(102, 126, 234, 0.3);
        transform: translateX(4px);
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
    }

    .news-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 50%;
        font-size: 0.75rem;
        font-weight: 600;
        flex-shrink: 0;
    }

    .news-title {
        flex: 1;
        font-size: 0.875rem;
        font-weight: 500;
        color: #2d3748;
        line-height: 1.4;
    }

    .news-link-icon {
        flex-shrink: 0;
        color: #667eea;
        opacity: 0.6;
        transition: all 0.3s ease;
    }

    .news-item:hover .news-link-icon {
        opacity: 1;
        transform: translateX(2px) translateY(-2px);
    }
    
    /* Mermaid 思维导图区域样式 */
    .mindmap-section {
        margin-top: 2.5rem;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
        backdrop-filter: blur(10px);
        border-radius: 1.5rem;
        padding: 2rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
    
    .mindmap-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    .download-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 1.25rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        color: #ffffff;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }
    
    .mindmap-section:hover .download-btn {
        opacity: 1;
    }
    
    .download-btn svg {
        transition: transform 0.3s ease;
    }
    
    .download-btn:hover {
        background: linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
    }
    
    .download-btn:hover svg {
        transform: translateY(2px);
    }
    
    .download-btn:active {
        transform: translateY(0);
    }
    
    .mindmap-container {
        min-height: 400px;
        background: white;
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
        overflow-x: auto;
        overflow-y: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .mindmap-container :global(svg) {
        max-width: 100%;
        height: auto;
        display: block;
    }

    @media (max-width: 768px) {
        .container {
            padding: 1.5rem 1rem;
        }
        
        .title {
            font-size: 1.75rem;
        }
        
        .detail-cards {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .detail-card {
            padding: 1.5rem;
        }
        
        .card-icon {
            width: 56px;
            height: 56px;
            font-size: 2rem;
        }
        
        .stat-count {
            font-size: 1.75rem;
        }
        
        .mindmap-section {
            padding: 1.5rem;
        }
        
        .mindmap-container {
            padding: 1.5rem;
            min-height: 300px;
        }
        
        .news-item {
            padding: 0.625rem 0.875rem;
        }
        
        .news-number {
            width: 22px;
            height: 22px;
            font-size: 0.7rem;
        }
        
        .news-title {
            font-size: 0.8125rem;
        }
    }

    @media (max-width: 480px) {
        .container {
            padding: 1rem 0.75rem;
        }
        
        .title {
            font-size: 1.5rem;
        }
        
        .back-btn {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
        }
        
        .project-details {
            padding: 1.5rem;
        }
        
        .section-title {
            font-size: 1.25rem;
        }
        
        .detail-cards {
            gap: 1.25rem;
        }
        
        .detail-card {
            padding: 1.25rem;
        }
        
        .card-icon {
            width: 48px;
            height: 48px;
            font-size: 1.75rem;
        }
        
        .mindmap-section {
            padding: 1rem;
            margin-top: 2rem;
        }
        
        .mindmap-container {
            padding: 1rem;
            min-height: 250px;
        }
        
        .card-title {
            font-size: 1.125rem;
        }
        
        .stat-count {
            font-size: 1.5rem;
        }
        
        .prompt-input {
            min-height: 100px;
            padding: 0.875rem;
        }
        
        .save-btn {
            padding: 0.625rem 1.5rem;
        }
        
        .prompt-helper {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
        }
        
        .helper-example-btn {
            align-self: flex-end;
        }
    }
</style>