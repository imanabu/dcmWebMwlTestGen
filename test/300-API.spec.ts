// import * as _ from "lodash/fp";
import {after, before, describe, it} from "mocha";
// import express = require("express");
import assert = require("assert");
import request = require("superagent");
import s = require("../app");
import config = require("../config/appConfig");

const myApp: any = s;
let server: any = {};

const root = "http://localhost:8000";
const api = `${root}/api`;

describe("Test ZenForms Express Server APIs.", () => {
    before(() => {
        config.generator.defaultMax = 10;
        config.generator.absoluteMax = 200;
        config.generator.persistConfig = false;
        server = myApp.listen(8000);
    });

    describe(`Server at ${root} is up.`, () => {
        it("Should return the status 200.", (done) => {
            request.get(`${root}`)
                .end(() => {
                    done();
                });
        });

    });

    describe("Test the server APIs.", () => {
        it("Should return worklist", (done) => {
            request.get(`${api}/studies`)
                .end((err, res) => {
                    if (err) {
                        assert(!err, `Error ${err}`);
                        done();
                    }
                    assert(res.body, "No body");
                    const items = res.body as any[];
                    assert(items, "Zero items");
                    done();
                });
        });

        it("Should return 100 items when limit=100", (done) => {
            request.get(`${api}/studies?limit=100`)
                .end((err, res) => {
                    if (err) {
                        assert(!err, `Error ${err}`);
                        done();
                    }
                    assert(res.body, "No body");
                    const items = res.body as any[];
                    assert(items, "Zero items");
                    assert(items.length === 100, "Not 100 items");
                    done();
                });
        });

        it("Should not return 100 items again when persist is off", (done) => {
            request.get(`${api}/studies`)
                .end((err, res) => {
                    if (err) {
                        assert(!err, `Error ${err}`);
                        done();
                    }
                    assert(res.body, "No body");
                    const items = res.body as any[];
                    assert(items, "Zero items");
                    assert(items.length !== 100, "Not 100 items");
                    done();
                });
        });

        it("Should return only 250 items when limit=1000", (done) => {
            request.get(`${api}/studies?limit=1000`)
                .end((err, res) => {
                    if (err) {
                        assert(!err, `Error ${err}`);
                        done();
                    }
                    assert(res.body, "No body");
                    const items = res.body as any[];
                    assert(items, "Zero items");
                    assert(items.length === config.generator.absoluteMax,
                        `${items.length} Max limit did not work`);
                    done();
                });
        });

        it("Should limit the rate (This will take a while).", (done) => {
            // The prior test requests have consumed the part of the quota.
            const max = config.speedLimit.delayAfter;
            let previous = Date.now();
            for (let i = 0; i <= max; i++) {
                request.get(`${api}/studies`)
                    .end((err, res) => {
                        if (err) {
                            assert(!err, `Error ${err}`);
                            done();
                        }
                        assert(res.body, "No body");
                        const items = res.body as any[];
                        assert(items, "Zero items");
                        const now = Date.now();
                        const diff = now - previous;
                        previous = now;
                        if (i > config.speedLimit.delayAfter) {
                            console.debug(`Elapsed ${diff} msec`);
                            assert(diff >= config.speedLimit.delayMs, "Delay did not kick in");
                        }

                        if (i == max) {
                            done();
                        }
                    });
            }

        }).timeout(20000);

    });

    after((done) => {
        done();
        process.exit();

    });
});
