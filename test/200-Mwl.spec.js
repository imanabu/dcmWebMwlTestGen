"use strict";
{
    const assert = require("assert");
    const { describe, it } = require("mocha");
    const { MwlEntryGenerator } = require("../services/mwlEntryGenerator");
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
//# sourceMappingURL=200-Mwl.spec.js.map