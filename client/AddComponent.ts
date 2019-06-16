import {ClassComponent} from "mithril";
import {INewStudy} from "../model/dtos";
import m = require("mithril");

export class AddComponent implements ClassComponent {

    constructor() {}

    private ent: INewStudy = {} as INewStudy;
    private _status: string = "";
    private set status(v: string) {
        this._status = v;
        m.redraw();
    }

    private get status() {
        return this._status;
    }

    public view = () => {
        const my = this;

        const dateParse = (v: string) => {
            try {
                let nd = new Date(v);
                if (nd.toLocaleDateString().indexOf("Invalid") === 0) {
                    my.status = `Please correct the date ${v}`;
                    return undefined;
                } else {
                    return nd;
                }
            } catch (why) {
                my.status = `Bad date string ${v} ${why}`;
            }
        };

        const oninput = (e: Event) => {
            const t = e.currentTarget as HTMLInputElement;
            const v = t.value;
            switch (t.id) {
                case "mrn":
                    my.ent.mrn = v;
                    break;
                case "name":
                    if (v.indexOf("^") >= 0) {
                        my.ent.patientName = v;
                    } else {
                        my.status = "Name must be in the DICOM/HL7 Format: SMITH^JOHN^A";
                    }
                    break;
                case "gender":
                    my.ent.gender = (v === "F" || v === "M" || v === "O") ? v : "O";
                    break;
                case "dob":
                    const dp = dateParse(v);
                    my.ent.dob = dp;
                    break;
                case "sd":
                    const sd = dateParse(v);
                    my.ent.studyDate = sd;
                    break;
                case "acc":
                    my.ent.accession = v;
                    break;
            }
        };

        const onCreate = () => {};

        return m("",
            m("h4", my.status),
            m("",
                m("label.lbl-input[for=mrn])", "MRN: "),
                m("input[id=mrn][type=text]", {
                    onchange: oninput,
                    value: my.ent.mrn })),
            m("",
                m("label.lbl-input[for=name])","Name: "),
                m("input[id=name][type=text]", {
                    onchange: oninput, value: my.ent.patientName})),
            m("",
                m("label.lbl-input[for=gender])", "Gender: "
                ),
                m("input.lbl-input[id=gender][type=text]", {
                    onchange: oninput, value: my.ent.gender})),
            m("",
                m("label.lbl-input[for=dob])", "DOB: "),
            m("input[id=dob][type=text]", {
                onchange: oninput,
                value: my.ent.dob ? my.ent.dob.toLocaleDateString(): ""})),
            m("",
                m("label.lbl-input[for=sd])", "Study Date: "),
                m("input[id=sd][type=text]", {
                    onchange: oninput,
                    value: my.ent.studyDate ? my.ent.studyDate.toLocaleDateString() : ""
                })),
            m("",
                m("label.lbl-input[for=acc])", "Accession: "),
                m("input[id=acc][type=text]", {
                    onchange: oninput,
                    value: my.ent.accession })),
            m("",
                m("button.btn-md.btn-success",
                    {
                        onclick: onCreate
                    },
                    "Create")
                )
        );
    }
}