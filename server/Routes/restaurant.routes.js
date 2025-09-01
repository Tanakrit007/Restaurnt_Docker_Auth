import restaurantController from "../controllers/restaurant.controllers.js";
import express from "express";
import authJwt from "../middleware/authjwt.js"; // ✅ แก้ path + case

const router = express.Router();

// POST http://localhost:5000/api/v1/restaurants
router.post("/", restaurantController.restaurantCreate);

// GET http://localhost:5000/api/v1/restaurants
router.get("/", restaurantController.getAllRestaurants);

// GET http://localhost:5000/api/v1/restaurants/:id
router.get(
  "/:id",
  authJwt.verifyToken,
  authJwt.IsAdmin,
  restaurantController.getRestaurantById
);

// PUT http://localhost:5000/api/v1/restaurants/:id
router.put("/:id", authJwt.verifyToken, restaurantController.UpdateRestaurant);

// DELETE http://localhost:5000/api/v1/restaurants/:id
router.delete(
  "/:id",
  authJwt.verifyToken,
  authJwt.IsAdmin, // ✅ ใช้ isAdmin ไม่ใช่ IsAdmin
  restaurantController.deleteRestaurant
);

export default router;
