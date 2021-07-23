import m = require("mithril");
import _ = require("lodash/fp");
import {Vnode} from "mithril";
import {AddComponent} from "./AddComponent";

/**
 * THE MAIN
 */
// Content DIV to insert the content into
const content = document.getElementById("content") as Element;

export class Main implements m.ClassComponent {

    private addComponent = new AddComponent();
    private mwl: string;
    private rawMwl: any[] = [];
    private mode: "add" | "dept" | "mwl" | "raw"  = "mwl";
    private departments: string;
    private limit = 100;
    private usedUrl = "";

    constructor() {
        this.mwl = "";
        this.departments = "";
        console.log("Constructed");
    }

    public view = () => {
        const my = this;
        const spacer = m("[style=margin-bottom:10px;]", m.trust("&nbsp;"));
        const h = m("",
            m(`h2`, {}, `ZenSnapMD MWL Test Suite`),
            m("a[href=https://github.com/imanabu/dcmWebMwlTestGen][target=_blank]",
                "Source on GitHub")
            );

        let help = m("");

        const limitLabel = m("label[for=limit]", "Limit: ");
        const limit = m("input[id=limit][type=text][style=margin-left:10px]",
            {
                onchange: (e:Event) => {
                    const v = (e.currentTarget as HTMLInputElement).value;
                    my.limit = parseInt(v, 10);
                    console.log(`Limit set to ${my.limit}`);
                    },
                placeholder: "100",
                value: my.limit,
            });
        const limitCell = m(".col", [limitLabel, limit]);

        const listButton = m("button.btn-margin.col.btn-med.btn-info", {
            onclick: () => {
                my.mode = "mwl";
                return my.getMwl(); },
        }, "Gen & Show List");

        const rawButton = m("button.brn-margin.col.btn-med.btn-info", {
            onclick: () => {
                my.mode = "raw";
                return my.getMwl(); },
        }, "Gen & Show JSON");

        const addButton = m("button.btn-margin.col.btn-med.btn-info", {
            onclick: () => {
                my.mode = "add";
            },
        }, "Add New");

        const deptButton = m("button.btn-margin.col.btn-med.btn-info", {
            onclick: () => {
                my.mode = "dept";
                return my.getDepartments.bind(my)();
            },
        }, "Show Departments");

        const ctrlRow = m(".row",
            [
                limitCell,
                rawButton,
                listButton,
                addButton,
                deptButton]);

        let body: Vnode = m("");

        if (my.mode === "mwl") {
            help = m(".col.head-room", `Used QIDO API URL: ${my.usedUrl}`);

            const listHead = m(".row.list-header",
                m(".col-1", "Date"),
                // m(".col", item["00400100"].Value[0]["00400003"].Value[0]),
                m(".col-2", "Patient Name"),
                m(".col-1", "MRN"),
                m(".col-1", "DOB"),
                m(".col-1",  "Gender"),
                m(".col-1", "Modality"),
                m(".col-1", "Accession"),
                m(".col-1", "Dept."),
                m(".col-1", "Reason"),
            );

            const getList = _.map((item: any) => {
                let name = item["00100010"].Value[0].Alphabetic;
                let nameParts = name.split("^");
                let finalName = "";
                for (let i = 0; i < nameParts.length; i++) {
                    finalName = finalName + nameParts[i];
                    if (i === 0) {
                        finalName = finalName + ", ";
                    } else {
                        finalName = finalName + " ";
                    }
                }

                return m(".row",
                    m(".col-1", item["00400100"].Value[0]["00400002"].Value[0]
                        + " " + item["00400100"].Value[0]["00400003"].Value[0]),
                    m(".col-2", finalName),
                    m(".col-1", item["00100020"].Value[0]),
                    m(".col-1", item["00100030"].Value[0]),
                    m(".col-1", item["00100040"].Value[0]),
                    m(".col-1", item["00400100"].Value[0]["00080060"].Value[0]),
                    m(".col-1", item["00080050"].Value[0]),
                    m(".col-1", item["00081040"].Value[0]),
                    m(".col-2", item["00081030"].Value[0]),
                )
            });

            body = m("", listHead, getList(my.rawMwl));

        } else if (my.mode === "raw") {
            body =  m(`pre`, my.mwl);
        } else if (my.mode === "add") {
            help = m(".col.head-room", `Generate a specific patient on the next gen cycle.`);
            body = m(my.addComponent);
        } else if (my.mode === "dept") {
            help = m(".col.head-room", `To change this, Edit Config.ts file, rebuild and run.`);
            body = m(`pre`, my.departments);
        }

        return m("", [h,
            ctrlRow,
            m(".row", help),
            spacer,
            body]);
    };

    private getMwl = () => {
        const my = this;
        const url = my.limit ? `api/studies?limit=${my.limit}` :
            `api/studies`;

        my.usedUrl = url;

        const options = {} as m.RequestOptions<any>;
        options.method = "GET";
        return m.request(url, options).then(
            (data: any) => {
                my.rawMwl = data;
                my.mwl = JSON.stringify(data, null, 3);
            }
        ).catch(
            (error) => {
                my.mwl = error.toString();
            }
        );
    };

    private getDepartments = () => {
        const my = this;
        my.mode = "dept";
        const url = `api/departments`;

        const options = {} as m.RequestOptions<any>;
        options.method = "GET";
        return m.request(url, options).then(
            (data: any) => {
                my.departments = JSON.stringify(data, null, 3);
            }
        ).catch(
            (error) => {
                my.mwl = error.toString();
            }
        );
    };
}

// Content DIV to insert the content into
// const content = document.getElementById("content") as Element;

// Route to mount various component pages
export const main = new Main();
m.mount(content, main);
