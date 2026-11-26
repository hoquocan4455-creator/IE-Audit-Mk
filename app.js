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
"WF-04":"Layout Bottleneck",

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
data-code="${code}"
data-desc="${desc}"
data-minus="${minus}">

${code}
-
${desc}

</label>

<div
id="photo-${code}"
style="
margin-top:8px;
display:none;
">

<button
type="button"
onclick="capturePhoto(
'${code}',
'${desc}'
)">

📷 Capture Photo

</button>

<span
id="status-${code}"
style="
margin-left:10px;
color:green;
font-weight:bold;
">

</span>

</div>
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

        feeding:
        document.getElementById(
            "feedingLine"
        ).checked,

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

        JSON.stringify(
            record
        )

    );

    alert(

        `Audit Saved

Line : ${line}

${record.feeding
? "Status : Feeding"
: "Score : " + record.score}`

    );

// =====================================
// RESET FORM
// =====================================

// Clear findings

document
.querySelectorAll(
    ".finding-check"
)
.forEach(item=>{

    item.checked = false;

});

// Clear comment

document
.getElementById(
    "comment"
)
.value = "";

// Reset Feeding

document
.getElementById(
    "feedingLine"
)
.checked = false;

// Hide photo buttons

document
.querySelectorAll(
    '[id^="photo-"]'
)
.forEach(item=>{

    item.style.display =
    "none";

});

// Clear photo status

document
.querySelectorAll(
    '[id^="status-"]'
)
.forEach(item=>{

    item.innerText = "";

});

// Recalculate score

calculateScore();

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
<th>Status</th>
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
${item.feeding ? "Feeding" : "Normal"}
</td>

<td>
${item.feeding ? "-" : item.score}
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

const findingIE = {};

    const audits = [];

const findingCounter = {};

const ieSummary = {};

let feedingCount = 0;

let auditedCount = 0;

    const criticalCodes = [

        "TW-01",
        "TW-02",
        "TW-03",
        "TW-04",
        "TW-05",
        "LY-05"

    ];

    const criticalCounter = {};

const criticalLines = {};

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

if(item.feeding){

    feedingCount++;

}
else{

    auditedCount++;

    audits.push(item);

if(
    !ieSummary[item.ie]
){

    ieSummary[item.ie] = {

        lines:0,
        totalScore:0,
        findings:{}

    };

}

ieSummary[item.ie].lines++;

    ieSummary[item.ie].totalScore +=
    item.score;

   item.findings.forEach(code=>{

if(
    !ieSummary[item.ie].findings[code]
){
    ieSummary[item.ie].findings[code] = 0;
}

ieSummary[item.ie].findings[code]++;

    findingCounter[code] =
    (findingCounter[code] || 0) + 1;

    // IE OWNER COUNTER

    if(
        !findingIE[code]
    ){

        findingIE[code] = {};

    }

    if(
        !findingIE[code][item.ie]
    ){

        findingIE[code][item.ie] = 0;

    }

    findingIE[code][item.ie]++;

    // CRITICAL

   if(
    criticalCodes.includes(
        code
    )
){

    criticalCounter[code] =
    (criticalCounter[code] || 0) + 1;

    if(
        !criticalLines[code]
    ){

        criticalLines[code] = [];

    }

    if(
        !criticalLines[code]
        .includes(item.line)
    ){

        criticalLines[code]
        .push(item.line);

    }

}


});

}


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

