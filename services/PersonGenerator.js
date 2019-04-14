"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Names_1 = require("./Names");
const Utils_1 = require("./Utils");
class PersonGenerator {
    constructor() {
        this.lastLength = Names_1.lastNames.length;
        this.firstLength = Names_1.firstNames.length;
    }
    generate(suffix = "") {
        const lastIndex = Math.floor(Math.random() * this.lastLength);
        const firstIndex = Math.floor(Math.random() * this.firstLength);
        const lastName = Names_1.lastNames[lastIndex].toUpperCase();
        const first = Names_1.firstNames[firstIndex];
        const firstName = first[0].toUpperCase();
        const patient = {};
        patient.name = `${lastName}^${firstName}^^^${suffix}`;
        patient.gender = first[1];
        patient.mrn = Utils_1.Utils.generateRandomId(8);
        const today = new Date();
        const minYear = today.getFullYear() - 95;
        const year = minYear + Math.random() * 95;
        const month = Math.floor(Math.random() * 12);
        const date = Math.floor(Math.random() * 28);
        patient.dob = new Date(year, month, date);
        return patient;
    }
}
exports.PersonGenerator = PersonGenerator;
//# sourceMappingURL=PersonGenerator.js.map