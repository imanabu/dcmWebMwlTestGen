import {ClassComponent, RequestOptions} from "mithril";
import {IApiResponse, INewStudy, INewStudyDto} from "../model/dtos";
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

    oninit = () => {
        this.ent.studyDate = new Date();
    };

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
                case "acc":
                    my.ent.accession = v ? v : "";
                    break;
                case "dob":
                    const dp = dateParse(v);
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
                    } else {
                        my.status = "Name must be in the DICOM/HL7 Format: SMITH^JOHN^A";
                    }
                    break;
                case "reason":
                    my.ent.reason = v ? v : "";
                    break;
                case "sd":
                    const sd = dateParse(v);
                    my.ent.studyDate = sd;
                    break;
                case "studyuid":
                    my.ent.studyUid = v ? v : "";
                    break;
            }
        };

        const onCreate = () => {
            const my = this;
            let opt = {} as RequestOptions<IApiResponse<any>>;
            opt.method = "POST";
            let data: INewStudyDto = {} as INewStudyDto;
            opt.data = data;
            const ent = my.ent;

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
            data.studyDate = ent.studyDate? ent.studyDate!.toISOString(): "";

            m.request("api/study/add", opt)
            .then((res) => {
                my.status = res.message;
                return res;
            })
            .catch((err: Error) => {
                my.status = err.message;
                return err;
            });
        };

        return m("",
            m("h4", my.status),
            m("",
                m("label.lbl-input[for=mrn])", "MRN: "),
                m("input[id=mrn][type=text]", {
                    onchange: oninput,
                    placeholder: "Optional",
                    value: my.ent.mrn })),
            m("",
                m("label.lbl-input[for=name])","Name: "),
                m("input[id=name][type=text]", {
                    onchange: oninput,
                    placeholder: "Temple^Zen^M^Jr.",
                    value: my.ent.patientName})),
            m("",
                m("label.lbl-input[for=gender])", "Gender: "
                ),
                m("input.lbl-input[id=gender][type=text]", {
                    onchange: oninput,
                    placeholder: "F, M or O",
                    value: my.ent.gender})),
            m("",
                m("label.lbl-input[for=dob])", "DOB: "),
            m("input[id=dob][type=text]", {
                onchange: oninput,
                placeholder: "Like 2/29/2000",
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
                    placeholder: "Optional",
                    value: my.ent.accession })),
            m("",
                m("label.lbl-input[for=modality])", "Modality: "),
                m("input[id=modality][type=text]", {
                    onchange: oninput,
                    placeholder: "CT, MR, XR, VL...",
                    value: my.ent.modality })),
            m("",
                m("label.lbl-input[for=reason])", "Reason: "),
                m("input[id=reason][type=text]", {
                    onchange: oninput,
                    placeholder: "Optional",
                    style: "width:60%",
                    value: my.ent.reason })),
            m("",
                m("label.lbl-input[for=studyuid])", "StudyUID: "),
                m("input[id=studyuid][type=text]", {
                    onchange: oninput,
                    placeholder: "Critical! Leave blank unless you know what to do.",
                    style: "width:60%",
                    value: my.ent.studyUid })),
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