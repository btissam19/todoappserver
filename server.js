import express from "express";
import bodyParser from "body-parser"; // Import body-parser

import { db } from "./database/connection.js";
import { createTasksTable } from "./models/tasksTable.js";
import { router } from "./routes/task.js";

const port = 4000;
const app = express();

app.use(bodyParser.json()); // Use body-parser middleware for JSON parsing

app.use('/', router);

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
    createTasksTable();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
});
