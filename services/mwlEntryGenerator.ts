import _ = require("lodash/fp");
import {Utils} from "./Utils";
import {PersonGenerator} from "./PersonGenerator";
import config = require("../config/appConfig");
import {IDepartment} from "../interfaces";
import {INewStudy} from "../model/dtos";

export class MwlEntryGenerator {

    public jsonEntry: any;

    public accession: string | null = null;
    public allergies = "";
    public department = "";
    public dateOfBirth: Date | null = null;
    public institution = "";
    public medicalAlerts = "";
    public modality: string | null = null;
    public patientHistoryAdditional = "";
    public patientId: string | null = null;
    public patientIdOther = "";
    public patientName: string | null = null;
    public patientWeight = "0";
    public requestedProcedureId = "6789";
    public referringPhysiciansName = "";
    public sex: string | null = null;
    public scheduledProcedureStepAttendingName: string | null = null;
    public scheduledProcedureStepDate: string | null = null;
    public scheduledProcedureStepTime: string | null = null;
    public scheduledProcedureStepId = "12345";
    public scheduledStationAE = "ZEN_SNAP_MD";
    public scheduledStationName = "ZenSnapMD 4.1";
    public sopInstanceUid: string | null = null;
    public studyDescription = "";
    public studyUid: string | null = null;

    constructor(private patientGenerator: PersonGenerator | null = null) {
        if (!patientGenerator) {
            this.patientGenerator = new PersonGenerator();
        }
    }

