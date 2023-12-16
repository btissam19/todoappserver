import { db } from '../database/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { hashingPassword } from '../middleware/utilitis.js';


export const registerUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';

    db.query(checkEmailQuery, [email], async (err, result) => {
      if (err) {
        console.error('Error checking email in users table:', err);
        return res.status(500).json({ Error: 'Internal Server Error' });
      }
      if (result.length > 0) {
        return res.status(400).json({ Error: 'Email already exists' });
      }

      const hashPassword = await hashingPassword(password);
      console.log('Hashed Password:', hashPassword);

      const insertUserQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(insertUserQuery, [name, email, hashPassword], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        } else {
          return res.json({ Status: 'Success' });
        }
      });
    });
  } catch (error) {
    console.error('Error in try-catch block:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginUsers = async (req, res) => {
  try {
    const getUsersQuery = 'SELECT * FROM users WHERE email = ?';

    db.query(getUsersQuery, [req.body.email], (err, data) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ Error: 'Login error in server' });
      }

      if (data.length > 0) {
        bcrypt.compare(req.body.password.toString(), data[0].password, (bcryptErr, response) => {
          if (bcryptErr) {
            console.error('Error comparing passwords:', bcryptErr);
            return res.status(500).json({ Error: 'Compare password error' });
          }

          if (response) {
            const name = data[0].name;
            const token = jwt.sign({ name }, 'jwtsecret', { expiresIn: '1d' });
            res.cookie('token', token);
            return res.status(200).json({ Status: 'Success' });
          } else {
            return res.status(401).json({ Error: 'Password not match' });
          }
        });
      } else {
        return res.status(404).json({ Error: 'Email not found' });
      }
    });
  } catch (error) {
    console.error('Error in loginUsers function:', error);
    res.status(500).json({ Error: 'Internal server error' });
  }
};

 

 export const verifyuser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "you are not authenticated" });
    } else {
        jwt.verify(token, "jwtsecret", (err, decoded) => {
            if (err) {
                console.error("JWT verification error:", err);
                return res.json({ Error: "Token verification failed" });
            } else {
                // Successful verification, proceed with the logic
                req.name = decoded.name;
                next();
            }
        });
        
    }
};
export const authorizUsers=async (req,res)=>{
    const username = req.name;
    res.status(200).json({ Status: 'Success', name:username });
}


export const  logout = (req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"})

}


