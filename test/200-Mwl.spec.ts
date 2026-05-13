{
const assert: typeof import("assert") = require("assert");
const {describe, it}: typeof import("mocha") = require("mocha");
const {MwlEntryGenerator}: typeof import("../services/mwlEntryGenerator") = require("../services/mwlEntryGenerator");

describe("MWL Generator Test", () => {
    describe("Make sure MWL Generator does Generate", () => {
        const mwl = new MwlEntryGenerator();
        it("Can generate without any data", () => {
            const entry = mwl.generateJson();
            // console.debug(JSON.stringify(entry, null, 3));
            assert(entry);
            // console.debug(`${JSON.stringify(entry, null, 3)}`)
        });
    });
});
}
