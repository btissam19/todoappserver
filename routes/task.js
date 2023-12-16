import { Router } from "express";
// Import the verifyuser middleware
import { verifyuser } from '../controllers/auth.js';
import { addingTask, getAllTasks, deleteTask , updateTask} from "../controllers/tasks.js";

export const tasks = Router(); 

tasks.post('/addTask',verifyuser,addingTask); 
tasks.get('/getAllTasks',verifyuser, getAllTasks);
tasks.delete('/deleteTask/:id',verifyuser, deleteTask);
tasks.patch('/updatetask/:id',verifyuser,updateTask) 

export default tasks; 
