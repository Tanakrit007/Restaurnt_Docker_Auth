import express from "express";
import dotenv from "dotenv";
import restaurantRoutes from "./Routes/restaurant.routes.js";
import authRoutes from "./Routes/auth.routes.js";
import cors from "cors";
import db from "./model/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173", FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ฟังก์ชันนี้ใช้สำหรับสร้างตารางและ seed ข้อมูล roles
const initializeDatabase = async () => {
  try {
    // ✅ สร้างตารางทั้งหมด (ถ้าไม่มี) และ sync models
    await db.sequelize.sync({ alter: true }); // ใช้ alter: true ใน dev, เปลี่ยน schema ได้แบบไม่ลบข้อมูล

    console.log("✅ Database synchronized");

    const Role = db.Role;

    // ✅ เช็กก่อนว่ามี role แล้วหรือยัง
    const count = await Role.count();
    if (count === 0) {
      await Role.bulkCreate([
        { name: "user" },
        { name: "moderator" },
        { name: "admin" },
      ]);
      console.log("✅ Default roles created");
    }
  } catch (error) {
    console.error("❌ Database initialization error:", error);
  }
};

app.get("/", (req, res) => {
  res.send("🍽️ Restaurant Useful API");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);

// ✅ ตั้ง route
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/auth", authRoutes);

// ✅ เริ่มรันเซิร์ฟเวอร์หลังจาก initialize DB แล้ว
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});
