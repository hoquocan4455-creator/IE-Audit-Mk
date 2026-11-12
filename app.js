// =====================================
// IE AUDIT MK
// APP.JS PART B
// =====================================

// =====================================
// LINE OWNER
// =====================================

const lineOwner = {};

for(let i=1;i<=5;i++) lineOwner[i]="Như";
for(let i=6;i<=10;i++) lineOwner[i]="Phúc";
for(let i=11;i<=13;i++) lineOwner[i]="Nhân";
for(let i=14;i<=15;i++) lineOwner[i]="Thắm";
for(let i=16;i<=18;i++) lineOwner[i]="Thuận";
for(let i=19;i<=21;i++) lineOwner[i]="Viễn";
for(let i=22;i<=23;i++) lineOwner[i]="Trâm";
for(let i=24;i<=25;i++) lineOwner[i]="Khanh";
for(let i=26;i<=29;i++) lineOwner[i]="Ái";
for(let i=30;i<=33;i++) lineOwner[i]="Công";
for(let i=34;i<=36;i++) lineOwner[i]="Thảo";
for(let i=37;i<=40;i++) lineOwner[i]="Trân";

// =====================================
// FINDING NAME
// =====================================

const findingName = {

"TW-01":"Missing Layout",
"TW-02":"Missing OB",
"TW-03":"Missing Yamazumi",
"TW-04":"Missing Skill Matrix",
"TW-05":"Missing Daily Target",
"TW-06":"Missing Incentive",
"TW-07":"Outdated Document",
"TW-08":"Document Mismatch",
"TW-09":"Daily Target Not Updated",
"TW-10":"Incentive Not Updated",
"TW-11":"No IE Tower",
"TW-12":"Poor IE Tower Maintenance",

"ST-01":"No Standard Work",
"ST-02":"Outdated Standard Work",
"ST-03":"Wrong Machine Type",
"ST-04":"Wrong Operation Allocation",
"ST-05":"Operator Not Following SW",

"WF-01":"Machine Misalignment",
"WF-02":"Cross Material Flow",
"WF-03":"Excess Transportation",
"WF-04":"Broken Workflow",
"WF-05":"Layout Bottleneck",
"WF-06":"Workflow Not Optimized",
"WF-07":"Wrong Feeding Direction",
"WF-08":"Output Not At End Of Line",

"LY-01":"Wrong Workstation Layout",
"LY-02":"Unauthorized Machine Relocation",
"LY-03":"Missing Workstation",
"LY-04":"Unapproved Additional Machine",
"LY-05":"Layout Not Following Approved Plan",
"LY-06":"Wrong Flow Arrangement",
"LY-07":"Missing Machine In Layout",
"LY-08":"Machine Outside Approved Layout",

"FP-01":"Garments On Chair",
"FP-02":"Garments On Floor",
"FP-03":"Multiple Chair Violations",
"FP-04":"Multiple Floor Violations",
"FP-05":"Widespread Line Violation",

"WP-01":"WIP Above Standard",
"WP-02":"Multiple WIP Accumulation Points",
"WP-03":"Minor Bottleneck",
"WP-04":"Major Bottleneck",
"WP-05":"WIP Out Of Control",
"WP-06":"WIP Not Following Standard",
"WP-07":"WIP Blocking Walkway",
"WP-08":"No FIFO Control"

};

// =====================================
// FINDING MASTER
// =====================================

