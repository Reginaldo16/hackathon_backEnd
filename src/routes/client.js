const { Router } = require("express");
const {
  createClient,
  getAllClients,
  getClient,
  deleteClient,
  updateClient,
} = require("../controllers/clients-controllers");

const clientsRouter = Router();

clientsRouter.post("/", createClient);
clientsRouter.get("/", getAllClients);
clientsRouter.get("/:id", getClient);
clientsRouter.delete("/:id", deleteClient);
clientsRouter.put("/:id", updateClient);

module.exports = { clientsRouter };
