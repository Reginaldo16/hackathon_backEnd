const Appointment = require("../models/appointmentModel");

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const findNextAvailableTime = async (date) => {
  const appointmentsOnSameDay = await Appointment.find({ date });

  const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const occupiedTimes = appointmentsOnSameDay.map(
    (appointment) => appointment.time
  );

  const nextAvailableTime = availableTimes.find(
    (time) => !occupiedTimes.includes(time)
  );

  return nextAvailableTime;
};

exports.createAppointment = async (req, res) => {
  try {
    const { name, email, sex, workout, contact, date, time } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Email inválido." });
    }

    const formattedDate = formatDate(date);

    const existingAppointment = await Appointment.findOne({
      date: formattedDate,
      time,
    });
    if (existingAppointment) {
      const nextAvailableTime = await findNextAvailableTime(formattedDate);
      if (nextAvailableTime) {
        return res.status(400).json({
          message: `O horário já está ocupado. O próximo horário disponível é ${nextAvailableTime}.`,
          suggestedTime: nextAvailableTime,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Não há horários disponíveis neste dia." });
      }
    }

    const newAppointment = new Appointment({
      name,
      email,
      sex,
      workout,
      contact,
      date: formattedDate,
      time,
    });
    await newAppointment.save();
    res.status(201).json({
      message: "Marcação feita com sucesso",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Marcação não encontrada" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, sex, workout, contact, date, Time } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { name, email, sex, workout, contact, dateTime },
      { new: true, runValidators: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Marcação não encontrada" });
    }
    res.status(200).json({
      message: "Marcação atualizada com sucesso",
      appointment: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Marcação não encontrada" });
    }
    res.status(200).json({ message: "Marcação apagada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
