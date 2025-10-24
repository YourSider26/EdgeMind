import axios from "axios"
import qs from "qs"

const instance = axios.create()

instance.interceptors.request.use(
    (config: any) => {
        return Promise.resolve(config)
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    async (response: any) => {
        const { status } = response.data

        return Promise.resolve(response.data)
    },
    (error: any) => {
        if (error && error.response && error.response.status === 401) {
            // location.href = '/login';
            // return false
        }

        return Promise.resolve({ status: -1 })
    }
)

const defaultOptions = {
    // baseURL: "http://10.5.221.50:8080",
    baseURL: "https://chaojingmingyue.gaodun.com",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authentication: ""
    },
    timeout: 10000,
    widthCredentials: true,
    transformRequest: (data: any) => {
        return data
    }
}

class Http {
    options = defaultOptions
    async request(options: any = {}): Promise<any> {
        const headers = {
            ...this.options.headers,
            ...options.headers
        }
        options = {
            ...this.options,
            ...options,
            headers
        }

        return instance.request(options)
    }

    get<T>(url: string, params: T | {}, customOptions: any = {}) {
        // 兼容restful api
        if (Array.isArray(params)) {
            for (const val of params) {
                url += `/${val}`
            }
            params = {}
        }

        return this.request({
            method: "get",
            url,
            params: params,
            ...customOptions
        })
    }

    post<T>(url: string, data: T | string, customOptions: any = {}) {
        if (
            customOptions.headers &&
            customOptions.headers["Content-Type"] ===
                "application/x-www-form-urlencoded"
        ) {
            data = qs.stringify(data)
        } else if (data instanceof FormData) {
            // FormData不需要JSON.stringify，浏览器会自动处理
            // 不对data进行任何处理
        } else {
            if (data instanceof Object) {
                data = JSON.stringify(data)
            }
        }

        return this.request({
            method: "post",
            url,
            data,
            ...customOptions
        })
    }
}

const http = new Http()

export default http
