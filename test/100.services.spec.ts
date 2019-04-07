import assert from "assert";

import {describe, it} from "mocha";
import {PersonGenerator} from "../services/PersonGenerator";
import {Utils} from "../services/Utils";

describe("Test if Mocha is installed right.", () => {
    describe("Making sure mocha is installed correctly.", () => {
        it("Can pass this simple assert test.", () => {
            assert.ok("Yes");
        });
    });
});

describe("Utils and Generator Functions", () => {
    describe("Making sure patients are generated right", () => {
        const gen = new PersonGenerator();

        it("Can generate a UID", () => {
            const uid1 = Utils.generateUid();
            assert(uid1, "UID generation");
            assert(uid1.length > 0);
            const uid2 = Utils.generateUid();
            assert.notStrictEqual(uid1, uid2);
        });

        it("Can generate an ID", () => {
            const id = Utils.genrateRandomId(8);
            assert(id, "UID generation");
            assert.strictEqual(id.length, 8);
        });

        it("Can Format Date and Time", () => {
            const d = new Date();
            const df = Utils.formatDate(d);
            const tf = Utils.formatTime(d);
            assert(df);
            assert.strictEqual(df.length, 8);
            assert(tf);
            assert.strictEqual(tf.length, 6);
        });

        it("Can generate a patient", () => {
            const p1 = gen.generate();
            assert(p1);
            const p2 = gen.generate();
            assert(p2);
            assert.notStrictEqual(p1.name, p2.name);
            assert.notStrictEqual(p1.mrn, p2.mrn);
        });
    });
});
