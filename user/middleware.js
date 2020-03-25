function authorize(req, res, next) {
  if (req.user.dataValues.id !== req.params.userId) {
    return res.status(401).send({ message: "User not authorized" });
  }
  next();
}
module.exports = authorize;
