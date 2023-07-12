import amqplib from "amqplib";
import { deleteAllServiceByUserId } from "./service/service.sevice.js";
export let qContent;

export const connectQueue = async (res, req, next) => {
  const queue = "queue";
  let channel, connection; //global variables
  connection = await amqplib.connect("amqp://localhost:5672");
  channel = await connection.createChannel();
  console.log("success");

  await channel.assertQueue(queue);
  await channel.consume(queue, async (data) => {
    qContent = Buffer(data?.content).toString("utf-8");
    qContent = JSON.parse(qContent);

    switch (qContent.operation) {
      case "delete":
        deleteAllServiceByUserId(qContent?.userId);
        break;

      default:
        break;
    }
  });

  next();
};
