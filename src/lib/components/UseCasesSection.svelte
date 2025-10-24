<script lang="ts">
    const useCases = [
        {
            icon: "🌍",
            title: "语言学习",
            description: "创建英语、日语等语言学习项目，整合各类学习资料，与AI练习对话，快速提升语言能力。"
        },
        {
            icon: "💻",
            title: "技术研究",
            description: "收集编程、AI、区块链等技术文档，通过AI对话深入理解复杂技术概念。"
        },
        {
            icon: "📖",
            title: "学术研究",
            description: "整理论文资料，与AI讨论学术观点，加速研究进程，提升学术水平。"
        }
    ]
</script>

<section class="use-cases">
    <div class="use-cases-container">
        <div class="section-header">
            <h2 class="section-title">适用场景</h2>
            <p class="section-subtitle">
                无论您是学生、研究者还是职场人士，EdgeMind都能为您提供个性化的学习支持
            </p>
        </div>
        
        <div class="use-cases-grid">
            {#each useCases as useCase}
                <div class="use-case">
                    <div class="use-case-icon">{useCase.icon}</div>
                    <h3 class="use-case-title">{useCase.title}</h3>
                    <p class="use-case-description">{useCase.description}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .use-cases {
        padding: 6rem 0;
        background: #ffffff;
    }

    .use-cases-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .section-header {
        text-align: center;
        margin-bottom: 4rem;
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

    .section-subtitle {
        font-size: 1.1rem;
        color: #64748b;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
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
        display: block;
    }

    .use-case-title {
        font-size: 1.6rem;
        font-weight: 700;
        margin: 0 0 1rem 0;
        color: #2d3748;
        background: linear-gradient(135deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .use-case-description {
        color: #64748b;
        line-height: 1.6;
        margin: 0;
        font-size: 0.95rem;
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .use-cases {
            padding: 4rem 0;
        }

        .use-cases-container {
            padding: 0 1rem;
        }

        .section-header {
            margin-bottom: 3rem;
        }

        .section-title {
            font-size: 2rem;
        }

        .section-subtitle {
            font-size: 1rem;
        }

        .use-cases-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .use-case {
            padding: 1.5rem;
            min-height: 240px;
        }

        .use-case-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
    }
</style>
