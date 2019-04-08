import { lastNames, firstNames } from "./Names";
import {Utils} from "./Utils";

interface IPerson {
    name: string;
    mrn: string;
    gender: string;
    dob: Date;
}

export class PersonGenerator {

    private readonly lastLength: number;
    private readonly firstLength: number;

    constructor() {
        this.lastLength = lastNames.length;
        this.firstLength = firstNames.length;
    }

    public generate(suffix: string = ""): IPerson {

        const lastIndex = Math.floor(Math.random() * this.lastLength);
        const firstIndex = Math.floor(Math.random() * this.firstLength);
        const lastName = lastNames[lastIndex].toUpperCase();
        const first = firstNames[firstIndex];
        const firstName = first[0].toUpperCase();

        const patient = {} as IPerson;
        patient.name = `${lastName}^${firstName}^^^${suffix}`;
        patient.gender = first[1];
        patient.mrn = Utils.generateRandomId(8);

        const today = new Date();
        const minYear = today.getFullYear() - 95;
        const year = minYear + Math.random() * 95;
        const month = Math.floor(Math.random() * 12);
        const date = Math.floor(Math.random() * 28);

        patient.dob = new Date(year, month, date);
        return patient;
    }


}