import { db } from '../database/connection.js';
export const addingTask = async (req, res) => {
  const { text } = req.body;
  const user_id = req.user.id; 

  if (!text || !user_id) {
    return res.status(400).send('Invalid request data');
  }

  const sql = 'INSERT INTO tasks (text, user_id) VALUES (?, ?)';

  try {
    const result = await db.query(sql, [text, user_id]);
    console.log('Task added successfully');
    res.json({ text, completed: false });
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).send('Internal Server Error');
  }
};




export const getAllTasks = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized - Not authenticated' });
  }
  const user_id = req.user.id; 
  const sql = 'SELECT * FROM tasks WHERE user_id = ?';

  db.query(sql, [user_id], function (err, result) {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
};
  export const deleteTask = async (req, res) => {
    const taskId = req.params.id;
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
  

export const updateTask=async (req, res) => {
  const id = req.params.id;
  const completed = Boolean(req.body.completed);
  const sql = `UPDATE tasks SET completed = ? WHERE id = ?`;
  db.query(sql, [completed, id], (err, result) => {
    if (err) {
      return res.status(500).json({message:err});
    }

    db.query(`SELECT * FROM tasks WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return res.status(500).json({message:err});
      }

      return res.json(results[0]);
    });
  });
};



