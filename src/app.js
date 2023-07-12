import express from "express";
import errorHandlerMiddleware from "./Error/ErrorHandler.js";
import router from "./controller/service.controller.js";
import { connectQueue } from "./receive.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT;
app.use(connectQueue);
app.use(router);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log("Port is open at " + port);
});
