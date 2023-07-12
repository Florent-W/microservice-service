import mongoose, { Schema } from "mongoose";

mongoose
  .connect(process.env.URL_DATABASE)
  .catch((error) => console.log({ error }))
  .then(() => "connected to database");

const serviceSchema = new mongoose.Schema({
  date_start: Date,
  date_fin: Date,
  userId: String,
  title: String,
  price: {
    type: Number,
    min: 0,
  },
  description: String,
  commande: [
    {
      _id: String,
      status: String,
      buyerId: String,
    },
  ],
});

export const ServiceRepository = mongoose.model("Service", serviceSchema);
