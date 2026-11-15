
// require("dotenv").config();

// const express = require("express");
// const path = require("path");
// const PDFDocument = require("pdfkit");
// const db = require("./db");.

// const app = express();

// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

// // POST - Add Student
// app.post("/api/students", async (req, res) => {
//     try {
//         const {
//             form_id,
//             name,
//             father_name,
//             phone,
//             course,
//             email,
//             Totalfees,
//             Paidfees,
//             Duefees
//         } = req.body;

//         if (!form_id || !name) {
//             return res.status(400).json({
//                 message: "Form ID and Name are required"
//             });
//         }

//         await db.query(
//             `INSERT INTO students
//             (form_id, name, father_name, phone, course, email, Totalfees, Paidfees, Duefees)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [
//                 form_id,
//                 name,
//                 father_name,
//                 phone,
//                 course,
//                 email,
//                 Totalfees,
//                 Paidfees,
//                 Duefees
//             ]
//         );

//         res.json({
//             message: "Student added successfully"
//         });

//     } catch (error) {
//         if (error.code === "ER_DUP_ENTRY") {
//             return res.status(400).json({
//                 message: "This Form ID already exists"
//             });
//         }

//         console.log(error);

//         res.status(500).json({
//             message: "Server error"
//         });
//     }
// });

// // GET - Get All Students
// app.get("/api/students", async (req, res) => {
//     try {
//         const [students] = await db.query(
//             "SELECT * FROM students ORDER BY id DESC"
//         );

//         res.json(students);

//     } catch (error) {
//         console.log(error);

//         res.status(500).json({
//             message: "Server error"
//         });
//     }
// });

// // GET - Get Student By Form ID
// app.get("/api/students/:form_id", async (req, res) => {
//     try {
//         const { form_id } = req.params;

//         const [students] = await db.query(
//             "SELECT * FROM students WHERE form_id = ?",
//             [form_id]
//         );

//         if (students.length === 0) {
//             return res.status(404).json({
//                 message: "Student not found"
//             });
//         }

//         res.json(students[0]);

//     } catch (error) {
//         console.log(error);

//         res.status(500).json({
//             message: "Server error"
//         });
//     }
// });

// // PUT - Update Student
// app.put("/api/students/:form_id", async (req, res) => {
//     try {
//         const { form_id } = req.params;

//         const {
//             name,
//             father_name,
//             phone,
//             course,
//             email,
//             Totalfees,
//             Paidfees,
//             Duefees

//         } = req.body;

//         if (!name) {
//             return res.status(400).json({
//                 message: "Student name is required"
//             });
//         }

//         const [result] = await db.query(
//             `UPDATE students
//             SET name = ?,
//                 father_name = ?,
//                 phone = ?,
//                 course = ?,
//                 email = ?,
//                 Totalfees = ?,
//                 Paidfees = ?,
//                 Duefees = ?
                
//             WHERE form_id = ?`,
//             [
//                 name,
//                 father_name,
//                 phone,
//                 course,
//                 email,
//                 Totalfees,
//                 Paidfees,
//                 Duefees,
//                 form_id
                
//             ]
//         );

//         if (result.affectedRows === 0) {
//             return res.status(404).json({
//                 message: "Student not found"
//             });
//         }

//         res.json({
//             message: "Student updated successfully"
//         });

//     } catch (error) {
//         console.log(error);

//         res.status(500).json({
//             message: "Server error"
//         });
//     }
// });

// app.get("/api/students/:form_id/receipt", async (req, res) => {
//  try {
//  const { form_id } = req.params;
//  const [students] = await db.query(
//  "SELECT * FROM students WHERE form_id = ?",
//  [form_id]
//  );
//  if (stude= 0) {
//  return res.status(404).jsonts.length ==n({
//  message: "Student not found"
//  });
//  }
//  const student = students[0];
//  const amount = Number(req.query.amount);
//  const hasAmount = Number.isFinite(amount) && amount > 0;
//  const now = new Date();
//  const dateText = now.toLocaleDateString("en-IN", {
//  day: "2-digit",
//  month: "long",
//  year: "numeric"
//  });
//  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
//  const receiptNo = `RCPT-${student.form_id}-${datePart}`;
//  const safeName = String(student.form_id).replace(/[^a-zA-Z0-9_-]/g, "_");
//  res.setHeader("Content-Type", "application/pdf");
//  res.setHeader(
//  "Content-Disposition",
//  `inline; filename="receipt-${safeName}.pdf"`
//  );
//  const doc = new PDFDocument({ size: "A4", margin: 50 });
//  doc.pipe(res);
//  // Header band
//  doc.rect(0, 0, doc.page.width, 100).fill("#2563eb");
//  doc.fillColor("#ffffff")
//  .font("Helvetica-Bold")
//  .fontSize(22)
//  .text("YOUR INSTITUTE NAME", 50, 30, { align: "center" });
//  doc.font("Helvetica")
//  .fontSize(13)
//  .text("STUDENT RECEIPT", 50, 62, { align: "center" });

