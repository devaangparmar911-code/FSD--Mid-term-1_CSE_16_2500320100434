const express = require("express");

const app = express();
const PORT = 3000;
const students = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, This server is running thankyou");
});

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((record) => record.id === id);

  if (!student) {
    return res.status(404).json({ error: `Student with id ${req.params.id} not found.` });
  }

  return res.json(student);
});

app.post("/api/students", (req, res) => {
  const { id, name, email, course, age } = req.body ?? {};

  if (
    !Number.isInteger(id) ||
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof email !== "string" ||
    email.trim() === "" ||
    typeof course !== "string" ||
    course.trim() === "" ||
    !Number.isInteger(age) ||
    age <= 0
  ) {
    return res.status(400).json({
      error: "Student must include an integer id, name, email, course, and positive integer age.",
    });
  }

  if (students.some((student) => student.id === id)) {
    return res.status(409).json({ error: `Student with id ${id} already exists.` });
  }

  const student = { id, name: name.trim(), email: email.trim(), course: course.trim(), age };
  students.push(student);

  return res.status(201).json(student);
});

app.listen(PORT, () => {
  console.log(`Student records server listening on port ${PORT}`);
});
