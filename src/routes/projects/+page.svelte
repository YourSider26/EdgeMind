<script lang="ts">
	import { onMount } from 'svelte';

	interface Project {
		id: string;
		name: string;
		documentCount: number;
		favoriteCount: number;
		createdAt: string;
	}

	let projects: Project[] = [];
	let showAddModal = false;
	let newProjectName = '';

	// 模拟数据
	onMount(() => {
		projects = [
			{
				id: '1',
				name: 'EdgeMind AI 助手',
				documentCount: 24,
				favoriteCount: 12,
				createdAt: '2024-01-15'
			},
			{
				id: '2',
				name: '智能文档管理系统',
				documentCount: 156,
				favoriteCount: 89,
				createdAt: '2024-02-20'
			},
			{
				id: '3',
				name: '数据分析平台',
				documentCount: 78,
				favoriteCount: 45,
				createdAt: '2024-03-10'
			}
		];
	});

	function addProject() {
		if (newProjectName.trim()) {
			const newProject: Project = {
				id: Date.now().toString(),
				name: newProjectName.trim(),
				documentCount: 0,
				favoriteCount: 0,
				createdAt: new Date().toISOString().split('T')[0]
			};
			projects = [...projects, newProject];
			newProjectName = '';
			showAddModal = false;
		}
	}

	function deleteProject(id: string) {
		if (confirm('确定要删除这个项目吗？')) {
			projects = projects.filter(p => p.id !== id);
		}
	}

	function closeModal() {
		showAddModal = false;
		newProjectName = '';
	}
</script>

<svelte:head>
	<title>项目管理 - EdgeMind</title>
</svelte:head>

<div class="container">
	<header class="header">
		<div class="header-content">
			<h1 class="title">我的项目</h1>
			<button class="add-btn" on:click={() => showAddModal = true}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 5v14M5 12h14"/>
				</svg>
				新增项目
			</button>
		</div>
	</header>

	<main class="main">
		{#if projects.length === 0}
			<div class="empty-state">
				<div class="empty-icon">📁</div>
				<h3>暂无项目</h3>
				<p>点击"新增项目"按钮创建你的第一个项目</p>
			</div>
		{:else}
			<div class="projects-grid">
				{#each projects as project (project.id)}
					<div class="project-card">
						<div class="card-header">
							<h3 class="project-name">{project.name}</h3>
							<button class="delete-btn" on:click={() => deleteProject(project.id)} title="删除项目">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c0-1 1-2 2-2v2"/>
									<path d="M10 11v6M14 11v6"/>
								</svg>
							</button>
						</div>
						
						<div class="card-stats">
							<div class="stat">
								<div class="stat-icon">📄</div>
								<div class="stat-content">
									<span class="stat-number">{project.documentCount}</span>
									<span class="stat-label">文档</span>
								</div>
							</div>
							
							<div class="stat">
								<div class="stat-icon">⭐</div>
								<div class="stat-content">
									<span class="stat-number">{project.favoriteCount}</span>
									<span class="stat-label">收藏</span>
								</div>
							</div>
						</div>
						
						<div class="card-footer">
							<span class="created-date">创建于 {project.createdAt}</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</main>
</div>

<!-- 新增项目模态框 -->
{#if showAddModal}
	<div class="modal-overlay" on:click={closeModal}>
		<div class="modal" on:click|stopPropagation>
			<div class="modal-header">
				<h2>新增项目</h2>
				<button class="close-btn" on:click={closeModal}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 6L6 18M6 6l12 12"/>
					</svg>
				</button>
			</div>
			
			<div class="modal-body">
				<label for="projectName" class="form-label">项目名称</label>
				<input
					id="projectName"
					type="text"
					bind:value={newProjectName}
					placeholder="请输入项目名称"
					class="form-input"
					on:keydown={(e) => e.key === 'Enter' && addProject()}
				/>
			</div>
			
			<div class="modal-footer">
				<button class="cancel-btn" on:click={closeModal}>取消</button>
				<button class="confirm-btn" on:click={addProject} disabled={!newProjectName.trim()}>
					创建项目
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
	}

	.header {
		margin-bottom: 2rem;
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		padding: 1.5rem 2rem;
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}

	.title {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
		color: #2d3748;
		background: linear-gradient(135deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.add-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
	}

	.add-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
	}

	.main {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		color: #718096;
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.empty-state h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.5rem;
		color: #4a5568;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
	}

	.project-card {
		background: white;
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		border: 1px solid #e2e8f0;
		transition: all 0.2s ease;
	}

	.project-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

	.project-name {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: #2d3748;
		line-height: 1.3;
		flex: 1;
		margin-right: 1rem;
	}

	.delete-btn {
		background: none;
		border: none;
		color: #e53e3e;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 8px;
		transition: all 0.2s ease;
		opacity: 0.7;
	}

	.delete-btn:hover {
		background: #fed7d7;
		opacity: 1;
	}

	.card-stats {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.stat {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.stat-icon {
		font-size: 1.5rem;
	}

	.stat-content {
		display: flex;
		flex-direction: column;
	}

	.stat-number {
		font-size: 1.25rem;
		font-weight: 700;
		color: #2d3748;
		line-height: 1;
	}

	.stat-label {
		font-size: 0.875rem;
		color: #718096;
		margin-top: 0.25rem;
	}

	.card-footer {
		padding-top: 1rem;
		border-top: 1px solid #e2e8f0;
	}

	.created-date {
		font-size: 0.875rem;
		color: #718096;
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

	/* 响应式设计 */
	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.header-content {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}

		.title {
			font-size: 1.5rem;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}

		.card-stats {
			flex-direction: column;
			gap: 1rem;
		}

		.modal {
			margin: 1rem;
		}

		.modal-body {
			padding: 1.5rem;
		}
	}
</style>