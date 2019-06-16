export interface INewStudy {
    patientName: string;
    mrn: string;
    dob?: Date;
    gender: "F" | "M" | "O";
    reason?: string;
    accession: string;
    studyDate?: Date;
}