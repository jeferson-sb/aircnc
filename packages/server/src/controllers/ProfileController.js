import Spot from '../models/Spot.js'
import User from '../models/User.js'

const show = async (req, res) => {
  const { user_id } = req.headers;
  const userExists = await User.find({ user: user_id });
  if (!userExists) {
    return res.status(404).send({ error: 'User not found' });
  }
  const spots = await Spot.find({ user: user_id });

  return res.json(spots);
};

export default { show };
