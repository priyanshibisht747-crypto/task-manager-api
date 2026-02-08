const jwt = require("jsonwebtoken");

/*
 AUTH MIDDLEWARE
 - Reads token from Authorization header
 - Verifies JWT
 - Attaches userId to request
*/

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ SINGLE SOURCE OF TRUTH
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateToken;

