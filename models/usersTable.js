import { db } from "../database/connection.js";

export const createUsersTable=()=>{
    const sql = `
    CREATE TABLE IF NOT EXISTS users(
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;
  db.query(sql,(err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('users table created successfully');
    }
  });
}