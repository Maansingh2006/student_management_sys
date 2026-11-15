
// ==========================================
// ADD STUDENT
// ==========================================

const studentForm = document.getElementById("studentForm");

if (studentForm) {
    studentForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const student = {
            form_id: document.getElementById("form_id").value.trim(),
            name: document.getElementById("name").value.trim(),
            father_name: document
                .getElementById("father_name")
                .value
                .trim(),
            phone: document.getElementById("phone").value.trim(),
            course: document.getElementById("course").value.trim(),
            email: document.getElementById("email").value.trim(),
            Totalfees: document.getElementById("Totalfees").value.trim(),
            Paidfees: document.getElementById("Paidfees").value.trim(),
            Duefees: document.getElementById("Duefees").value.trim()
        };

        const message = document.getElementById("addMessage");

        try {
            const response = await fetch("/api/students", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(student)
            });

            const data = await response.json();

            if (!response.ok) {
                message.textContent = data.message;
                message.className = "error";
                return;
            }

            message.textContent = data.message;
            message.className = "success";

            studentForm.reset();

        } catch (error) {
            console.log(error);

            message.textContent = "Server connection error";
            message.className = "error";
        }
    });
}


// ==========================================
// NAVIGATION
// ==========================================

function goHome() {
    window.location.href = "index.html";
}

function showAdd() {
    window.location.href = "index.html";
}

function openReports() {
    window.location.href = "reports.html";
}

function openUpdate() {
    window.location.href = "update.html";
}

function openReceipt() {
    window.location.href = "receipt.html";
}



// ==========================================
// REPORTS PAGE
// ==========================================

async function loadReports() {
    const table = document.getElementById("studentTable");

    if (!table) {
        return;
    }

    try {
        const response = await fetch("/api/students");

        const students = await response.json();

        if (!response.ok) {
            table.innerHTML = `
                <tr>
                    <td colspan="7">
                        Unable to load students
                    </td>
                </tr>
            `;

            return;
        }

        if (students.length === 0) {
            table.innerHTML = `
                <tr>
                    <td colspan="7">
                        No students found
                    </td>
                </tr>
            `;

            return;
        }

        table.innerHTML = "";

        students.forEach((student) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.id}</td>

                <td>${student.form_id}</td>

                <td>${student.name}</td>

                <td>${student.father_name || "-"}</td>

                <td>${student.phone || "-"}</td>

                <td>${student.course || "-"}</td>

                <td>${student.email || "-"}</td>
                 
                <td>${student.Totalfees || "-"}</td>

                <td>${student.Paidfees || "-"}</td>

                <td>${student.Duefees || "-"}</td>
            `;

            table.appendChild(row);
        });

    } catch (error) {
        console.log(error);

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    Server connection error
                </td>
            </tr>
        `;
    }
}

loadReports();


// ==========================================
// UPDATE - FIND STUDENT
// ==========================================

async function findStudent() {
    const formId = document
        .getElementById("updateFormId")
        ?.value
        .trim();

    const message = document.getElementById("searchMessage");

    const updateCard = document.getElementById("updateCard");

    if (!formId) {
        message.textContent = "Please enter Form ID";
        message.className = "error";

        return;
    }

    try {
        const response = await fetch(
            `/api/students/${formId}`
        );

        const student = await response.json();

        if (!response.ok) {
            message.textContent = student.message;
            message.className = "error";

            updateCard.classList.add("hidden");

            return;
        }

        document.getElementById("editFormId").value =
            student.form_id;

        document.getElementById("editName").value =
            student.name;

        document.getElementById("editFatherName").value =
            student.father_name || "";

        document.getElementById("editPhone").value =
            student.phone || "";

        document.getElementById("editCourse").value =
            student.course || "";

        document.getElementById("editEmail").value =
            student.email || "";

        document.getElementById("editTotalfees").value =
            student.Totalfees || "";

        document.getElementById("editPaidfees").value =
            student.Paidfees || "";

        document.getElementById("editDuefees").value =
            student.Duefees || "";




        updateCard.classList.remove("hidden");

        message.textContent = "Student found";
        message.className = "success";

    } catch (error) {
        console.log(error);

        message.textContent = "Server connection error";
        message.className = "error";
    }
}


// ==========================================
// SAVE UPDATED STUDENT
// ==========================================
// ==========================================
// SAVE UPDATED STUDENT
// ==========================================

const updateForm = document.getElementById("updateForm");

if (updateForm) {

    updateForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const formId = document
            .getElementById("editFormId")
            .value
            .trim();

        const student = {

            name: document
                .getElementById("editName")
                .value
                .trim(),

            father_name: document
                .getElementById("editFatherName")
                .value
                .trim(),

            phone: document
                .getElementById("editPhone")
                .value
                .trim(),

            course: document
                .getElementById("editCourse")
                .value
                .trim(),

            email: document
                .getElementById("editEmail")
                .value
                .trim(),

            Totalfees: document
                .getElementById("editTotalfees")
                .value
                .trim(),

            Paidfees: document
                .getElementById("editPaidfees")
                .value
                .trim(),

            Duefees: document
                .getElementById("editDuefees")
                .value
                .trim()
        };

        const message =
            document.getElementById("updateMessage");

        try {

            const response = await fetch(
                `/api/students/${encodeURIComponent(formId)}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(student)
                }
            );

            const data = await response.json();

            if (!response.ok) {

                message.textContent =
                    data.message || "Student not found";

                message.className = "error";

                return;
            }

            message.textContent =
                data.message || "Student updated successfully";

            message.className = "success";

        } catch (error) {

            console.log(error);

            message.textContent =
                "Server connection error";

            message.className = "error";
        }
    });
}

// GENERATE RECEIPT PAGE
async function generateReceipt() {
    const formId = document
        .getElementById("receiptFormId")
        ?.value
        .trim();
    const amount = document
        .getElementById("receiptAmount")
        ?.value
        .trim();
    const message = document.getElementById("receiptMessage");
    if (!formId) {
        message.textContent = "Please enter Form ID";
        message.className = "error";
        return;
    }
    let url = `/api/students/${encodeURIComponent(formId)}/receipt`;
    if (amount) {
        url += `?amount=${encodeURIComponent(amount)}`;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const data = await response.json();
            message.textContent = data.message;
            message.className = "error";
            return;
        }
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `receipt-${formId}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(blobUrl);
        message.textContent = "Receipt generated successfully";
        message.className = "success";
    } catch (error) {
        message.textContent = "Server connection error";
        message.className = "error";
    }
}