const findings = {

tower:[
["TW-01","Missing Layout",1],
["TW-02","Missing OB",1],
["TW-03","Missing Yamazumi",1],
["TW-04","Missing Skill Matrix",1],
["TW-05","Missing Daily Target",1],
["TW-06","Missing Incentive",1],
["TW-07","Outdated Document",1],
["TW-08","Document Mismatch",2],
["TW-09","Daily Target Not Updated",1],
["TW-10","Incentive Not Updated",1],
["TW-11","No IE Tower",5],
["TW-12","Poor IE Tower Maintenance",3]
],

stw:[
["ST-01","No Standard Work",1],
["ST-02","Outdated Standard Work",1],
["ST-03","Wrong Machine Type",3],
["ST-04","Wrong Operation Allocation",3],
["ST-05","Operator Not Following SW",3]
],

workflow:[
["WF-01","Machine Misalignment",1],
["WF-02","Cross Material Flow",2],
["WF-03","Excess Transportation",1],
["WF-04","Broken Workflow",2],
["WF-05","Layout Bottleneck",3],
["WF-06","Workflow Not Optimized",2],
["WF-07","Wrong Feeding Direction",2],
["WF-08","Output Not At End Of Line",2]
],

layout:[
["LY-01","Wrong Workstation Layout",1],
["LY-02","Unauthorized Machine Relocation",2],
["LY-03","Missing Workstation",2],
["LY-04","Unapproved Additional Machine",3],
["LY-05","Layout Not Following Approved Plan",5],
["LY-06","Wrong Flow Arrangement",2],
["LY-07","Missing Machine In Layout",2],
["LY-08","Machine Outside Approved Layout",3]
],

floor:[
["FP-01","Garments On Chair",1],
["FP-02","Garments On Floor",2],
["FP-03","Multiple Chair Violations",3],
["FP-04","Multiple Floor Violations",5],
["FP-05","Widespread Line Violation",5]
],

wip:[
["WP-01","WIP Above Standard",1],
["WP-02","Multiple WIP Accumulation Points",2],
["WP-03","Minor Bottleneck",3],
["WP-04","Major Bottleneck",5],
["WP-05","WIP Out Of Control",5],
["WP-06","WIP Not Following Standard",2],
["WP-07","WIP Blocking Walkway",3],
["WP-08","No FIFO Control",3]
]

};

// =====================================
// LOAD LINES
// =====================================

function loadLines(){

    const select =
    document.getElementById(
        "lineSelect"
    );

    select.innerHTML = "";

    for(let i=1;i<=40;i++){

        const option =
        document.createElement(
            "option"
        );

        option.value = i;

        option.text =
        "Line " + i;

        select.appendChild(
            option
        );

    }

}

// =====================================
// UPDATE IE
// =====================================

function updateIE(){

    const line =
    document.getElementById(
        "lineSelect"
    ).value;

    const owner =
    lineOwner[line];

    document.getElementById(
        "ieOwner"
    ).innerText =
    owner;

    if(
        document.getElementById(
        "ieDisplay"
        )
    ){
        document.getElementById(
        "ieDisplay"
        ).innerText =
        owner;
    }

    if(
        document.getElementById(
        "lineDisplay"
        )
    ){
        document.getElementById(
        "lineDisplay"
        ).innerText =
        line;
    }

}

// =====================================
// BUILD GROUP
// =====================================

function buildGroup(
containerId,
groupName
){

    const box =
    document.getElementById(
        containerId
    );

    if(!box) return;

    findings[groupName]
    .forEach(item=>{

        const code =
        item[0];

        const desc =
        item[1];

        const minus =
        item[2];

        const div =
        document.createElement(
            "div"
        );

        div.className =
        "finding";

        div.innerHTML =

        `
        <label>

        <input
        type="checkbox"
        class="finding-check"
        data-group="${groupName}"
        data-minus="${minus}"
        data-code="${code}">

        ${code}
        -
        ${desc}
        (-${minus})

        </label>
        `;

        box.appendChild(div);

    });

}

// =====================================
// SCORE
// =====================================

function calculateScore(){

    let tower = 15;
    let stw = 10;
    let workflow = 20;
    let layout = 20;
    let floor = 20;
    let wip = 15;

    if(
        document.querySelectorAll(
            '[data-group="tower"]:checked'
        ).length > 0
    ){
        tower = 0;
    }

    if(
        document.querySelectorAll(
            '[data-group="stw"]:checked'
        ).length > 0
    ){
        stw = 0;
    }

    if(
        document.querySelectorAll(
            '[data-group="workflow"]:checked'
        ).length > 0
    ){
        workflow = 0;
    }

    if(
        document.querySelectorAll(
            '[data-group="layout"]:checked'
        ).length > 0
    ){
        layout = 0;
    }

    if(
        document.querySelectorAll(
            '[data-group="floor"]:checked'
        ).length > 0
    ){
        floor = 0;
    }

    if(
        document.querySelectorAll(
            '[data-group="wip"]:checked'
        ).length > 0
    ){
        wip = 0;
    }

    const total =
        tower +
        stw +
        workflow +
        layout +
        floor +
        wip;

    document.getElementById(
        "towerScore"
    ).innerText =
    `${tower} / 15`;

    document.getElementById(
        "stwScore"
    ).innerText =
    `${stw} / 10`;

    document.getElementById(
        "workflowScore"
    ).innerText =
    `${workflow} / 20`;

    document.getElementById(
        "layoutScore"
    ).innerText =
    `${layout} / 20`;

    document.getElementById(
        "floorScore"
    ).innerText =
    `${floor} / 20`;

    document.getElementById(
        "wipScore"
    ).innerText =
    `${wip} / 15`;

    document.getElementById(
        "total"
    ).innerText =
    total;

    let rating =
    "EXCELLENT";

    if(total < 80){

        rating =
        "NEED IMPROVEMENT";

    }
    else if(total < 90){

        rating =
        "GOOD";

    }
    else if(total < 95){

        rating =
        "VERY GOOD";

    }

    document.getElementById(
        "rating"
    ).innerText =
    rating;

}

