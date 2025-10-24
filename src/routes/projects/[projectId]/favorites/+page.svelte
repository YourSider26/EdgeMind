<script lang="ts">
    import { page } from "$app/stores"
    import { getProjectCollectList } from "$lib/services/common.service"
    import { onMount } from "svelte"

    interface FavoriteDocument {
        text: string
    }

    let projectId = ""
    let projectName = ""
    let favorites: FavoriteDocument[] = []
    let currentUserId = ""

    // 获取当前用户ID
    function getCurrentUserId() {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem("EDGEMIND_USERID")
            return storedUserId || ""
        }
        return ""
    }

    // 加载收藏列表
    async function loadFavorites() {
        try {
            favorites = await getProjectCollectList({
                projectId,
                userId: currentUserId
            })
        } catch {
            favorites = []
        }
    }

    // 返回上一页
    function goBack() {
        window.history.back()
    }

    onMount(() => {
        currentUserId = getCurrentUserId()
        projectId = $page.params.projectId || ""
        // 从URL查询参数中获取项目名称
        projectName = $page.url.searchParams.get("name") || "项目"
        loadFavorites()
    })
</script>

<svelte:head>
    <title>收藏列表 - {projectName} - EdgeMind</title>
</svelte:head>

<div class="container">
    <header class="header">
        <div class="header-content">
            <div class="header-left">
                <button class="back-btn" on:click={goBack} aria-label="返回">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <h1 class="title">{projectName} - 收藏列表</h1>
            </div>
        </div>
    </header>

    <main class="main">
        {#if favorites.length === 0}
            <div class="empty-state">
                <div class="empty-icon">⭐</div>
                <h3>暂无收藏</h3>
                <p>收藏的文档将显示在这里</p>
            </div>
        {:else}
            <div class="favorites-list">
                {#each favorites as favorite, index (favorite.text)}
                    <div class="favorite-item">
                        <div class="favorite-header"></div>
                        <div class="favorite-content two-lines-ellipsis">
                            {favorite.text}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </main>
</div>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1.5rem;
        min-height: 100vh;
    }

    .header {
        margin-bottom: 2rem;
    }

    .header-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .back-btn {
        background: none;
        border: 2px solid #e2e8f0;
        padding: 0.5rem;
        border-radius: 8px;
        color: #4a5568;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .back-btn:hover {
        background: #edf2f7;
        transform: translateX(-2px);
    }

    .title {
        margin: 0;
        font-size: 1.8rem;
        font-weight: 700;
        color: #2d3748;
    }

    .main {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        min-height: 500px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 2rem;
        text-align: center;
    }

    .empty-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }

    .empty-state h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
        color: #2d3748;
    }

    .empty-state p {
        margin: 0;
        color: #718096;
    }

    .favorites-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .favorite-item {
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        padding: 1.5rem;
        transition: all 0.3s ease;
    }

    .favorite-item:hover {
        border-color: #667eea;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
    }

    .favorite-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }

    .favorite-name {
        font-size: 1.2rem;
        font-weight: 600;
        color: #2d3748;
        margin: 0;
    }

    .favorite-date {
        font-size: 0.9rem;
        color: #718096;
    }

    .favorite-content {
        color: #4a5568;
        line-height: 1.6;
    }

    /* 两行省略样式 */
    .two-lines-ellipsis {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.6;
    }
</style>
