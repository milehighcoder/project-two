const { TimeEntry } = require("../models");

const dayOfTheWeek = (date) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[new Date(date).getDay()];
};

const saveTimeEntry = async (req, res) => {
  try {
    const { start_timestamp, end_timestamp } = req.body;
    const UserId = req.user.id;
    console.log("UserId", UserId);
    await TimeEntry.create({ start_timestamp, end_timestamp, UserId });
    return res.status(201).send({ message: "Time posted successfully!" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUserWeek = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId", userId);
    const records = await TimeEntry.findAll({
      where: {
        userId,
      },
    });
    // Step 1 - Filter all the Records for this Week
    const today = new Date(); // get today's date
    const firstDayOfCurrentWeek = today.getDate() - today.getDay(); // firstDayOfCurrentWeek day is the day of the month - the day of the week
    const lastDayOfCurrentWeek = firstDayOfCurrentWeek + 6; // lastDayOfCurrentWeek day is the first day + 6

    const weekStartTimeStamp = new Date(
      today.setDate(firstDayOfCurrentWeek)
    ).setHours(0, 0, 0, 0);
    const weekEndTimeStamp = new Date(
      today.setDate(lastDayOfCurrentWeek)
    ).setHours(23, 59, 59, 999);

    const recordInTheWeek = records
      .filter(
        (record) =>
          new Date(record.start_timestamp).getTime() > weekStartTimeStamp &&
          new Date(record.end_timestamp).getTime() < weekEndTimeStamp
      )
      .sort((a, b) => a.start_timestamp - b.start_timestamp);

    // Step 2 - Group Records for a particular day
    const weekSchedule = recordInTheWeek.reduce((acc, item) => {
      const dayOfTheWeekForItem = dayOfTheWeek(item.start_timestamp);
      const duration =
        (new Date(item.end_timestamp).getTime() -
          new Date(item.start_timestamp).getTime()) /
        (1000 * 60 * 60);
      if (acc[dayOfTheWeekForItem]) {
        acc[dayOfTheWeekForItem].push(duration);
      } else {
        acc[dayOfTheWeekForItem] = [duration];
      }
      return acc;
    }, {});

    // Step 3 - Aggregate the Duration for that particular day
    Object.keys(weekSchedule).forEach(
      (day) =>
        (weekSchedule[day] = weekSchedule[day].reduce(
          (acc, item) => +parseFloat(acc + item).toFixed(2),
          0
        ))
    );

    return res.status(200).send(weekSchedule);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const populateEntries = async (req, res) => {
  try {
    const { body } = req;
    const createPromises = body.map((data) => TimeEntry.create(data));
    await Promise.all(createPromises);
    return res.status(200).send({ message: "Imported Successfully" });
  } catch ({ message }) {
    return res.status(500).send({ message });
  }
};

module.exports = {
  saveTimeEntry,
  getUserWeek,
  populateEntries,
};
