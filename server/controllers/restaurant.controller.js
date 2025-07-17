import Restaurant from "../models/restaurnt.model.js";
const restaurantController = {};
// Create and save a new restaurant
restaurantController.create = async (req, res) => {
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
//get all restaurants
restaurantController.getAll = async (req, res) => {
  await Restaurant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error while retrieving restaurants",
      });
    });
};

//get restaurant by id
restaurantController.getById = async (req, res) => {
  const id = req.params.id;
  await Restaurant.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "no found restaurant with id" + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error while getting restaurant id" + id,
      });
    });
};

// Update a restaurant by id
restaurantController.update = async (req, res) => {
  const id = req.params.id;
  const { name, type, imageUrl } = req.body;
  // Validate data
  if (!name && !type && !imageUrl) {
    res.status(400).send({ message: "Name, Type, ImageUrl can not be empty" });
    return;
  }
  await Restaurant.update({ name, type, imageUrl }, { where: { id } }).then(
    (num) => {
      if (num[0] === 1) {
        res.send({ message: "Restaurant updated successfully." });
      } else {
        res.send({
          message:
            "can not update restaurant with id " +
            id +
            ". Maybe restaurant was not found or req.body is empty!",
        });
      }
    }
  );
};

//Delete a restaurant by id
restaurantController.deleteById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).send({ message: "Id is missing" });
    return;
  }
  await Restaurant.destroy({
    where: { id },
  }).then((num) => {
    if (num === 1) {
      res.send({ message: "Restaurant was deleted successfully!" });
    } else {
      res.status(404).send({
        message:
          "Cannot delete restaurant with id=${id}. Maybe it was not found!",
      });
    }
  });
};
export default restaurantController;
