import db from "../models/index.js";
const User = db.User;
const Role = db.Role;
import bcrypt from "bcryptjs"; //ใช้ในการเข้ารหัสรหัสผ่าน
import jwt from "jsonwebtoken"; //ใช้ในการแลกเปลี่ยนข้อมูลระหว่างเซิร์ฟเวอร์และไคลเอนต์
import authConfig from "../config/auth.config.js"; //ใช้ในการเก็บคีย์ลับสำหรับการเข้ารหัส JWT
import { Op } from "sequelize"; //ใช้ในการจัดการกับการค้นหาข้อมูลในฐานข้อมูล

const authController = {};

authController.signup = async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) {
    res
      .status(400)
      .send({ message: "Username, Name, Email or Password can not be empty!" });
    return;
  }
  // Select * from user where username = username
  await User.findOne({ where: { username } }).then((user) => {
    if (user) {
      res.status(400).send({ message: "Username already exists!" });
      return;
    }

    const newUser = {
      username,
      name,
      email,
      password: bcrypt.hashSync(password, 8), // เข้ารหัสรหัสผ่านด้วย bcrypt
    };
    User.create(newUser)
      .then((user) => {
        // send roles in reqiest body [ADMIN]
        if (req.body.roles) {
          // Select * from role where name = role1 OR name = role2
          Role.findAll({
            where: {
              name: { [Op.or]: req.body.roles },
            },
          }).then((roles) => {
            if (roles.length === 0) {
              res.status(400).send({ message: "Role not found!" });
              return;
            }
            user.setRoles(roles).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          });
        } else {
          user.setRoles([1]).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: error.message || "Something error while create the user",
        });
      });
  });
};

authController.sigIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ message: "Username or Password ห้ามมีตัวใดว่าง" });
    return;
  }
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(404).send({ message: "Username not found!" });
      return;
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      res.status(401).send({ message: "Invalid Password!" });
      return;
    }
    //validate user
    const token = jwt.sign({ username: user.username }, authConfig.secret, {
      expiresIn: 86400,
    }); //หมดอายุภายใน 24 ชม.

    const authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }
    res.send({
      token: token,
      authorities: authorities,
      userInFo: {
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something error while sign in the user",
    });
  }
};

export default authController;
