import restaurantController from "../controllers/restaurant.controller.js";
import express from "express";
const router = express.Router();

// POST http://localhost:5000/api/v1/restaurant
router.post("/", restaurantController.restaurantCreate);

// GET http://localhost:5000/api/v1/restaurant
router.get("/", restaurantController.getAllRestaurants);

// GET http://localhost:5000/api/v1/restaurant/:id
router.get("/:id", restaurantController.getRestaurantById);

// PUT http://localhost:5000/api/v1/restaurant/:id
router.put("/:id", restaurantController.UpdateRestaurant);

// DELETE http://localhost:5000/api/v1/restaurant/:id
router.delete("/:id", restaurantController.deleteRestaurant);

export default router;
