export interface IDepartment {
    active: boolean;
    department: string;
    reasons: string[];
}

export interface ResponseError extends Error {
    status?: number;
}
