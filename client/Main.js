"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var _ = require("lodash/fp");
/**
 * THE MAIN
 */
// Content DIV to insert the content into
var content = document.getElementById("content");
var Main = /** @class */ (function () {
    function Main() {
        this.rawMwl = [];
        this.mode = "mwl";
        this.listMode = true;
        this.limit = 0;
        this.usedUrl = "";
        this.mwl = "";
        this.departments = "";
    }
    Main.prototype.view = function () {
        var my = this;
        var spacer = m("[style=margin-botton:10px;]", m.trust("&nbsp;"));
        var h = m("h2", {}, "ZenSnapMD MWL Test Suite");
        var dp = m("pre", my.departments);
        var help = my.mode === "mwl" ?
            m(".col.head-room", "Used QIDO API URL: " + my.usedUrl) :
            m(".col.head-room", "To change this, Edit Config.ts file, rebuild and run.");
        var limitLabel = m("label[for=limit]", "Limit: ");
        var limit = m("input[id=limit][type=text][style=margin-left:10px]", {
            onchange: m.withAttr("value", function (v) { my.limit = parseInt(v, 10); }),
            placeholder: "10",
            value: my.limit,
        });
        var limitCell = m(".col", [limitLabel, limit]);
        var listButton = m("button.btn-margin.col.btn-med.btn-info", {
            onclick: function () {
                my.listMode = true;
                my.getMwl.bind(my)();
            },
        }, "Gen & Show List");
        var rawButton = m("button.brn-margin.col.btn-med.btn-info", {
            onclick: function () {
                my.listMode = false;
                my.getMwl.bind(my)();
            },
        }, "Gen & Show JSON");
        var deptButton = m("button.btn-margin.col.btn-med.btn-info", {
            onclick: my.getDepartments.bind(my),
        }, "Show Departments");
        var ctrlRow = m(".row", [
            limitCell,
            rawButton,
            listButton,
            deptButton
        ]);
        var listHead = m(".row.list-header", m(".col-1", "Date"), 
        // m(".col", item["00400100"].Value[0]["00400003"].Value[0]),
        m(".col-2", "Patient Name"), m(".col-1", "MRN"), m(".col-1", "DOB"), m(".col-1", "Gender"), m(".col-1", "Modality"), m(".col-1", "Accession"), m(".col-1", "Dept."), m(".col-1", "Reason"));
        var getList = _.map(function (item) {
            var name = item["00100010"].Value[0].Alphabetic;
            var nameParts = name.split("^");
            var finalName = "";
            for (var i = 0; i < nameParts.length; i++) {
                finalName = finalName + nameParts[i];
                if (i === 0) {
                    finalName = finalName + ", ";
                }
                else {
                    finalName = finalName + " ";
                }
            }
            return m(".row", m(".col-1", item["00400100"].Value[0]["00400002"].Value[0]), 
            // m(".col", item["00400100"].Value[0]["00400003"].Value[0]),
            m(".col-2", finalName), m(".col-1", item["00100020"].Value[0]), m(".col-1", item["00100030"].Value[0]), m(".col-1", item["00100040"].Value[0]), m(".col-1", item["00400100"].Value[0]["00080060"].Value[0]), m(".col-1", item["00080050"].Value[0]), m(".col-1", item["00081040"].Value[0]), m(".col-2", item["00081030"].Value[0]));
        });
        var mw = my.listMode ? m("", listHead, getList(my.rawMwl)) : m("pre", my.mwl);
        return m("", [h,
            ctrlRow,
            m(".row", help),
            spacer,
            my.mode === "mwl" ? mw : dp]);
    };
    Main.prototype.getMwl = function () {
        var my = this;
        my.mode = "mwl";
        var url = my.limit ? "api/studies?limit=" + my.limit :
            "api/studies";
        my.usedUrl = url;
        var options = {};
        options.method = "GET";
        return m.request(url, options).then(function (data) {
            my.rawMwl = data;
            my.mwl = JSON.stringify(data, null, 3);
        }).catch(function (error) {
            my.mwl = error.toString();
        });
    };
    Main.prototype.getDepartments = function () {
        var my = this;
        my.mode = "dept";
        var url = "api/departments";
        var options = {};
        options.method = "GET";
        return m.request(url, options).then(function (data) {
            my.departments = JSON.stringify(data, null, 3);
        }).catch(function (error) {
            my.mwl = error.toString();
        });
    };
    return Main;
}());
exports.Main = Main;
// Content DIV to insert the content into
// const content = document.getElementById("content") as Element;
// Route to mount various component pages
exports.main = new Main();
m.mount(content, exports.main);
//# sourceMappingURL=Main.js.map