@media print{

    @page{
        size:A4 landscape;
        margin:10mm;
    }

    button{
        display:none;
    }

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

<br>

<button
onclick="window.print()"
style="
background:#002060;
color:white;
border:none;
padding:10px 20px;
cursor:pointer;
">

📄 EXPORT WEEKLY REPORT PDF

</button>

<hr>

    <hr>

    <h3>
    Executive Summary
    </h3>

    <p>
Audited Lines :
${auditedCount}
</p>

<p>
Feeding Lines :
${feedingCount}
</p>

<p>
Average Score :
${avgScore}
</p>

<p>
Best IE Group :
${
Object.entries(ieSummary)
.sort(
(a,b)=>
(
b[1].totalScore /
b[1].lines
)
-
(
a[1].totalScore /
a[1].lines
)
)[0]?.[0] || "-"
}
</p>

<p>
IE Below Target (&lt;90) :
${
Object.entries(ieSummary)
.filter(item=>
(
item[1].totalScore /
item[1].lines
) < 90
).length
}
</p>

    <hr>

    <h3>
IE Ranking
</h3>

`;

html += `

<table>

<tr>

<th>Rank</th>
<th>IE</th>
<th>Audited Lines</th>
<th>Avg Score</th>

</tr>

`;

let ieRank = 1;

Object.entries(ieSummary)

.sort(
(a,b)=>
(
b[1].totalScore /
b[1].lines
)
-
(
a[1].totalScore /
a[1].lines
)
)

.forEach(item=>{

    const avg = (

        item[1].totalScore /

        item[1].lines

    ).toFixed(1);

    html += `

    <tr>

    <td>${ieRank++}</td>

    <td>${item[0]}</td>

    <td>${item[1].lines}</td>

    <td>${avg}</td>

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
<th>IE Owner</th>

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

const ieInfo =
Object.entries(
    findingIE[code] || {}
)
.sort(
    (a,b)=>
    b[1]-a[1]
)

.map(item=>

    `${item[0]} (${item[1]})`

)

.join(", ");

        html += `

        <tr>

        <td>${rank++}</td>
        <td>${code}</td>
        <td>${findingName[code] || ""}</td>
        <td>${qty}</td>
        <td>${ieInfo}</td>

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
<th>Affected Lines</th>

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

        <td colspan="4">
        No Critical Findings
        </td>

        </tr>

        `;

    }
    else{

criticalEntries
.forEach(item=>{

    const lines =
(
    criticalLines[
        item[0]
    ] || []
)

    .sort(
        (a,b)=>a-b
    )

    .map(line=>

        "L" + line

    )

    .join(", ");

    html += `

    <tr>

    <td>${item[0]}</td>

    <td>${findingName[item[0]]}</td>

    <td>${item[1]}</td>

    <td>${lines}</td>

    </tr>

    `;

});

    }

    html += `

</table>

<hr>

`;

html += `

<hr>

<h3>
Improvement Priority IE
</h3>

`;

Object.entries(
    ieSummary
)

.filter(item=>

    (
        item[1].totalScore /
        item[1].lines
    ) < 90

)

.sort(
    (a,b)=>

    (
        a[1].totalScore /
        a[1].lines
    )

    -

    (
        b[1].totalScore /
        b[1].lines
    )

)

.forEach(item=>{

    const ieName =
    item[0];

    const avg = (

        item[1].totalScore /

        item[1].lines

    ).toFixed(1);

    html += `

    <h4>

    ${ieName}

    </h4>

    <p>

    Avg Score :
    ${avg}

    </p>

    <table>

    <tr>

    <th>Rank</th>
    <th>Code</th>
    <th>Finding</th>
    <th>Qty</th>

    </tr>

    `;

    let rank = 1;

    Object.entries(
        item[1].findings
    )

    .sort(
        (a,b)=>
        b[1]-a[1]
    )

    .slice(0,3)

    .forEach(f=>{

        html += `

        <tr>

        <td>${rank++}</td>

        <td>${f[0]}</td>

        <td>
        ${findingName[f[0]] || ""}
        </td>

        <td>${f[1]}</td>

        </tr>

        `;

    });

    html += `
    </table>
    `;

});

