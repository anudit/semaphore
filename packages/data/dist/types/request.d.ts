import { AxiosRequestConfig } from "axios";
/**
 * Returns the response data of an HTTP request.
 * @param url HTTP URL.
 * @param config Axios request configuration.
 * @returns Request data.
 */
export default function request(url: string, config?: AxiosRequestConfig): Promise<any>;
