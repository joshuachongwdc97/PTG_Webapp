const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const invoiceRoutes = require("./routes/invoice-routes");
const drvProgramRoutes = require("./routes/drvProgram-routes");
const drvTypeRoutes = require("./routes/drvType-routes");
const systemRoutes = require("./routes/system-routes");
const testRoutes = require("./routes/test-routes");
const qualRoutes = require("./routes/qual-routes");
const driveRoutes = require("./routes/drive-routes");
const jobRoutes = require("./routes/job-routes");

const app = express();

const HttpError = require("./models/http-error");

// Middlewares
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/invoice", invoiceRoutes);
app.use("/api/drvProgram", drvProgramRoutes);
app.use("/api/system", systemRoutes);
app.use("/api/test", testRoutes);
app.use("/api/qual", qualRoutes);
app.use("/api/drvType", drvTypeRoutes);
app.use("/api/drive", driveRoutes);
app.use("/api/job", jobRoutes);

// Path Not Existant Error
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

// Default Error Handling
app.use((error, req, res, next) => {
  //check if any response sent
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An Unknown error occured" });
});

mongoose
  .connect("mongodb://localhost:27017/ptg_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to Database");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
