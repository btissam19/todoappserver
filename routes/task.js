import { Router } from "express";
import { addingTask, getAllTasks, deleteTask , updateTask} from "../controllers/tasks.js";

export const router = Router(); 

router.post('/addTask', addingTask); 
router.get('/getAllTasks', getAllTasks);
router.delete('/deleteTask/:id', deleteTask);
router.patch('/updatetask/:id',updateTask) 

export default router; 
