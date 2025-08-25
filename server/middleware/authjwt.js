import pkg from "jsonwebtoken";
const { verify } = pkg;
import db from "../model/db.js";
import authconfig from "../config/auth.config.js";
import jwt from "jsonwebtoken";

const user = db.user;
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, authconfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.username = decoded.username;
    next();
  });
};

const IsAdmin = (req, res, next) => {
  user.findOne(req.username).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(401).send({ message: "Require Admin Role!" });
      return;
    });
  });
};

const authjwt = { verifyToken, IsAdmin };
export default authjwt;
