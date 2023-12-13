import bcrypt from 'bcrypt';
const slt=10;
export const hashingPassword= (password)=>{
     return  bcrypt.hash(password,slt);
}
// export const comparePassword=()=>{}
