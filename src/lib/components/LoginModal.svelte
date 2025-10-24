<script lang="ts">
    import { createEventDispatcher } from "svelte"

    export let show = false
    export let userId = ""
    export let userIdError = ""

    const dispatch = createEventDispatcher()

    // 验证用户ID格式
    function validateUserId(id: string): boolean {
        // 基本要求：长度至少6位，不能包含空格
        const minLength = id.length >= 6
        const noSpaces = !/\s/.test(id)
        
        // 必须包含字母、数字和符号
        const hasLetter = /[a-zA-Z]/.test(id)
        const hasNumber = /[0-9]/.test(id)
        const hasSymbol = /[^a-zA-Z0-9\s]/.test(id)

        return minLength && noSpaces && hasLetter && hasNumber && hasSymbol
    }

    // 处理登录
    function handleLogin() {
        userIdError = ""

        if (!userId.trim()) {
            userIdError = "请输入用户ID"
            return
        }

        if (!validateUserId(userId.trim())) {
            userIdError = "用户ID必须包含字母、数字和符号，长度至少6位，且不能包含空格"
            return
        }

        dispatch("login", { userId: userId.trim() })
    }

    // 关闭弹窗
    function closeModal() {
        dispatch("close")
    }

    // 清除错误信息
    function clearError() {
        userIdError = ""
    }
</script>

{#if show}
    <div class="modal-overlay" on:click={closeModal}>
        <div class="modal" on:click|stopPropagation>
            <div class="modal-header">
                <h2>用户登录</h2>
                <button class="close-btn" on:click={closeModal}>
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
                <label for="userId" class="form-label">用户ID</label>
                <input
                    id="userId"
                    type="text"
                    bind:value={userId}
                    placeholder="请输入用户ID"
                    class="form-input"
                    class:error={userIdError}
                    on:keydown={(e) => e.key === "Enter" && handleLogin()}
                    on:input={clearError} />
                {#if userIdError}
                    <div class="error-message">{userIdError}</div>
                {/if}
                <div class="auto-create-notice">
                    如果用户不存在，系统将自动为您创建新用户
                </div>
                <div class="form-help">
                    <p>用户ID要求：</p>
                    <ul>
                        <li>必须包含字母（a-z, A-Z）</li>
                        <li>必须包含数字（0-9）</li>
                        <li>必须包含符号（如：@、-、_、#等）</li>
                        <li>长度至少6位</li>
                        <li>不能包含空格</li>
                    </ul>
                    <p class="example">
                        示例：user@123、my-name1、test#456、admin_01
                    </p>
                </div>
            </div>

            <div class="modal-footer">
                <button class="cancel-btn" on:click={closeModal}>取消</button>
                <button
                    class="confirm-btn"
                    on:click={handleLogin}
                    disabled={!userId.trim()}>
                    登录
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
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
        max-width: 500px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: modalSlideIn 0.3s ease;
    }

    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
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
    }

    .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #2d3748;
    }

    .form-input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.2s ease;
        box-sizing: border-box;
    }

    .form-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-input.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .error-message {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        font-weight: 500;
    }

    .form-help {
        margin-top: 1rem;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
    }

    .form-help p {
        margin: 0 0 0.5rem 0;
        font-size: 0.9rem;
        color: #4a5568;
        font-weight: 600;
    }

    .form-help ul {
        margin: 0.5rem 0;
        padding-left: 1.5rem;
        color: #64748b;
        font-size: 0.875rem;
    }

    .form-help li {
        margin-bottom: 0.25rem;
    }

    .form-help .example {
        margin-top: 0.75rem;
        font-style: italic;
        color: #667eea;
        font-weight: 500;
    }

    .auto-create-notice {
        gap: 0.5rem;
        margin-top: 0.5rem;
        border-radius: 6px;
        color: #FA8C16;
        font-weight: 500;
        font-size: 12px;
    }

    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding: 1.5rem 2rem;
        border-top: 1px solid #e2e8f0;
    }

    .cancel-btn {
        background: #f7fafc;
        color: #4a5568;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .cancel-btn:hover {
        background: #edf2f7;
    }

    .confirm-btn {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .confirm-btn:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .confirm-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
