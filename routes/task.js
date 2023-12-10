import { Router } from "express";
import { addingTask, getAllTasks, deleteTask , updateTask} from "../controllers/tasks.js";

export const router = Router(); // Create a new instance of the Router

router.post('/addTask', addingTask); // Use the router instance to define the route
router.get('/getAllTasks', getAllTasks);
router.delete('/deleteTask/:id', deleteTask);
router.put('/updatetask/:id',updateTask) 

export default router; // Export the router instance
