import * as restaurantControllers from "../controllers/restaurant.controllers.js";

import express from "express";
const router = express.Router();

//POST http://localhost:5000/api/v1/restaurant
router.post("/", restaurantControllers.create);

export default router;
