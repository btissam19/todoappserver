import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors'; // Correct import statement

import { db } from "./database/connection.js";
import { createTasksTable } from "./models/tasksTable.js";
import {createUsersTable} from "./models/usersTable.js"
import { tasks } from "./routes/task.js";
import {auth} from "./routes/auth.js";

const port = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', tasks);
app.use('/',auth);



db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
    createTasksTable();
    createUsersTable();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
});

