import {MwlEntryGenerator} from "../services/mwlEntryGenerator";
import assert from "assert";

import {describe, it} from "mocha";

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

