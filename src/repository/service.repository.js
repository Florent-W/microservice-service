import mongoose from "mongoose"

mongoose.connect(process.env.URL_DATABASE)
    .catch(error =>
        console.log({ error })
    )
    .then(() => "connected to database")

const serviceSchema = new mongoose.Schema({
    date_start: Date,
    date_fin: Date,
    userId: String,
    title: String,
    price: Number,
    description: String
})

export const ServiceRepository = mongoose.model('Service', serviceSchema)