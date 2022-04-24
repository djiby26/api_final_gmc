const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "DJIBY");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      req.userData = decodedToken;
      next();
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials!" });
  }
};

const checkTokenAndAuthorization = (req, res, next) => {
  checkToken(res, res, () => {
    if (req.userData.userId === req.params.userId || req.userData.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: "You don't have the authorization" });
    }
  });
};

const checkTokenAndAdmin = (req, res, next) => {
  checkToken(req, res, () => {
    if (req.userData.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: "You don't have the authorization" });
    }
  });
};

module.exports = {
  checkToken,
  checkTokenAndAuthorization,
  checkTokenAndAdmin,
};
