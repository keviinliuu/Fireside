import express from "express";
import cors from "cors";
// import other stuff

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/");

export default app;