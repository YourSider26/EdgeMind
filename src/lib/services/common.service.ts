import apiConf from "$lib/config/api.conf"
import Http from '$lib/utils/http';

/**
 * 新增项目
 */
export const addUserProject = (params: any) => Http.post(apiConf.ADD_USER_PROJECT, params)
