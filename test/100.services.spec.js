"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const mocha_1 = require("mocha");
const PersonGenerator_1 = require("../services/PersonGenerator");
const Utils_1 = require("../services/Utils");
mocha_1.describe("Test if Mocha is installed right.", () => {
    mocha_1.describe("Making sure mocha is installed correctly.", () => {
        mocha_1.it("Can pass this simple assert test.", () => {
            assert_1.default.ok("Yes");
        });
    });
});
mocha_1.describe("Utils and Generator Functions", () => {
    mocha_1.describe("Making sure patients are generated right", () => {
        const gen = new PersonGenerator_1.PersonGenerator();
        mocha_1.it("Can generate a UID", () => {
            const uid1 = Utils_1.Utils.generateUid();
            assert_1.default(uid1, "UID generation");
            assert_1.default(uid1.length > 0);
            const uid2 = Utils_1.Utils.generateUid();
            assert_1.default.notStrictEqual(uid1, uid2);
        });
        mocha_1.it("Can generate an ID", () => {
            const id = Utils_1.Utils.generateRandomId(8);
            assert_1.default(id, "UID generation");
            assert_1.default.strictEqual(id.length, 8);
        });
        mocha_1.it("Can Format Date and Time", () => {
            const d = new Date();
            const df = Utils_1.Utils.formatDate(d);
            const tf = Utils_1.Utils.formatTime(d);
            assert_1.default(df);
            assert_1.default.strictEqual(df.length, 8);
            assert_1.default(tf);
            assert_1.default.strictEqual(tf.length, 6);
        });
        mocha_1.it("Can generate a patient", () => {
            const p1 = gen.generate();
            assert_1.default(p1);
            const p2 = gen.generate();
            assert_1.default(p2);
            assert_1.default.notStrictEqual(p1.name, p2.name);
            assert_1.default.notStrictEqual(p1.mrn, p2.mrn);
        });
    });
});
//# sourceMappingURL=100.services.spec.js.map