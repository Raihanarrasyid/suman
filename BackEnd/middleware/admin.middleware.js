import User from "../models/User.js";
export const verifyAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.isAdmin) {
    req.user.isAdmin = true;
    next();
  } else {
    return res.status(403).json({ message: "Admin resource! Access Denied" });
  }
};
