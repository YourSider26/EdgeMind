/**
 * HTTP 请求工具类
 * 基于 fetch API 封装，提供 GET 和 POST 方法
 */

// 基础配置
const BASE_URL = "https://chaojingmingyue.gaodun.com"

// 请求配置接口
interface RequestConfig {
    headers?: Record<string, string>
    timeout?: number
}

// 响应数据接口
interface ApiResponse<T = any> {
    code: number
    message: string
    data: T
}

class HttpClient {
    private baseURL: string
    private defaultHeaders: Record<string, string>
    private timeout: number

    constructor(baseURL: string = BASE_URL) {
        this.baseURL = baseURL
        this.defaultHeaders = {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
        this.timeout = 10000 // 默认10秒超时
    }

    /**
     * 创建请求配置
     */
    private createRequestConfig(
        method: string,
        data?: any,
        config?: RequestConfig
    ): RequestInit {
        const headers = {
            ...this.defaultHeaders,
            ...config?.headers
        }

        const requestConfig: RequestInit = {
            method,
            headers,
            mode: "cors",
            credentials: "include"
        }

        // 添加请求体（仅对 POST、PUT、PATCH 等方法）
        if (data && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
            if (headers["Content-Type"] === "application/json") {
                requestConfig.body = JSON.stringify(data)
            } else {
                requestConfig.body = data
            }
        }

        return requestConfig
    }

    /**
     * 构建完整URL
     */
    private buildURL(url: string, params?: Record<string, any>): string {
        const fullURL = url.startsWith("http") ? url : `${this.baseURL}${url}`

        if (!params) return fullURL

        const searchParams = new URLSearchParams()
        Object.keys(params).forEach((key) => {
            if (params[key] !== undefined && params[key] !== null) {
                searchParams.append(key, String(params[key]))
            }
        })

        const queryString = searchParams.toString()
        return queryString ? `${fullURL}?${queryString}` : fullURL
    }

    /**
     * 处理响应
     */
    private async handleResponse<T>(
        response: Response
    ): Promise<ApiResponse<T>> {
        if (!response.ok) {
            throw new Error(
                `HTTP Error: ${response.status} ${response.statusText}`
            )
        }

        const contentType = response.headers.get("content-type")

        if (contentType && contentType.includes("application/json")) {
            return await response.json()
        } else {
            // 如果不是JSON响应，包装成标准格式
            const text = await response.text()
            return {
                code: 200,
                message: "success",
                data: text as T
            }
        }
    }

    /**
     * 请求超时处理
     */
    private createTimeoutPromise(timeout: number): Promise<never> {
        return new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error(`Request timeout after ${timeout}ms`))
            }, timeout)
        })
    }

    /**
     * 执行请求
     */
    private async request<T>(
        url: string,
        method: string,
        data?: any,
        config?: RequestConfig
    ): Promise<ApiResponse<T>> {
        try {
            const requestConfig = this.createRequestConfig(method, data, config)
            const fullURL =
                method === "GET" ? this.buildURL(url, data) : this.buildURL(url)

            const timeout = config?.timeout || this.timeout

            // 创建请求Promise和超时Promise
            const fetchPromise = fetch(fullURL, requestConfig)
            const timeoutPromise = this.createTimeoutPromise(timeout)

            // 竞争执行，哪个先完成就用哪个结果
            const response = await Promise.race([fetchPromise, timeoutPromise])

            return await this.handleResponse<T>(response)
        } catch (error) {
            console.error("HTTP Request Error:", error)
            throw error
        }
    }

    /**
     * GET 请求
     * @param url 请求地址
     * @param params 查询参数
     * @param config 请求配置
     */
    async get<T = any>(
        url: string,
        params?: Record<string, any>,
        config?: RequestConfig
    ): Promise<ApiResponse<T>> {
        return this.request<T>(url, "GET", params, config)
    }

    /**
     * POST 请求
     * @param url 请求地址
     * @param data 请求数据
     * @param config 请求配置
     */
    async post<T = any>(
        url: string,
        data?: any,
        config?: RequestConfig
    ): Promise<ApiResponse<T>> {
        return this.request<T>(url, "POST", data, config)
    }

    /**
     * 设置默认请求头
     */
    setDefaultHeader(key: string, value: string): void {
        this.defaultHeaders[key] = value
    }

    /**
     * 移除默认请求头
     */
    removeDefaultHeader(key: string): void {
        delete this.defaultHeaders[key]
    }

    /**
     * 设置超时时间
     */
    setTimeout(timeout: number): void {
        this.timeout = timeout
    }

    /**
     * 获取当前基础URL
     */
    getBaseURL(): string {
        return this.baseURL
    }
}

// 创建默认实例
const Http = new HttpClient()

// 导出默认实例和类
export default Http
export { HttpClient }

// 导出便捷方法
export const get = Http.get.bind(Http)
export const post = Http.post.bind(Http)
