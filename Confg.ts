import {IDepartment} from "./interfaces";

export const departments: IDepartment[] = [

    {   active: true,
        department: "1234" ,
        modalities: ["US", "DX", "VL"],
        reasons: ["Minor Burn", "Fall", "Cut", "Fracture"]
    },
    {
        active: true,
        department: "5672" ,
        modalities: ["CT", "MR", "US", "DX", "VL"],
        reasons: ["Flu", "Cold Symptoms", "Acute Abdominal Pain", "Food obstruction"]
    },
    {
        active: true,
        department: "2456" ,
        modalities: ["CT", "MR", "VL"],
        reasons: ["Eye Infection", "Acute Ocular Trauma", "Retinal Detachment", "Foreign Object Removal"]
    },
];

