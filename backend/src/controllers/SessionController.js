const User = require('../models/User');

const store = async (req, res) => {
  const { name, email } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email });
  }
  return res.json(user);
};

module.exports = { store };
