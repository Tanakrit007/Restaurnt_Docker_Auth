import { DataTypes } from "sequelize";
import sequelize from "./db.js";
const Restaurant = sequelize.define("restaurant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoincrement: true,
  },
  nane: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Restaurant.sync({ force: false })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.log("Error creating table", error);
  });
export default Restaurant;
