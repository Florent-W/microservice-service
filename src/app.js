import express from "express"
import errorHandlerMiddleware from "./Error/ErrorHandler.js"
import router from "./controller/service.controller.js"

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send("Hello world")
})
app.use(router)
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log("Port is open at " + port)
})