//  // Receipt number and date
//  doc.fillColor("#111827").font("Helvetica-Bold").fontSize(11);
//  doc.text(`Receipt No: ${receiptNo}`, 50, 125);
//  doc.text(`Date: ${dateText}`, 50, 125, { align: "right" });

// // Details box
//  doc.roundedRect(50, 155, 495, 215, 8)
//  .lineWidth(1)
//  .strokeColor("#d1d5db")
//  .stroke();
//  const rows = [
//  ["Form ID", student.form_id],
//  ["Student Name", student.name],
//  ["Father Name", student.father_name],
//  ["Phone", student.phone],
//  ["Course", student.course],
//  ["Email", student.email],
//  ["Total Fees", student.Totalfees],
//  ["Paid Fees", student.Paidfees],
//  ["Due Fees", student.Duefees]
//  ];
//  let y = 175;
//  rows.forEach(([label, value]) => {
//  doc.font("Helvetica-Bold").fontSize(11).fillColor("#374151")
//  .text(label, 70, y, { width: 140 });
//  doc.font("Helvetica").fillColor("#111827")
//  .text(String(value || "-"), 220, y, { width: 310 });
//  y += 30;
//  });
//  // Amount (optional)
//  y = 395;
//  if (hasAmount) {
//  doc.roundedRect(50, y, 495, 50, 8).fill("#eff6ff");
//  doc.fillColor("#1d4ed8").font("Helvetica-Bold").fontSize(13)
//  .text("Amount Paid", 70, y + 17, { width: 200 });
//  doc.text(`Rs. ${amount.toFixed(2)}`, 300, y + 17, {
//  width: 225,
//  align: "right"
//  });
//  y += 70;
//  }
//  // Signature
//  const signY = y + 80;
//  doc.moveTo(380, signY).lineTo(545, signY)
//  .strokeColor("#6b7280").lineWidth(1).stroke();
//  doc.fillColor("#374151").font("Helvetica").fontSize(10)
//  .text("Authorized Signature", 380, signY + 6, {
//  width: 165,
//  align: "center"
//  });
//  // Footer
//  doc.fillColor("#6b7280").fontSize(9)
//  .text("This is a computer-generated receipt.", 50, 760, {
//  width: 495,
//  align: "center"
//  });
//  doc.end();
//  } catch (error) {
//  console.log(error);
//  if (!res.headersSent) {
//  res.status(500).json({
//  message: "Server error"
//  });
//  }
//  }
// });

// // Start Server
// app.listen(5000, () => {
//     console.log("Server running at http://localhost:5000");
// });



require("dotenv").config();

const express = require("express");
const path = require("path");
const PDFDocument = require("pdfkit");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ==================================================
// POST - Add Student
// ==================================================

