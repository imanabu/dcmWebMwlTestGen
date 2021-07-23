"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddComponent = void 0;
var m = require("mithril");
var AddComponent = /** @class */ (function () {
    function AddComponent() {
        var _this = this;
        this.ent = {};
        this._status = "";
        this.oninit = function () {
            _this.ent.studyDate = new Date();
        };
        this.view = function () {
            var my = _this;
            var dateParse = function (v) {
                try {
                    var nd = new Date(v);
                    if (nd.toLocaleDateString().indexOf("Invalid") === 0) {
                        my.status = "Please correct the date " + v;
                        return undefined;
                    }
                    else {
                        return nd;
                    }
                }
                catch (why) {
                    my.status = "Bad date string " + v + " " + why;
                }
            };
            var oninput = function (e) {
                var t = e.currentTarget;
                var v = t.value;
                switch (t.id) {
                    case "acc":
                        my.ent.accession = v ? v : "";
                        break;
                    case "dob":
                        var dp = dateParse(v);
                        my.ent.dob = dp;
                        break;
                    case "gender":
                        my.ent.gender = (v === "F" || v === "M" || v === "O") ? v : "O";
                        break;
                    case "mrn":
                        my.ent.mrn = v ? v : "";
                        break;
                    case "modality":
                        my.ent.modality = v ? v : "";
                        break;
                    case "name":
                        if (v.indexOf("^") >= 0) {
                            my.ent.patientName = v ? v.toUpperCase() : "";
                        }
                        else {
                            my.status = "Name must be in the DICOM/HL7 Format: SMITH^JOHN^A";
                        }
                        break;
                    case "reason":
                        my.ent.reason = v ? v : "";
                        break;
                    case "sd":
                        var sd = dateParse(v);
                        my.ent.studyDate = sd;
                        break;
                    case "studyuid":
                        my.ent.studyUid = v ? v : "";
                        break;
                }
            };
            var onCreate = function () {
                var my = _this;
                var opt = {};
                opt.method = "POST";
                var data = {};
                opt.data = data;
                var ent = my.ent;
                data.accession = ent.accession;
                data.gender = ent.gender ? ent.gender : "O";
                data.mrn = ent.mrn ? ent.mrn : "";
                data.modality = ent.modality ? ent.modality : "VL";
                data.patientName = ent.patientName ? ent.patientName : "";
                data.reason = ent.reason ? ent.reason : "";
                data.studyUid = ent.studyUid ? ent.studyUid : "";
                if (!ent.dob) {
                    my.status = "DOB cannot be left empty";
                    return;
                }
                data.dob = ent.dob ? ent.dob.toISOString() : "";
                data.studyDate = ent.studyDate ? ent.studyDate.toISOString() : "";
                m.request("api/study/add", opt)
                    .then(function (res) {
                    my.status = res.message;
                    return res;
                })
                    .catch(function (err) {
                    my.status = err.message;
                    return err;
                });
            };
            return m("", m("h4", my.status), m("", m("label.lbl-input[for=mrn])", "MRN: "), m("input[id=mrn][type=text]", {
                onchange: oninput,
                placeholder: "Optional",
                value: my.ent.mrn
            })), m("", m("label.lbl-input[for=name])", "Name: "), m("input[id=name][type=text]", {
                onchange: oninput,
                placeholder: "Temple^Zen^M^Jr.",
                value: my.ent.patientName
            })), m("", m("label.lbl-input[for=gender])", "Gender: "), m("input.lbl-input[id=gender][type=text]", {
                onchange: oninput,
                placeholder: "F, M or O",
                value: my.ent.gender
            })), m("", m("label.lbl-input[for=dob])", "DOB: "), m("input[id=dob][type=text]", {
                onchange: oninput,
                placeholder: "Like 2/29/2000",
                value: my.ent.dob ? my.ent.dob.toLocaleDateString() : ""
            })), m("", m("label.lbl-input[for=sd])", "Study Date: "), m("input[id=sd][type=text]", {
                onchange: oninput,
                value: my.ent.studyDate ? my.ent.studyDate.toLocaleDateString() : ""
            })), m("", m("label.lbl-input[for=acc])", "Accession: "), m("input[id=acc][type=text]", {
                onchange: oninput,
                placeholder: "Optional",
                value: my.ent.accession
            })), m("", m("label.lbl-input[for=modality])", "Modality: "), m("input[id=modality][type=text]", {
                onchange: oninput,
                placeholder: "CT, MR, XR, VL...",
                value: my.ent.modality
            })), m("", m("label.lbl-input[for=reason])", "Reason: "), m("input[id=reason][type=text]", {
                onchange: oninput,
                placeholder: "Optional",
                style: "width:60%",
                value: my.ent.reason
            })), m("", m("label.lbl-input[for=studyuid])", "StudyUID: "), m("input[id=studyuid][type=text]", {
                onchange: oninput,
                placeholder: "Critical! Leave blank unless you know what to do.",
                style: "width:60%",
                value: my.ent.studyUid
            })), m("", m("button.btn-md.btn-success", {
                onclick: onCreate
            }, "Create")));
        };
    }
    Object.defineProperty(AddComponent.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (v) {
            this._status = v;
            m.redraw();
        },
        enumerable: false,
        configurable: true
    });
    return AddComponent;
}());
exports.AddComponent = AddComponent;
//# sourceMappingURL=AddComponent.js.map