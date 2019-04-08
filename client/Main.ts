import m = require("mithril");
import _ = require("lodash/fp");

/**
 * THE MAIN
 */
// Content DIV to insert the content into
const content = document.getElementById("content") as Element;

export class Main implements m.ClassComponent {

    private mwl: string;
    private rawMwl: any[] = [];
    private mode = "mwl";
    private listMode = true;
    private departments: string;
    private limit = 10;

    constructor() {
        this.mwl = "";
        this.departments = "";
    }

    public view() {
        const my = this;
        const spacer = m("[style=margin-botton:10px;]", m.trust("&nbsp;"));
        const h = m(`h2`, {}, `ZenSnapMD MWL Test Suite`);

        const dp = m(`pre`, my.departments);

        const help = my.mode === "mwl" ?
            m(".col.head-room", `Used QIDO API URL: http://localhost:3000/api/studies?limit=${my.limit}`) :
            m(".col.head-room", `To change this, Edit Config.ts file, rebuild and run.`);

        const limitLabel = m("label[for=limit]", "Limit: ");
        const limit = m("input[id=limit][type=text][style=margin-left:10px]",
            {
                onchange: m.withAttr("value", (v) => { my.limit = parseInt(v, 10);}),
                value: my.limit,
            });
        const limitCell = m(".col", [limitLabel, limit]);

        const listButton = m("button.btn-margin.col.btn-med.btn-info", {
            onclick: () => {
                my.listMode = true;
                my.getMwl.bind(my)(); },
        }, "Gen & Show List");

        const rawButton = m("button.brn-margin.col.btn-med.btn-info", {
            onclick: () => {
                my.listMode = false;
                my.getMwl.bind(my)(); },
        }, "Gen & Show JSON");

        const deptButton = m("button.btn-margin.col.btn-med.btn-info", {
            onclick: my.getDepartments.bind(my),
        }, "Show Departments");

        const ctrlRow = m(".row",
            [
                limitCell,
                rawButton,
                listButton,
                deptButton]);

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
        )

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
                m(".col-1", item["00400100"].Value[0]["00400002"].Value[0]),
                // m(".col", item["00400100"].Value[0]["00400003"].Value[0]),
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

        const mw = my.listMode ? m("", listHead, getList(my.rawMwl)) : m(`pre`, my.mwl);

        return m("", [h,
            ctrlRow,
            m(".row", help),
            spacer,
            my.mode === "mwl" ? mw : dp]);
    }

    private getMwl() {
        const my = this;
        my.mode = "mwl";
        const url = `api/studies?limit=${my.limit}`;

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
    }

    private getDepartments() {
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

    }
}

// Content DIV to insert the content into
// const content = document.getElementById("content") as Element;

// Route to mount various component pages
export const main = new Main();
m.mount(content, main);