// =====================================
// START
// =====================================

window.onload = function(){

    loadLines();

    updateIE();

    buildGroup(
        "towerList",
        "tower"
    );

    buildGroup(
        "stwList",
        "stw"
    );

    buildGroup(
        "workflowList",
        "workflow"
    );

    buildGroup(
        "layoutList",
        "layout"
    );

    buildGroup(
        "floorList",
        "floor"
    );

    buildGroup(
        "wipList",
        "wip"
    );

    document
    .getElementById(
    "lineSelect"
    )
    .addEventListener(
    "change",
    updateIE
    );

    document.addEventListener(

        "change",

        function(e){

            if(
            e.target.classList.contains(
            "finding-check"
            )
            ){

                calculateScore();

            }

        }

    );

    calculateScore();

};

// =====================================
// GET WEEK NUMBER
// =====================================

function getWeek(){

    return "2026-W46";

}

// =====================================
// GET FINDINGS
// =====================================

function getSelectedFindings(){

    const selectedFindings = [];

    document
    .querySelectorAll(
        ".finding-check:checked"
    )
    .forEach(item=>{

        selectedFindings.push(
            item.dataset.code
        );

    });

    return selectedFindings;

}

// =====================================
// SAVE AUDIT
// =====================================

function saveAudit(){

    const line =
    Number(
        document.getElementById(
            "lineSelect"
        ).value
    );

    const week =
    getWeek();

    const record = {

        id:
        `${week}-L${line}`,

        week:
        week,

        date:
        new Date().toLocaleDateString(),

        time:
        new Date().toLocaleTimeString(),

        line:
        line,

        ie:
        lineOwner[line],

        score:
        Number(
            document.getElementById(
                "total"
            ).innerText
        ),

        findings:
        getSelectedFindings(),

        comment:
        document.getElementById(
            "comment"
        ).value

    };

    localStorage.setItem(

        record.id,

        JSON.stringify(record)

    );

    alert(
        `Audit Saved

Line ${line}

Score ${record.score}`
    );

}

// =====================================
// HISTORY
// =====================================

function showHistory(){

    let audits = [];

    for(let i=0;i<localStorage.length;i++){

        const key =
        localStorage.key(i);

        if(
            key.startsWith("2026-W46-L")
        ){

            audits.push(

                JSON.parse(
                    localStorage.getItem(key)
                )

            );

        }

    }

    if(
        audits.length===0
    ){

        alert(
            "No Audit Found"
        );

        return;

    }

    audits.sort(
        (a,b)=>
        b.score-a.score
    );

    let html = `

    <html>

    <head>

    <title>
    IE AUDIT MK History
    </title>

    <style>

    body{
        font-family:Arial;
        padding:20px;
    }

    table{
        width:100%;
        border-collapse:collapse;
    }

    th,td{
        border:1px solid #ddd;
        padding:8px;
    }

    th{
        background:#002060;
        color:white;
    }

    </style>

    </head>

    <body>

    <h1>
    IE AUDIT MK
    </h1>

    <h2>
    Audit History
    </h2>

    <table>

<tr>
    <th>Date</th>
    <th>Line</th>
    <th>IE</th>
    <th>Score</th>
    <th>Findings</th>
    <th>Action</th>
</tr>

    `;

    audits.forEach(item=>{

        html += `

        <tr>

        <td>
        ${item.date}
        <br>
        ${item.time}
        </td>

        <td>
        ${item.line}
        </td>

        <td>
        ${item.ie}
        </td>

        <td>
        ${item.score}
        </td>

        <td>
${item.findings.join(", ")}
</td>

<td>

<button
style="
background:#dc3545;
color:white;
border:none;
padding:5px 10px;
border-radius:4px;
cursor:pointer;
"
onclick="
if(confirm('Delete Audit?')){

localStorage.removeItem('${item.id}');

this.closest('tr').remove();

}
">

🗑 Delete

</button>
</td>

        </tr>

        `;

    });

    html += `

    </table>

    </body>

    </html>

    `;

    const w =
    window.open();

    w.document.write(
        html
    );

    w.document.close();

}

