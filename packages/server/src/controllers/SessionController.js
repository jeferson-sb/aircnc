import User from '../models/User.js'

const store = async (req, res) => {
  const { name, email } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email });
  }
  return res.json(user);
};

export default { store };
