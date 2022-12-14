const Booking = require("../models/booking");

const seed = async (req, res) => {
  const seedBookings = [
    {
      roomUseBy: "NYE Party",
      //user ref removed
      createdBy: "Paul",
      bookingStart: "2022-12-28",
      bookingEnd: "2022-12-31",
      classRoom: 2,
      holiday: false,
      //   cohort: { type: String },
      //   bookingPurpose: { type: String },
    },
    {
      roomUseBy: "New Year's Day",
      //user ref removed
      createdBy: "Paul",
      bookingStart: "2022-12-31",
      bookingEnd: "2023-01-02",
      // classRoom: 2,
      holiday: true,
      //   cohort: { type: String },
    },

    {
      roomUseBy: "PreviousBooking",
      //user ref removed
      createdBy: "Paul",
      bookingStart: "2022-12-20",
      bookingEnd: "2022-12-21",
      classRoom: 6,
      holiday: false,
      //   cohort: { type: String },
    },
  ];
  await Booking.deleteMany({});

  const bookings = await Booking.insertMany(seedBookings);

  res.json(bookings);
};

module.exports = seed;
