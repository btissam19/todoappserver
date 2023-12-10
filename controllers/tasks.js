// models/tasksTable.js
import { db } from '../database/connection.js';

export const addingTask = async (req, res) => {
  const { text, completed } = req.body;
  if (!text || typeof completed !== 'boolean') {
    return res.status(400).send('Invalid request data');
  }

  const sql = 'INSERT INTO tasks (text, completed) VALUES (?, ?)';

  try {
    const result = await db.query(sql, [text, completed]);
    console.log('Task added successfully');
    res.json({ text, completed });
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const getAllTasks = async (req, res) => {
  const sql = 'SELECT * FROM tasks';
    db.query(sql, function (err, result) {
      if (err) throw err;
      else {
        const obj = {print: result};
        console.log(obj);
  
        res.json(obj);
      }
    })
  }
export const deleteTask = async (req, res) => {
  const taskId = req.query.id;
  const sql = 'DELETE FROM tasks WHERE id = ?';

  try {
    const result = await db.query(sql, [taskId]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      console.log('Task deleted successfully');
      res.json({ message: 'Task deleted successfully' });
    }
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateTask = async (req, res) => {
  const taskId = req.query.id;
  const {id, text, completed } = req.body;

  console.log('Update Task Request:', { taskId, text, completed });

  if (!text || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  const sql = 'UPDATE tasks SET text = ?, completed = ? WHERE id = ?';

  try {
    const result = await db.query(sql, [text, completed, taskId]);

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    console.log('Task updated successfully');
    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

