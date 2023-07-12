import jwtDecode from "jwt-decode";

export const adminMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.send({ message: "Undefined Token" });
    return;
  }
  const decodedToken = await jwtDecode(req.headers.authorization);
  if (!decodedToken?.role || decodedToken?.role != "Admin") {
    res.send({ message: "You are not an admin user" });
    return;
  }

  next();
};
