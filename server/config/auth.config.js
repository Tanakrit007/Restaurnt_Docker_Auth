import dotenv from "dotenv";
dotenv.config();

const authConfig = {
  secret: process.env.secret, // ต้องตั้งค่าใน .env เช่น: secret=my-secret-key
};

export default authConfig;
