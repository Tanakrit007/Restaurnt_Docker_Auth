import { DataTypes } from "sequelize";
import sequelize from "./db.js";
const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Role.sync() จะถูกจัดการโดย db.sequelize.sync() ใน index.js แทน
export default Role;
