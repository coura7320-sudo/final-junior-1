const jwt = require("jsonwebtoken");

// vérifier token
exports.auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json("No token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json("Invalid token");
  }
};

// vérifier admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json("Access denied");
  }
  next();
};