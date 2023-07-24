const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
connectDb();
const app = express();

const port = process.env.PORT;
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
