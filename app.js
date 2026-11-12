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
"TW-03":"Pre-Yamazumi",
"TW-04":"Act-Yamazumi",
"TW-05":"Incentive",

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
"FP-04":"Use Incorrect Support Tools",

"LB-01":"Update Target & Efficiency",
"LB-02":"Line Feeding Detail",
"LB-03":"Incentive Plan",

};

// =====================================
// FINDING MASTER
// =====================================

const findings = {

tower:[
["TW-01","Missing Layout",15],
["TW-02","Missing OB",15],
["TW-03","Pre-Yamazumi",15],
["TW-04","Act-Yamazumi",15],
["TW-05","Incentive",15]

],

stw:[
["ST-01","No Standard Work",1],
["ST-02","Outdated Standard Work",1],
["ST-03","Wrong Machine Type",3],
["ST-04","Wrong Operation Allocation",3],
["ST-05","Operator Not Following SW",3]
],

workflow:[
["WF-01","Machine Misalignment",5],
["WF-02","Cross Material Flow",5],
["WF-03","Excess Transportation",5],
["WF-04","Layout Bottleneck",5]

],

layout:[
["LY-04","Unapproved Additional Machine",5],
["LY-05","Layout Not Following Approved Plan",20],
["LY-06","Wrong Flow Arrangement",5],
["LY-08","Machine Outside Approved Layout",10]
],

floor:[
["FP-01","Garments On Chair",5],
["FP-02","Garments On Floor",5],
["FP-03","Multiple Chair Violations",5],
["FP-04","Use Incorrect Support Tools",5]
],

lib:[
["LB-01","Update Target & Efficiency",5],
["LB-02","Line Feeding Detail",5],
["LB-03","Incentive Plan",5]
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

    // =========================
    // START SCORE
    // =========================

    let tower = 15;
    let stw = 10;
    let workflow = 20;
    let layout = 20;
    let floor = 20;
    let lib = 15;

    // =========================
    // IE TOWER (CRITICAL)
    // =========================

    if(
        document.querySelectorAll(
            '[data-group="tower"]:checked'
        ).length > 0
    ){
        tower = 0;
    }

    // =========================
    // STW
    // =========================

    const stMajor =
    document.querySelector(
        '[data-code="ST-01"]:checked'
    ) ||
    document.querySelector(
        '[data-code="ST-02"]:checked'
    ) ||
    document.querySelector(
        '[data-code="ST-03"]:checked'
    ) ||
    document.querySelector(
        '[data-code="ST-04"]:checked'
    );

    if(stMajor){

        stw -= 8;

    }

    if(
        document.querySelector(
            '[data-code="ST-05"]:checked'
        )
    ){

        stw -= 2;

    }

    stw = Math.max(0,stw);

    // =========================
    // WORKFLOW
    // =========================

    workflow -=
    document.querySelectorAll(
        '[data-group="workflow"]:checked'
    ).length * 5;

    workflow =
    Math.max(0,workflow);

    // =========================
    // LAYOUT
    // =========================

    if(
        document.querySelector(
            '[data-code="LY-05"]:checked'
        )
    ){

        layout = 0;

    }
    else{

        if(
            document.querySelector(
                '[data-code="LY-04"]:checked'
            )
        ){
            layout -= 5;
        }

        if(
            document.querySelector(
                '[data-code="LY-06"]:checked'
            )
        ){
            layout -= 5;
        }

        if(
            document.querySelector(
                '[data-code="LY-08"]:checked'
            )
        ){
            layout -= 10;
        }

        layout =
        Math.max(0,layout);

    }

    // =========================
    // FLOOR
    // =========================

    floor -=
    document.querySelectorAll(
        '[data-group="floor"]:checked'
    ).length * 5;

    floor =
    Math.max(0,floor);

    // =========================
    // LIB
    // =========================

    lib -=
    document.querySelectorAll(
        '[data-group="lib"]:checked'
    ).length * 5;

    lib =
    Math.max(0,lib);

    // =========================
    // TOTAL
    // =========================

    const total =

        tower +
        stw +
        workflow +
        layout +
        floor +
        lib;

    // =========================
    // DISPLAY
    // =========================

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
        "libScore"
    ).innerText =
    `${lib} / 15`;

    document.getElementById(
        "total"
    ).innerText =
    total;

    // =========================
    // RATING
    // =========================

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
    "libList",
    "lib"
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

    const criticalCodes = [

        "TW-01",
        "TW-02",
        "TW-03",
        "TW-04",
        "TW-05",
        "LY-05"

    ];

    const criticalCounter = {};

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

                if(
                    criticalCodes.includes(
                        code
                    )
                ){

                    criticalCounter[code] =
                    (criticalCounter[code] || 0) + 1;

                }

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

    table{

        width:100%;
        border-collapse:collapse;
        margin-top:10px;

    }

    th,td{

        border:1px solid #DDD;
        padding:8px;

    }

    th{

        background:#002060;
        color:white;

    }

    h1,h2,h3{

        color:#002060;

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
    Line ${bestLine.line}
    (${bestLine.score})
    </p>

    <p>
    Worst Line :
    Line ${worstLine.line}
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
        <td>${findingName[code] || ""}</td>
        <td>${qty}</td>
        <td>${pct}%</td>

        </tr>

        `;

    });

    html += `

    </table>

    <hr>

    <h3>
    Critical Findings
    </h3>

    <table>

    <tr>

    <th>Code</th>
    <th>Finding</th>
    <th>Qty</th>

    </tr>

    `;

    const criticalEntries =
    Object.entries(
        criticalCounter
    );

    if(
        criticalEntries.length===0
    ){

        html += `

        <tr>

        <td colspan="3">
        No Critical Findings
        </td>

        </tr>

        `;

    }
    else{

        criticalEntries
        .forEach(item=>{

            html += `

            <tr>

            <td>${item[0]}</td>
            <td>${findingName[item[0]]}</td>
            <td>${item[1]}</td>

            </tr>

            `;

        });

    }

    html += `

    </table>

    <hr>

    <h3>
    Best Lines
    </h3>

    <table>

    <tr>

    <th>Rank</th>
    <th>Line</th>
    <th>IE</th>
    <th>Score</th>

    </tr>

    `;

    audits
    .slice(0,3)
    .forEach(
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
    Improvement Priority Lines
    </h3>

    <table>

    <tr>

    <th>Rank</th>
    <th>Line</th>
    <th>IE</th>
    <th>Score</th>

    </tr>

    `;

    [...audits]
    .sort(
        (a,b)=>
        a.score-b.score
    )
    .slice(0,3)
    .forEach(
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
