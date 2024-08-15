const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./connect/database");
const { appointmentRouter } = require("./routes/appointment");
const { clientsRouter } = require("./routes/client");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;
console.log(PORT);
app.use(express.json());
app.use(cors());
app.use("/api/appointment", appointmentRouter);
app.use("/api/clients", clientsRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Servidor ouvindo na porta ${PORT} e disponível em http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "Não foi possível conectar ao banco de dados. O servidor não será iniciado.",
      error
    );
  });