// =====================================
// WEEKLY REPORT
// =====================================

function generateReport(){

    const audits = [];
    const findingCounter = {};

    for(let i=0;i<localStorage.length;i++){

        const key =
        localStorage.key(i);

        if(
            key.startsWith(
                "2026-W46-L"
            )
        ){

            const item =
            JSON.parse(
                localStorage.getItem(
                    key
                )
            );

            audits.push(item);

            item.findings.forEach(code=>{

                findingCounter[code] =
                (findingCounter[code] || 0) + 1;

            });

        }

    }

    if(audits.length===0){

        alert("No Audit Found");

        return;

    }

    audits.sort(
        (a,b)=>
        b.score-a.score
    );

    const totalScore =
    audits.reduce(
        (sum,item)=>
        sum + item.score,
        0
    );

    const avgScore =
    (
        totalScore /
        audits.length
    ).toFixed(1);

    const bestLine =
    audits[0];

    const worstLine =
    audits[
        audits.length - 1
    ];

    let html = `

    <html>

    <head>

    <title>
    IE AUDIT MK Weekly Report
    </title>

    <style>

    body{

        font-family:Arial;
        padding:20px;

    }

    h1{

        color:#002060;

    }

    h2{

        color:#002060;

    }

    table{

        width:100%;
        border-collapse:collapse;
        margin-top:10px;

    }

    th,
    td{

        border:1px solid #DDD;
        padding:8px;

    }

    th{

        background:#002060;
        color:white;

    }

    </style>

    </head>

    <body>

    <h1>
    IE AUDIT MK
    </h1>

    <h2>
    Weekly Report
    </h2>

    <hr>

    <h3>
    Executive Summary
    </h3>

    <p>
    Total Audits :
    ${audits.length}
    </p>

    <p>
    Average Score :
    ${avgScore}
    </p>

    <p>
    Best Line :
    ${bestLine.line}
    (${bestLine.score})
    </p>

    <p>
    Worst Line :
    ${worstLine.line}
    (${worstLine.score})
    </p>

    <hr>

    <h3>
    Ranking
    </h3>

    <table>

    <tr>

    <th>Rank</th>
    <th>Line</th>
    <th>IE</th>
    <th>Score</th>

    </tr>

    `;

    audits.forEach(
        (item,index)=>{

        html += `

        <tr>

        <td>${index+1}</td>

        <td>${item.line}</td>

        <td>${item.ie}</td>

        <td>${item.score}</td>

        </tr>

        `;

    });

    html += `

    </table>

    <hr>

    <h3>
    Top Findings
    </h3>

    <table>

    <tr>

    <th>Rank</th>
    <th>Code</th>
    <th>Finding</th>
    <th>Qty</th>
    <th>% Line</th>

    </tr>

    `;

    let rank = 1;

    Object.entries(
        findingCounter
    )
    .sort(
        (a,b)=>
        b[1]-a[1]
    )
    .forEach(item=>{

        const code =
        item[0];

        const qty =
        item[1];

        const pct =
        (
            qty /
            audits.length *
            100
        ).toFixed(1);

        html += `

        <tr>

        <td>${rank++}</td>

        <td>${code}</td>

        <td>
        ${findingName[code] || ""}
        </td>

        <td>${qty}</td>

        <td>${pct}%</td>

        </tr>

        `;

    });

    html += `

    </table>

    </body>

    </html>

    `;

    const reportWindow =
    window.open();

    reportWindow.document.write(
        html
    );

    reportWindow.document.close();

}