import express from "express";
import cors from "cors";
// import trips from "./api/trips.route.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// const tripsRouter = require('./api/trips.route.js');

// app.use("/api/v1/trips", tripsRouter);
app.use("*", (req, res) => res.status(404).json({ error: "Oops. Looks like you took a wrong turn somewhere!"}));

export default app;