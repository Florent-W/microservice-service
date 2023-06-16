import mongoose from "mongoose"

mongoose.connect(process.env.URL_DATABASE)
    .then(() => "connected to database")
    .catch(error =>
        console.log({ error })
    )

const serviceSchema = new mongoose.Schema({
    date_start: Date,
    date_fin: Date,
    userId: String,
    title: String,
    price: Number,
    description: String
})

export const ServiceRepository = mongoose.model('Service', serviceSchema)