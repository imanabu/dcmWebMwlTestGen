import config = require("../config/appConfig");
import express = require("express");

import {Request, Response} from "express";

import {INewStudy, IApiResponse, INewStudyDto} from "../model/dtos";
import {MwlEntryGenerator} from "../services/mwlEntryGenerator";

const router = express.Router();

let list: any[]= [];
let lastGeneratedAt = Date.now();
let previousLimit = 0;
let manualList: INewStudy[] = [];

/* GET home page. */
router.get("/studies", (req: Request, res: Response) => {

    const currentTime = Date.now();
    const elapsedHours = (currentTime - lastGeneratedAt)/(1000*60*60);

    let limit: number = req.query.limit ? parseInt(req.query.limit as string, 10) :
        config.generator.defaultMax;

    let force = req.query.force ? req.query.force as string : "";

    const defaultMode = !req.query.limit || !force.startsWith("t");

    limit = (limit > config.generator.absoluteMax)  ? config.generator.absoluteMax : limit;

    const hourlyPatients = req.query.hourly || config.generator.hourlyPatients;
    if (config.persistConfig) {
        config.generator.hourlyPatients = hourlyPatients;
    }

    const howMany = Math.floor(elapsedHours * hourlyPatients);

    const gen = new MwlEntryGenerator();

    if (howMany && list.length && defaultMode) {
        // Remove first many and push new items
        for(let i = 0; i < howMany; i++) {
            list.shift();
            list.push(gen.generateJson());
        }
        lastGeneratedAt = currentTime;
    } else if (limit && !defaultMode){
        if (config.persistConfig) {
            config.generator.defaultMax = limit;
        }
        list = [];
        for(let i = 0; i < limit; i++) {
            list.push(gen.generateJson());
        }
    } else if (!list.length) {
        for(let i = 0; i <  config.generator.defaultMax; i++) {
            list.push(gen.generateJson());
        }
    }

    // Add on
    if (manualList.length > 0) {
        manualList.forEach((item) => {
            list.push(gen.generateJson(item));
        });
        manualList = [];
    }

    if (list.length > limit ) {
        // If the limit changes to less, reduce the size
        for (let j = 0; j < list.length - limit; j++) {
            list.shift();
        }
    }

    previousLimit = limit;

    // let result = _.sortBy((x: any) => {
    //     return [x["00100010"].Value[0].Alphabetic];
    // })(list);

    res.status(200).json(list);
});

router.get("/departments", (req: Request, res: Response) => {
    res.status(200).json(config.departments);
});

router.post("/study/add", (req: Request, res: Response) => {
    try {
        const study = req.body as INewStudyDto;
        const reply = {} as IApiResponse<any>;
        reply.code = 200;
        reply.message = "Patient/study registered. Ready for a next generation request.";
        const addStudy =  {} as INewStudy;
        addStudy.accession = study.accession;
        addStudy.studyDate = new Date(study.studyDate);
        addStudy.dob = new Date(study.dob);
        addStudy.gender = study.gender;
        addStudy.mrn = study.mrn;
        addStudy.modality = study.modality;
        addStudy.reason = study.reason;
        addStudy.patientName = study.patientName;
        addStudy.studyUid = study.studyUid;
        manualList.push(addStudy);
        return res.status(200).json(reply);
    } catch(err) {
        return res.status(500).json(err);
    }
});


module.exports = router;
