import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const adminMiddleware = async (req, res, next) => {

  const token = res.cookie.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided. Unauthorized." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin || !admin.isLoggedIn) {
      return res.status(403).json({ message: "Access denied. Admins only." }); 
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
  

export default adminMiddleware;