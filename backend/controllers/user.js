exports.create = (req, res) => {
  //using postman send some data in json format in body->raw section.
  console.log(req.body);
  res.send({ user: req.body });
};
