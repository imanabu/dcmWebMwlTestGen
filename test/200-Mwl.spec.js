"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mwlEntryGenerator_1 = require("../services/mwlEntryGenerator");
const assert_1 = __importDefault(require("assert"));
const mocha_1 = require("mocha");
mocha_1.describe("MWL Generator Test", () => {
    mocha_1.describe("Make sure MWL Generator does Generate", () => {
        const mwl = new mwlEntryGenerator_1.MwlEntryGenerator();
        mocha_1.it("Can generate without any data", () => {
            const entry = mwl.generateJson();
            assert_1.default(entry);
            // console.debug(`${JSON.stringify(entry, null, 3)}`)
        });
    });
});
//# sourceMappingURL=200-Mwl.spec.js.map