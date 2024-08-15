const { Router } = require("express");
const {
  createAppointment,
  getAllAppointments,
  getAppointment,
  deleteAppointment,
  updateAppointment,
} = require("../controllers/appointments-controllers");

const appointmentRouter = Router();

appointmentRouter.post("/", createAppointment);
appointmentRouter.get("/", getAllAppointments);
appointmentRouter.get("/:id", getAppointment);
appointmentRouter.delete("/:id", deleteAppointment);
appointmentRouter.put("/:id", updateAppointment);

module.exports = { appointmentRouter };
