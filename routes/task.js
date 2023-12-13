import { Router } from "express";
import { addingTask, getAllTasks, deleteTask , updateTask} from "../controllers/tasks.js";

export const tasks = Router(); 

tasks.post('/addTask', addingTask); 
tasks.get('/getAllTasks', getAllTasks);
tasks.delete('/deleteTask/:id', deleteTask);
tasks.patch('/updatetask/:id',updateTask) 

export default tasks; 
