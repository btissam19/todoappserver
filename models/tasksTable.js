import { db } from "../database/connection.js"

export const createTasksTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      text VARCHAR(255) NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT false,
      user_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
  // Rest of your code remains the sa
  db.query(sql,(err) => {
    if (err) {
      console.error('Error creating tasks table:', err);
    } else {
      console.log('Tasks table created successfully');
    }
  });
}