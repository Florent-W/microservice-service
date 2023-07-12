import jwt_decode from "jwt-decode";
import { currentUser } from "../api/authentification.microservice.js";

const getDecodedToken = (bearerToken) => {
  if (bearerToken) {
    return jwt_decode(bearerToken);
  }

  return false;
};

export const authMiddleWare = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  const decodedToken = await getDecodedToken(bearerToken);
  if (decodedToken) {
    const { user } = decodedToken;
    const current = await currentUser(user, bearerToken);
    if (current.status === 403) {
      res.status(403).send({ message: "Forbidden : User is not connected" });
    } else {
      req.currentUser = current.data.user.id;
      next();
    }
  } else {
    res.status(403).send({ message: "Token is undefined" });
  }
};
