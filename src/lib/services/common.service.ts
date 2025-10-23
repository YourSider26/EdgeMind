import apiConf from "$lib/config/api.conf"
import Http from '$lib/utils/http';

/** 获取用户项目列表 */
export const getUserProjectList = (params: any) => Http.get(apiConf.GET_USER_PROJECT_LIST, params)
/** 新增项目 */
export const addUserProject = (params: any) => Http.post(apiConf.ADD_USER_PROJECT, params)
