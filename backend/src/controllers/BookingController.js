const Booking = require('../models/Booking');
const Spot = require('../models/Spot');
const User = require('../models/User');

const store = async (req, res) => {
  const { user_id } = req.headers;
  const { spot_id } = req.params;
  const { date } = req.body;

  const spotExists = await Spot.findOne({
    $and: [{ _id: spot_id }, { user: { $ne: user_id } }]
  });

  if (!spotExists) {
    return res
      .status(404)
      .send({ error: 'Unable to book spot, spot not found' });
  }

  const booking = await Booking.create({
    user: user_id,
    spot: spot_id,
    date
  });

  await booking
    .populate('spot')
    .populate('user')
    .execPopulate();

  const ownerSocket = req.connectedUsers[booking.spot.user];

  if (ownerSocket) {
    req.io.to(ownerSocket).emit('booking_request', booking);
  }

  return res.json(booking);
};

module.exports = { store };
