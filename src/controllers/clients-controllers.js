const { isValidObjectId } = require("mongoose");
const Client = require("../models/clientModel");

async function getClient(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "invalid_id" });
    }
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "client_not_found" });
    }
    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching product", error });
  }
}

async function getAllClients(req, res) {
  try {
    const clients = await Client.find();
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching clients", error });
  }
}

async function createClient(req, res) {
  try {
    const { name, email, contact, sex, age, weight } = req.body;

    if (!name || !email || !age || !weight) {
      return res
        .status(400)
        .json({ message: "name_email_age_and_weight_required" });
    }

    const newClient = new Client({
      name,
      email,
      contact,
      sex,
      age,
      weight,
    });

    await newClient.save();

    return res.status(201).json(newClient);
  } catch (error) {
    return res.status(500).json({ message: "Error creating client", error });
  }
}

async function deleteClient(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "invalid_id" });
    }
    const result = await Client.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "client_not_found" });
    }
    return res.status(200).json({ message: "client_deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting client", error });
  }
}

async function updateClient(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "invalid_id" });
    }
    const { name, price, description } = req.body;
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { name, price, description },
      { new: true, runValidators: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: "client_not_found" });
    }
    return res.status(200).json(updatedClient);
  } catch (error) {
    return res.status(500).json({ message: "Error updating client", error });
  }
}

module.exports = {
  getClient,
  createClient,
  getAllClients,
  deleteClient,
  updateClient,
};
