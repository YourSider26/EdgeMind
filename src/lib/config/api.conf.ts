export default {
    GET_USER_PROJECT_LIST: "/portal/v1/user/project/list", // 获取用户项目列表
    ADD_USER_PROJECT: "/portal/v1/user/project/add", // 新增项目
    GET_PROJECT_DETAIL: "/portal/v1/user/project/project-detail", // 获取项目详情
    DELETE_USER_PROJECT: "/portal/v1/user/project/delete", // 删除项目
    ADD_PROJECT_DOCUMENT: "/portal/v1/ai-chat/chat/embedding", // 新增项目文档
    GET_PROJECT_DOCUMENT_LIST: "/portal/v1/ai-chat/chat/query-embedding", // 获取项目文档列表
    GET_PROJECT_COLLECT_LIST: "/portal/v1/user/favorite/list", // 获取项目收藏列表
    GET_PROMPT: "/portal/v1/user/prompt/get", // 获取项目提示
    UPDATE_PROMPT: "/portal/v1/user/prompt/upsert", // 更新项目提示
    SUBSCRIBE_DAILY_KNOWLEDGE: "/portal/v1/daily-knowledge/subscribe", // 订阅每日新知
    GET_DAILY_KNOWLEDGE_LIST: "/portal/v1/daily-knowledge/today-list" // 获取每日新知列表
}
