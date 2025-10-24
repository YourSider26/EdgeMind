import apiConf from "$lib/config/api.conf"
import Http from '$lib/utils/http';

/** 获取用户项目列表 */
export const getUserProjectList = (params: any) => Http.get(apiConf.GET_USER_PROJECT_LIST, params)
/** 新增项目 */
export const addUserProject = (params: any) => Http.post(apiConf.ADD_USER_PROJECT, params)
/** 删除项目 */
export const deleteUserProject = (params: any) => Http.post(apiConf.DELETE_USER_PROJECT, params)
/** 新增项目文档 */
export const addProjectDocument = (params: any) => Http.post(apiConf.ADD_PROJECT_DOCUMENT, params)
/** 获取项目文档列表 */
export const getProjectDocumentList = (params: any) => Http.post(apiConf.GET_PROJECT_DOCUMENT_LIST, params)
/** 获取项目收藏列表 */
export const getProjectCollectList = (params: any) => Http.get(apiConf.GET_PROJECT_COLLECT_LIST, params)
/** 获取项目提示 */
export const getPrompt = (params: any) => Http.get(apiConf.GET_PROMPT, params)
/** 更新项目提示 */
export const updatePrompt = (params: any) => Http.post(apiConf.UPDATE_PROMPT, params)
