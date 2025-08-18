import { DataTypes } from "sequelize";
import sequelize from "./db.js";
const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User.sync() จะถูกจัดการโดย db.sequelize.sync() ใน index.js แทน
export default User;