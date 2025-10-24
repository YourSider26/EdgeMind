<script lang="ts">
    import { page } from "$app/stores"
    import {
        addProjectDocument,
        getProjectDocumentList
    } from "$lib/services/common.service"
    import { onMount } from "svelte"

    interface Document {
        projectId: string
        chapter: string
        content: string
    }

    let projectId = ""
    let projectName = ""
    let documents: Document[] = []
    let showUploadModal = false
    let newDocName = ""
    let newDocContent = ""
    let currentUserId = ""

    // 获取当前用户ID
    function getCurrentUserId() {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem("EDGEMIND_USERID")
            return storedUserId || ""
        }
        return ""
    }

    // 加载文档列表
    async function loadDocuments() {
        try {
            documents = await getProjectDocumentList({
                projectId,
                userId: currentUserId
            })
        } catch {
            documents = []
        }
    }

    // 上传文档
    async function uploadDocument() {
        if (newDocName.trim() && newDocContent.trim()) {
            try {
                await addProjectDocument({
                    projectId,
                    chapter: newDocName,
                    content: newDocContent,
                    userId: currentUserId
                })
                loadDocuments()
                closeUploadModal()
            } catch (error) {
                console.error("上传文档失败:", error)
            }
        }
    }

    function closeUploadModal() {
        showUploadModal = false
        newDocName = ""
        newDocContent = ""
    }

    function goBack() {
        window.history.back()
    }

    onMount(() => {
        currentUserId = getCurrentUserId()
        projectId = $page.params.projectId || ""
        // 从URL查询参数中获取项目名称
        projectName = $page.url.searchParams.get("name") || "项目"
        loadDocuments()
    })
</script>

<svelte:head>
    <title>文档列表 - {projectName} - EdgeMind</title>
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
            <div class="header-right">
                <button
                    class="upload-btn"
                    on:click={() => (showUploadModal = true)}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    上传文档
                </button>
            </div>
        </div>
    </header>

    <main class="main">
        {#if documents.length === 0}
            <div class="empty-state">
                <div class="empty-icon">📄</div>
                <h3>暂无文档</h3>
                <p>点击"上传文档"按钮添加你的第一个文档</p>
            </div>
        {:else}
            <div class="documents-grid">
                {#each documents as doc (doc.projectId + doc.chapter + doc.content.substring(0, 5))}
                    <div class="document-card">
                        <div class="doc-icon">📄</div>
                        <div class="doc-info">
                            <h3 class="doc-name">{doc.chapter}</h3>
                            <p class="doc-preview">
                                {doc.content.substring(0, 100)}...
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </main>
</div>

<!-- 上传文档模态框 -->
{#if showUploadModal}
    <div class="modal-overlay" on:click={closeUploadModal} role="presentation">
        <div
            class="modal"
            on:click|stopPropagation
            role="dialog"
            aria-labelledby="upload-modal-title"
            aria-modal="true">
            <div class="modal-header">
                <h2 id="upload-modal-title">上传文档</h2>
                <button
                    class="close-btn"
                    on:click={closeUploadModal}
                    aria-label="关闭">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="modal-body">
                <div class="form-group">
                    <label for="docName" class="form-label">文档名称</label>
                    <input
                        id="docName"
                        type="text"
                        class="form-input"
                        bind:value={newDocName}
                        placeholder="请输入文档名称" />
                </div>

                <div class="form-group">
                    <label for="docContent" class="form-label">文档内容</label>
                    <textarea
                        id="docContent"
                        class="form-textarea"
                        bind:value={newDocContent}
                        placeholder="请输入文档内容"
                        rows="10"></textarea>
                </div>
            </div>

            <div class="modal-footer">
                <button class="cancel-btn" on:click={closeUploadModal}
                    >取消</button>
                <button
                    class="confirm-btn"
                    on:click={uploadDocument}
                    disabled={!newDocName.trim() || !newDocContent.trim()}>
                    保存
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .container {
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
    }

    .header {
        background: white;
        border-radius: 16px;
        padding: 1.5rem 2rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .back-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: #f7fafc;
        color: #4a5568;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
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

    .header-right {
        display: flex;
        gap: 1rem;
    }

    .upload-btn {
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
    }

    .upload-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
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

    .documents-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }

    .document-card {
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        padding: 1.5rem;
        transition: all 0.3s ease;
        cursor: pointer;
        display: flex;
        gap: 1rem;
    }

    .document-card:hover {
        border-color: #667eea;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        transform: translateY(-2px);
    }

    .doc-icon {
        font-size: 2.5rem;
        flex-shrink: 0;
    }

    .doc-info {
        flex: 1;
        min-width: 0;
    }

    .doc-name {
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: #2d3748;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .doc-preview {
        margin: 0 0 0.5rem 0;
        font-size: 0.9rem;
        color: #718096;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .doc-date {
        font-size: 0.85rem;
        color: #a0aec0;
    }

    /* 模态框样式 */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(4px);
    }

    .modal {
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e2e8f0;
    }

    .modal-header h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: #2d3748;
    }

    .close-btn {
        background: none;
        border: none;
        color: #718096;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 8px;
        transition: all 0.2s ease;
    }

    .close-btn:hover {
        background: #f7fafc;
        color: #2d3748;
    }

    .modal-body {
        padding: 2rem;
        overflow-y: auto;
        flex: 1;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #2d3748;
    }

    .form-input,
    .form-textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.2s ease;
        font-family: inherit;
        box-sizing: border-box;
    }

    .form-input:focus,
    .form-textarea:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-textarea {
        resize: vertical;
        min-height: 200px;
    }

    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding: 1.5rem 2rem;
        border-top: 1px solid #e2e8f0;
    }

    .cancel-btn {
        padding: 0.75rem 1.5rem;
        background: #f7fafc;
        color: #4a5568;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .cancel-btn:hover {
        background: #edf2f7;
    }

    .confirm-btn {
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .confirm-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .confirm-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        .container {
            padding: 1rem;
        }

        .header {
            padding: 1rem;
        }

        .header-content {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
        }

        .title {
            font-size: 1.5rem;
        }

        .documents-grid {
            grid-template-columns: 1fr;
        }

        .modal {
            width: 95%;
        }

        .modal-body {
            padding: 1.5rem;
        }
    }
</style>
