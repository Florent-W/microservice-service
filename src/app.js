import express from "express"
import { ServiceRepository } from "./repository/service.repository.js"
import router from "./controller/service.controller.js"
import errorHandlerMiddleware from "./Error/ErrorHandler.js"

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = process.env.PORT

console.log(process.env.MODE)
/*
const newSevice = ServiceRepository.create({
    date_start : new Date(),
    userId : "userId",
    price : 3,
    date_fin : new Date(),
    title : "new",
    description : "description du service"
})
*/
app.get('/', (req, res) => {
    res.send("Hello world")
})
app.use(router)
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log("Port is open at " + port)
})