import { Router } from "express";
import { registerUsers , loginUsers ,authorizUsers ,logout ,verifyuser} from "../controllers/auth.js";
export const auth = Router(); 
auth.post('/register',registerUsers); 
auth.post('/login',loginUsers );
 auth.get('/auth',verifyuser ,authorizUsers);
auth.get('/logout',logout);
export default auth 
