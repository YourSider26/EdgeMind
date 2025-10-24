export default {
    GET_USER_PROJECT_LIST: "/portal/v1/user/project/list", // 获取用户项目列表
    ADD_USER_PROJECT: "/portal/v1/user/project/add", // 新增项目
    DELETE_USER_PROJECT: "/portal/v1/user/project/delete", // 删除项目
    ADD_PROJECT_DOCUMENT: "/portal/v1/ai-chat/chat/embedding", // 新增项目文档
    GET_PROJECT_DOCUMENT_LIST: "/portal/v1/ai-chat/chat/query-embedding", // 获取项目文档列表
    GET_PROJECT_COLLECT_LIST: "/portal/v1/user/favorite/list", // 获取项目收藏列表
    GET_PROMPT: "/portal/v1/user/prompt/get", // 获取项目提示
    UPDATE_PROMPT: "/portal/v1/user/prompt/upsert" // 更新项目提示
}
