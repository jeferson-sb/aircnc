import Booking from '../models/Booking.js'

const store = async (req, res) => {
  const { booking_id } = req.params;
  const { user_id } = req.headers;
  const booking = await Booking.findOne({
    $and: [{ _id: booking_id }, { user: user_id }]
  }).populate('spot');

  if (!booking) {
    return res
      .status(400)
      .send({ error: 'Unable to approve book, owner not found' });
  }

  booking.approved = true;
  await booking.save();

  const bookingUserSocket = req.connectedUsers[booking.user];

  if (bookingUserSocket) {
    req.io.to(bookingUserSocket).emit('booking_response', booking);
  }

  return res.json(booking);
};

export default { store };