    public generateJson(custom?: INewStudy): any {
        const my = this;

        const draw = <T>(items: T[]): T => {
            return items[Math.floor(Math.random() * items.length)];
        };

        const now = new Date();
        const activeDepartments = _.filter<IDepartment>(x => x.active)(config.departments);

        const oneDept: IDepartment = draw(activeDepartments);
        let patient = my.patientGenerator!.generate();
        let accession = my.accession || Utils.generateRandomId(8);
        let modality = my.modality || draw(oneDept.modalities);
        let studyUid = my.studyUid || Utils.generateUid();

        let startDate = my.scheduledProcedureStepDate || Utils.formatDate(now);
        let startTime = my.scheduledProcedureStepTime || Utils.formatTime(now);
        let description = my.studyDescription || draw(oneDept.reasons);


        if (custom) {
            patient.name = custom.patientName ? custom.patientName : patient.name;
            patient.mrn = custom.mrn ? custom.mrn : patient.mrn;
            patient.dob = custom.dob ? custom.dob : patient.dob;
            patient.gender = custom.gender ? custom.gender : patient.gender;
            modality = custom.modality ? custom.modality : modality;
            accession = custom.accession ? custom.accession : accession;
            studyUid = custom.studyUid ? custom.studyUid : studyUid;
            description =  custom.reason ? custom.reason : description;
            if (custom.studyDate) {
                startDate = Utils.formatDate(custom.studyDate);
                startTime = Utils.formatTime(custom.studyDate);
            }
        }

        const attending = my.patientGenerator!.generate("MD");
        const referring = my.patientGenerator!.generate("MD");

        const sopInstanceUid = my.sopInstanceUid || Utils.generateUid();

        const patientName = my.patientName || patient.name;

        const patientId = my.patientId || patient.mrn;
        const dob = my.dateOfBirth || patient.dob;
        const dobStr = Utils.formatDate(dob);
        const sex = my.sex || patient.gender;

        const referringName = my.referringPhysiciansName || referring.name;
        const attendingName = my.scheduledProcedureStepAttendingName || attending.name;

        const theDepartment = my.department || oneDept.department;

        my.jsonEntry = {
            "00080005": {
                "vr": "CS",
                "Value": [
                    "ISO_IR 192"
                ]
            },
            "00080018": {
                "vr": "UI",
                "Value": [
                    sopInstanceUid
                ]
            },
            "00080050": {
                "vr": "SH",
                "Value": [
                    accession
                ]
            },
            "00080060": {
                "vr": "CS",
                "Value": [
                    modality
                ]
            },
            "00080080": {
                "vr": "LO",
                "Value": [
                    my.institution
                ]
            },
            "00080090": {
                "vr": "PN",
                "Value": [
                    {
                        "Alphabetic": referringName
                    }
                ]
            },
            "00081030": {
                "vr": "LO",
                "Value": [description]
            },
            "00081040": {
                "vr": "LO",
                "Value": [
                    theDepartment
                ]
            },
            "00100010": {
                "vr": "PN",
                "Value": [
                    {
                        "Alphabetic": patientName
                    }
                ]
            },
            "00100020": {
                "vr": "LO",
                "Value": [
                    patientId
                ]
            },
            "00100030": {
                "vr": "DA",
                "Value": [
                    dobStr
                ]
            },
            "00100040": {
                "vr": "CS",
                "Value": [
                    sex
                ]
            },
            "00101000": {
                "vr": "LO",
                "Value": [
                    my.patientIdOther,
                ]
            },
            "00101030": {
                "vr": "DS",
                "Value": [
                    my.patientWeight
                ]
            },
            "00102000": {
                "vr": "LO",
                "Value": [
                    my.medicalAlerts
                ]
            },
            "00102110": {
                "vr": "LO",
                "Value": [
                    my.allergies
                ]
            },
            "001021B0": {
                "vr": "LT",
                "Value": my.patientHistoryAdditional
            },
            "0020000D": {
                "vr": "UI",
                "Value": [
                    studyUid
                ]
            },
            // "00321030": {
            //     "vr": "LO",
            //     "Value": null
            // },
            "00321032": {
                "vr": "PN",
                "Value": [
                    {
                        "Alphabetic": referringName
                    }
                ]
            },
            "00321060": {
                "vr": "LO",
                "Value": [
                    description
                ]
            },
            "00321064": {
                "vr": "SQ",
                "Value": [
                    {
                        "00080100": {
                            "vr": "SH",
                            "Value": [
                                "18804247"
                            ]
                        },
                        "00080102": {
                            "vr": "SH",
                            "Value": ""
                        },
                        "00080104": {
                            "vr": "LO",
                            "Value": [
                                description
                            ]
                        }
                    }
                ]
            },
            "00380010": {
                "vr": "LO",
                "Value": [
                    accession
                ]
            },
            "00400009": {
                "vr": "SH",
                "Value": [
                    my.scheduledProcedureStepId
                ]
            },
            "00400100": {
                "vr": "SQ",
                "Value": [
                    {
                        "00080060": {
                            "vr": "CS",
                            "Value": [
                                modality
                            ]
                        },
                        "00400001": {
                            "vr": "AE",
                            "Value": [
                                my.scheduledStationAE
                            ]
                        },
                        "00400002": {
                            "vr": "DA",
                            "Value": [
                                startDate
                            ]
                        },
                        "00400003": {
                            "vr": "TM",
                            "Value": [
                                startTime
                            ]
                        },
                        "00400006": {
                            "vr": "PN",
                            "Value": attendingName
                        },
                        "00400007": {
                            "vr": "LO",
                            "Value": [
                                description
                            ]
                        },
                        "00400008": {
                            "vr": "SQ",
                            "Value": [
                                {
                                    "00080100": {
                                        "vr": "SH",
                                        "Value": [
                                            "18804247"
                                        ]
                                    },
                                    "00080102": {
                                        "vr": "SH",
                                        "Value": null
                                    },
                                    "00080104": {
                                        "vr": "LO",
                                        "Value": [
                                            description
                                        ]
                                    }
                                }
                            ]
                        },
                        "00400009": {
                            "vr": "SH",
                            "Value": [
                                my.scheduledProcedureStepId
                            ]
                        },
                        "00400010": {
                            "vr": "SH",
                            "Value": [
                                my.scheduledStationName
                            ]
                        }
                    }
                ]
            },
            "00401001": {
                "vr": "SH",
                "Value": [
                    my.requestedProcedureId
                ]
            }
        };

        return my.jsonEntry;

    };
}