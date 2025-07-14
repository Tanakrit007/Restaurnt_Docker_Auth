import Restaurant from "../models/restaurnt.model.js";

// Create and save a new restaurant
export const create = async (req, res) => {
  const { name, type, imageUrl } = req.body;
  // Validate data
  if (!name || !type || !imageUrl) {
    return res
      .status(400)
      .send({ message: "Name, Type or ImageUrl can not be empty!" });
  }
  try {
    const restaurant = await Restaurant.findOne({ where: { name } });
    if (restaurant) {
      return res.status(400).send({ message: "Restaurant already exists!" });
    }
    const newRestaurant = { name, type, imageUrl };
    const data = await Restaurant.create(newRestaurant);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something error while create the restaurant",
    });
  }
};
