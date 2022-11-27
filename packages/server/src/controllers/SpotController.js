import User from '../models/User.js'
import Spot from '../models/Spot.js'

const index = async (req, res) => {
  const { tech } = req.query;

  if (!tech) {
    return res
      .status(400)
      .send({ error: 'Unable to list spots, tech not found' });
  }
  const spots = await Spot.find({ techs: tech });
  if (!spots.length) {
    return res.status(404).send({ msg: 'No spots found' });
  }

  return res.json(spots);
};

const store = async (req, res) => {
  const { filename } = req.file;
  const { company, techs, price } = req.body;
  const { user_id } = req.headers;

  const user = await User.findById(user_id);
  if (!user) {
    return res.status(400).send({ error: 'User does not exists' });
  }

  const spot = await Spot.create({
    user: user_id,
    thumbnail: filename,
    company,
    techs: techs.split(',').map(tech => tech.trim()),
    price
  });

  return res.json(spot);
};

export default { index, store };