html += `

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

// =====================================
// EXPORT PDF
// =====================================

function exportPDF(){

    const reportContent = `

    <div style="font-family:Arial;padding:20px">

    <h1>
    IE AUDIT MK
    </h1>

    <h2>
    Audit Summary
    </h2>

    <hr>

    <p>
    Line :
    ${document.getElementById("lineSelect").value}
    </p>

    <p>
    IE :
    ${document.getElementById("ieOwner").innerText}
    </p>

    <p>
    Score :
    ${document.getElementById("total").innerText}
    </p>

    <p>
    Rating :
    ${document.getElementById("rating").innerText}
    </p>

    <hr>

    <h3>
    Findings
    </h3>

    <ul>

    ${
        Array.from(
            document.querySelectorAll(
                ".finding-check:checked"
            )
        )
        .map(
            item =>

            `<li>
            ${item.dataset.code}
            </li>`
        )
        .join("")
    }

    </ul>

    <hr>

    <h3>
    Comment
    </h3>

    <p>

    ${
        document.getElementById(
            "comment"
        ).value || "-"

    }

    </p>

    </div>

    `;

    const container =
    document.createElement(
        "div"
    );

    container.innerHTML =
    reportContent;

    html2pdf()

    .set({

        margin:10,

        filename:
        `IE_AUDIT_LINE_${document.getElementById("lineSelect").value}.pdf`,

        image:{
            type:"jpeg",
            quality:1
        },

        html2canvas:{
            scale:2
        },

        jsPDF:{
            unit:"mm",
            format:"a4",
            orientation:"portrait"
        }

    })

    .from(container)

    .save();

}

// =====================================
// EXPORT WEEKLY REPORT PDF
// =====================================

function exportWeeklyReportPDF(){

    window.print();

}

// =====================================
// SHOW CAMERA BUTTON
// =====================================

document.addEventListener(

    "change",

    function(e){

        if(
            e.target.classList.contains(
                "finding-check"
            )
        ){

            const code =
            e.target.dataset.code;

            const box =
            document.getElementById(
                "photo-" + code
            );

            if(!box) return;

            box.style.display =

            e.target.checked

            ? "block"

            : "none";

        }

    }

);

// =====================================
// CAMERA
// =====================================

function capturePhoto(
    code,
    desc
){

    const input =
    document.createElement(
        "input"
    );

    input.type =
    "file";

    input.accept =
    "image/*";

    input.capture =
    "environment";

    input.onchange =
    function(e){

        const file =
        e.target.files[0];

        if(!file) return;

        const img =
        new Image();

        img.onload =
        function(){

            const canvas =
            document.createElement(
                "canvas"
            );

            const ctx =
            canvas.getContext(
                "2d"
            );

            canvas.width =
            img.width;

            canvas.height =
            img.height;

            ctx.drawImage(
                img,
                0,
                0
            );

            ctx.fillStyle =
            "rgba(0,0,0,0.7)";

            ctx.fillRect(

                0,

                canvas.height-180,

                canvas.width,

                180

            );

            ctx.fillStyle =
            "white";

            ctx.font =
            "bold 42px Arial";

            const line =
            document.getElementById(
                "lineSelect"
            ).value;

            const now =
            new Date();

            ctx.fillText(
                "IE AUDIT MK",
                20,
                canvas.height-130
            );

            ctx.fillText(
                "Line : " + line,
                20,
                canvas.height-90
            );

            ctx.fillText(
                "Code : " + code,
                20,
                canvas.height-50
            );

            ctx.fillText(
                desc,
                300,
                canvas.height-50
            );

            ctx.fillText(
                now.toLocaleString(),
                20,
                canvas.height-10
            );

            const link =
            document.createElement(
                "a"
            );

            link.href =
            canvas.toDataURL(
                "image/jpeg"
            );

            link.download =
            "IMG_" +
            Date.now() +
            ".jpg";

            link.click();

            document.getElementById(
                "status-" + code
            ).innerText =
            "✅ Photo Captured";

        };

        img.src =
        URL.createObjectURL(
            file
        );

    };

    input.click();

}