app.post("/api/students", async (req, res) => {
    try {
        const {
            form_id,
            name,
            father_name,
            phone,
            course,
            email,
            Totalfees,
            Paidfees,
            Duefees
        } = req.body;

        if (!form_id || !name) {
            return res.status(400).json({
                message: "Form ID and Name are required"
            });
        }

        await db.query(
            `INSERT INTO students
            (form_id, name, father_name, phone, course, email,
             Totalfees, Paidfees, Duefees)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                form_id,
                name,
                father_name,
                phone,
                course,
                email,
                Totalfees,
                Paidfees,
                Duefees
            ]
        );

        res.json({
            message: "Student added successfully"
        });

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                message: "This Form ID already exists"
            });
        }

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ==================================================
// GET - Get All Students
// ==================================================

app.get("/api/students", async (req, res) => {
    try {
        const [students] = await db.query(
            "SELECT * FROM students ORDER BY id DESC"
        );

        res.json(students);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ==================================================
// GET - Get Student By Form ID
// ==================================================

app.get("/api/students/:form_id", async (req, res) => {
    try {
        const { form_id } = req.params;

        const [students] = await db.query(
            "SELECT * FROM students WHERE form_id = ?",
            [form_id]
        );

        if (students.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(students[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ==================================================
// PUT - Update Student
// ==================================================

app.put("/api/students/:form_id", async (req, res) => {
    try {
        const { form_id } = req.params;

        const {
            name,
            father_name,
            phone,
            course,
            email,
            Totalfees,
            Paidfees,
            Duefees
        } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Student name is required"
            });
        }

        const [result] = await db.query(
            `UPDATE students
             SET name = ?,
                 father_name = ?,
                 phone = ?,
                 course = ?,
                 email = ?,
                 Totalfees = ?,
                 Paidfees = ?,
                 Duefees = ?
             WHERE form_id = ?`,
            [
                name,
                father_name,
                phone,
                course,
                email,
                Totalfees,
                Paidfees,
                Duefees,
                form_id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student updated successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ==================================================
// GET - Generate Professional Fee Receipt
// ==================================================

app.get("/api/students/:form_id/receipt", async (req, res) => {
    try {
        const { form_id } = req.params;

        // Fetch student from database
        const [students] = await db.query(
            "SELECT * FROM students WHERE form_id = ?",
            [form_id]
        );

        if (students.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const student = students[0];

        // Validate optional payment amount
        let amount = null;

        if (req.query.amount !== undefined) {
            amount = Number(req.query.amount);

            if (!Number.isFinite(amount) || amount <= 0) {
                return res.status(400).json({
                    message: "Please provide a valid payment amount"
                });
            }
        }

        const hasAmount = amount !== null;

        // Fee calculations
        const totalFees = Number(student.Totalfees) || 0;
        const paidFees = Number(student.Paidfees) || 0;

        const dueFees =
            student.Duefees !== null &&
            student.Duefees !== undefined
                ? Number(student.Duefees)
                : totalFees - paidFees;

        // Current date
        const now = new Date();

        const dateText = now.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

        // Receipt number
        const receiptNo =
            `RCPT-${student.form_id}-${Date.now()}`;

        const safeName = String(student.form_id)
            .replace(/[^a-zA-Z0-9_-]/g, "_");

        // PDF response
        res.setHeader("Content-Type", "application/pdf");

        res.setHeader(
            "Content-Disposition",
            `inline; filename="receipt-${safeName}.pdf"`
        );

        const doc = new PDFDocument({
            size: "A4",
            margin: 45
        });

        doc.pipe(res);

        // Colors
        const blue = "#2457D6";
        const dark = "#172033";
        const gray = "#64748B";
        const border = "#DCE3ED";
        const lightBlue = "#EFF5FF";
        const green = "#15803D";
        const lightGreen = "#F0FDF4";
        const red = "#C2410C";
        const lightRed = "#FFF7ED";

        const pageWidth = doc.page.width;
        const left = 45;
        const right = pageWidth - 45;
        const contentWidth = right - left;

        // Currency formatter
        const money = (value) => {
            return "Rs. " + Number(value || 0).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );
        };

        // Draw card helper
        function drawCard(x, y, width, height, fill, stroke = border) {
            doc.roundedRect(x, y, width, height, 9)
                .fillAndStroke(fill, stroke);
        }

        // ==================================================
        // 1. HEADER
        // ==================================================

        doc.rect(0, 0, pageWidth, 145).fill(blue);

        doc.font("Helvetica-Bold")
            .fontSize(23)
            .fillColor("#FFFFFF")
            .text("YOUR INSTITUTE NAME", left, 28, {
                width: contentWidth,
                align: "center"
            });

        doc.font("Helvetica")
            .fontSize(10)
            .fillColor("#EAF0FF")
            .text(
                "Your Institute Address | Phone Number",
                left,
                62,
                {
                    width: contentWidth,
                    align: "center"
                }
            );

        doc.text(
            "Email: yourinstitute@gmail.com",
            left,
            79,
            {
                width: contentWidth,
                align: "center"
            }
        );

        doc.font("Helvetica-Bold")
            .fontSize(15)
            .fillColor("#FFFFFF")
            .text("FEE PAYMENT RECEIPT", left, 108, {
                width: contentWidth,
                align: "center"
            });

        // ==================================================
        // 2. RECEIPT NUMBER AND DATE
        // ==================================================

        let y = 165;

        doc.font("Helvetica-Bold")
            .fontSize(9)
            .fillColor(dark)
            .text("Receipt No:", left, y);

        doc.font("Helvetica")
            .text(receiptNo, left + 65, y, {
                width: 220
            });

        doc.font("Helvetica-Bold")
            .text("Date:", 390, y);

        doc.font("Helvetica")
            .text(dateText, 425, y, {
                width: right - 425,
                align: "right"
            });

        // ==================================================
        // 3. STUDENT INFORMATION
        // ==================================================

        y = 200;

        doc.font("Helvetica-Bold")
            .fontSize(13)
            .fillColor(dark)
            .text("Student Information", left, y);

        y += 25;

        drawCard(left, y, contentWidth, 190, "#FFFFFF");

        const studentRows = [
            ["Form ID", student.form_id],
            ["Student Name", student.name],
            ["Father Name", student.father_name],
            ["Phone", student.phone],
            ["Course", student.course],
            ["Email", student.email]
        ];

        let rowY = y + 17;

        studentRows.forEach(([label, value]) => {
            doc.font("Helvetica-Bold")
                .fontSize(10)
                .fillColor(gray)
                .text(label, left + 16, rowY, {
                    width: 130
                });

            doc.font("Helvetica")
                .fontSize(10)
                .fillColor(dark)
                .text(
                    value === null ||
                    value === undefined ||
                    value === ""
                        ? "-"
                        : String(value),
                    left + 160,
                    rowY,
                    {
                        width: contentWidth - 180
                    }
                );

            rowY += 27;
        });

        // ==================================================
        // 4. FEE SUMMARY
        // ==================================================

        y += 190 + 25;

        doc.font("Helvetica-Bold")
            .fontSize(13)
            .fillColor(dark)
            .text("Fee Summary", left, y);

        y += 23;

        const gap = 9;
        const cardWidth = (contentWidth - gap * 2) / 3;
        const cardHeight = 78;

        const feeCards = [
            {
                title: "TOTAL FEES",
                value: money(totalFees),
                bg: "#F8FAFC",
                color: dark
            },
            {
                title: "PAID FEES",
                value: money(paidFees),
                bg: lightGreen,
                color: green
            },
            {
                title: "DUE FEES",
                value: money(dueFees),
                bg: lightRed,
                color: red
            }
        ];

        feeCards.forEach((item, index) => {
            const x = left + index * (cardWidth + gap);

            drawCard(
                x,
                y,
                cardWidth,
                cardHeight,
                item.bg
            );

            doc.font("Helvetica-Bold")
                .fontSize(9)
                .fillColor(gray)
                .text(item.title, x + 5, y + 15, {
                    width: cardWidth - 10,
                    align: "center"
                });

            doc.font("Helvetica-Bold")
                .fontSize(10)
                .fillColor(item.color)
                .text(item.value, x + 3, y + 42, {
                    width: cardWidth - 6,
                    align: "center"
                });
        });

        // ==================================================
        // 5. CURRENT PAYMENT
        // ==================================================

        y += cardHeight + 20;

        if (hasAmount) {
            drawCard(
                left,
                y,
                contentWidth,
                58,
                lightBlue,
                lightBlue
            );

            doc.font("Helvetica-Bold")
                .fontSize(12)
                .fillColor(blue)
                .text("AMOUNT RECEIVED", left + 15, y + 22);

            doc.font("Helvetica-Bold")
                .fontSize(15)
                .fillColor(blue)
                .text(money(amount), left + 170, y + 20, {
                    width: contentWidth - 185,
                    align: "right"
                });

            y += 75;
        }

        // ==================================================
        // 6. PAYMENT INFORMATION
        // ==================================================

        drawCard(
            left,
            y,
            contentWidth,
            42,
            "#F8FAFC"
        );

        doc.font("Helvetica-Bold")
            .fontSize(10)
            .fillColor(dark)
            .text("Receipt Type", left + 14, y + 15);

        doc.font("Helvetica")
            .fontSize(10)
            .fillColor(gray)
            .text(
                hasAmount
                    ? "Payment amount displayed"
                    : "Fee statement",
                left + 120,
                y + 15
            );

        // ==================================================
        // 7. AUTHORIZED SIGNATURE
        // ==================================================

        const signY = y + 90;

        doc.moveTo(right - 165, signY)
            .lineTo(right, signY)
            .strokeColor("#94A3B8")
            .lineWidth(1)
            .stroke();

        doc.font("Helvetica")
            .fontSize(9)
            .fillColor(gray)
            .text(
                "Authorized Signature",
                right - 165,
                signY + 7,
                {
                    width: 165,
                    align: "center"
                }
            );

        // ==================================================
        // 8. FOOTER
        // ==================================================

        doc.moveTo(left, 770)
            .lineTo(right, 770)
            .strokeColor(border)
            .lineWidth(1)
            .stroke();

        doc.font("Helvetica")
            .fontSize(9)
            .fillColor(gray)
            .text(
                "Thank you for choosing our institute!",
                left,
                780,
                {
                    width: contentWidth,
                    align: "center"
                }
            );

        doc.fontSize(8)
            .text(
                "This is a computer-generated receipt.",
                left,
                795,
                {
                    width: contentWidth,
                    align: "center"
                }
            );

        doc.end();

    } catch (error) {
        console.error("Receipt generation error:", error);

        if (!res.headersSent) {
            res.status(500).json({
                message: "Unable to generate receipt"
            });
        } else {
            res.destroy(error);
        }
    }
});


// ==================================================
// START SERVER
// ==================================================

app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});