export interface IDepartment {
    active: boolean;
    modalities: string[];
    department: string;
    reasons: string[];
}

export interface ResponseError extends Error {
    status?: number;
}
