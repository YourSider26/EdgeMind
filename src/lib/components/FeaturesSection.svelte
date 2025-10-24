<script lang="ts">
    const features = [
        {
            icon: "✨",
            title: "选中即问",
            description: "选中网页中的任何文字，一键启动AI对话，获得即时解答和深度分析。"
        },
        {
            icon: "📚",
            title: "项目分类",
            description: "创建专属学习项目，如英语学习、日语学习等，让知识整合更有条理。"
        },
        {
            icon: "🔗",
            title: "知识整合",
            description: "自动整合浏览过的学习资料，构建个人知识图谱，提升学习效率。"
        },
        {
            icon: "💬",
            title: "对话式学习",
            description: "与AI进行自然对话，深入理解复杂概念，让学习变得更加有趣。"
        },
        {
            icon: "🎯",
            title: "个性化推荐",
            description: "基于学习历史和兴趣，智能推荐相关学习资源和知识点。"
        },
        {
            icon: "📊",
            title: "学习统计",
            description: "详细的学习数据分析，帮助您了解学习进度和知识掌握情况。"
        }
    ]
</script>

<section class="features">
    <div class="features-container">
        <div class="section-header">
            <h2 class="section-title">强大功能，简单易用</h2>
            <p class="section-subtitle">
                EdgeMind为您提供全方位的AI学习辅助功能，让知识获取变得更加高效
            </p>
        </div>
        
        <div class="features-grid">
            {#each features as feature}
                <div class="feature-card">
                    <div class="feature-icon">{feature.icon}</div>
                    <h3 class="feature-title">{feature.title}</h3>
                    <p class="feature-description">{feature.description}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .features {
        padding: 6rem 0;
        background: white;
    }

    .features-container {
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

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
    }

    .feature-card {
        background: #f8fafc;
        border-radius: 16px;
        padding: 2rem;
        text-align: center;
        transition: all 0.3s ease;
        border: 1px solid #e2e8f0;
        min-height: 280px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .feature-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
        background: white;
        border-color: rgba(102, 126, 234, 0.2);
    }

    .feature-icon {
        font-size: 3rem;
        margin-bottom: 1.5rem;
        display: block;
    }

    .feature-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1e293b;
        margin: 0 0 1rem 0;
    }

    .feature-description {
        color: #64748b;
        line-height: 1.6;
        margin: 0;
        font-size: 0.95rem;
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .features {
            padding: 4rem 0;
        }

        .features-container {
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

        .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .feature-card {
            padding: 1.5rem;
            min-height: 240px;
        }

        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
    }
</style>
