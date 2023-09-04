const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json({ message: "Não autorizado" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.TOKEN);
    const { id } = data;
    req.userId = id;

    return next();
  } catch {
    return res.json({ message: "Não autorizado" }, 401);
  }
};
