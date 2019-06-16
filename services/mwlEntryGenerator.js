"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash/fp");
const Utils_1 = require("./Utils");
const PersonGenerator_1 = require("./PersonGenerator");
const config = require("../config/appConfig");
class MwlEntryGenerator {
    constructor(patientGenerator = null) {
        this.patientGenerator = patientGenerator;
        this.accession = null;
        this.allergies = "";
        this.department = "";
        this.dateOfBirth = null;
        this.institution = "";
        this.medicalAlerts = "";
        this.modality = null;
        this.patientHistoryAdditional = "";
        this.patientId = null;
        this.patientIdOther = "";
        this.patientName = null;
        this.patientWeight = "0";
        this.requestedProcedureId = "6789";
        this.referringPhysiciansName = "";
        this.sex = null;
        this.scheduledProcedureStepAttendingName = null;
        this.scheduledProcedureStepDate = null;
        this.scheduledProcedureStepTime = null;
        this.scheduledProcedureStepId = "12345";
        this.scheduledStationAE = "ZEN_SNAP_MD";
        this.scheduledStationName = "ZenSnapMD 4.1";
        this.sopInstanceUid = null;
        this.studyDescription = "";
        this.studyUid = null;
        if (!patientGenerator) {
            this.patientGenerator = new PersonGenerator_1.PersonGenerator();
        }
    }
    generateJson(custom) {
        const my = this;
        const draw = (items) => {
            return items[Math.floor(Math.random() * items.length)];
        };
        const now = new Date();
        const activeDepartments = _.filter(x => x.active)(config.departments);
        const oneDept = draw(activeDepartments);
        let patient = my.patientGenerator.generate();
        let accession = my.accession || Utils_1.Utils.generateRandomId(8);
        let modality = my.modality || draw(oneDept.modalities);
        let studyUid = my.studyUid || Utils_1.Utils.generateUid();
        let startDate = my.scheduledProcedureStepDate || Utils_1.Utils.formatDate(now);
        let startTime = my.scheduledProcedureStepTime || Utils_1.Utils.formatTime(now);
        let description = my.studyDescription || draw(oneDept.reasons);
        if (custom) {
            patient.name = custom.patientName ? custom.patientName : patient.name;
            patient.mrn = custom.mrn ? custom.mrn : patient.mrn;
            patient.dob = custom.dob ? custom.dob : patient.dob;
            patient.gender = custom.gender ? custom.gender : patient.gender;
            modality = custom.modality ? custom.modality : modality;
            accession = custom.accession ? custom.accession : accession;
            studyUid = custom.studyUid ? custom.studyUid : studyUid;
            description = custom.reason ? custom.reason : description;
            if (custom.studyDate) {
                startDate = Utils_1.Utils.formatDate(custom.studyDate);
                startTime = Utils_1.Utils.formatTime(custom.studyDate);
            }
        }
        const attending = my.patientGenerator.generate("MD");
        const referring = my.patientGenerator.generate("MD");
        const sopInstanceUid = my.sopInstanceUid || Utils_1.Utils.generateUid();
        const patientName = my.patientName || patient.name;
        const patientId = my.patientId || patient.mrn;
        const dob = my.dateOfBirth || patient.dob;
        const dobStr = Utils_1.Utils.formatDate(dob);
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
    }
    ;
}
exports.MwlEntryGenerator = MwlEntryGenerator;
//# sourceMappingURL=mwlEntryGenerator.js.map