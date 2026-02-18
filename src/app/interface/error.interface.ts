export interface TerrorSource {
    path: string;
    meassage: string;
}

export interface TErrorResponse {
    statuscode?: number;
    success: boolean;
    errorSource?: TerrorSource[];
    message: string;
    stack?: string;
    error?: any;
}