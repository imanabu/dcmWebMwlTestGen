export interface INewStudy {
    accession: string;
    dob?: Date;
    gender: "F" | "M" | "O";
    modality: string;
    mrn: string;
    patientName: string;
    reason?: string;
    studyDate?: Date;
    studyUid?: string;
}

export interface INewStudyDto {
    accession: string;
    dob: string;
    gender: "F" | "M" | "O";
    mrn: string;
    modality: string;
    patientName: string;
    reason: string;
    studyDate: string;
    studyUid: string;
}

export interface IApiResponse<T> {
    code: number;
    data: T;
    message: string;
}
