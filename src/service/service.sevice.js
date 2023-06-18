import { ServiceRepository } from "../repository/service.repository.js"



const getServicesByUser = async (req, res) => {
    const { currentUser } = req

    const services = await ServiceRepository.find({ userId: currentUser })
    res.send({ services })
}

const getService = async (req, res) => {

    const services = await ServiceRepository.find({})
    res.send({ services })
}

const getOneService = async (req, res) => {

    // TODO : si mauvais format ca pete pas tout
    const { currentUser, params } = req
    const service = await ServiceRepository.findOne({ $and: [{ _id: params.id }, { userId: currentUser }] })
    res.send({ service })
}

const createOneService = async (req, res) => {
    const { currentUser } = req
    const currentDate = new Date()
    const { userId = currentUser,
        title = "defautTitle",
        date_fin = currentDate,
        date_start = currentDate,
        description = 'description',
        price = 0 } = req.body
    const service = await ServiceRepository.create({ title, date_fin, date_start, description, price, userId })
    res.status(201).send({ service })
}

const updateOneService = async (req, res) => {
    const { currentUser } = req
    const { id } = req.params
    const body = req.body
    const updatedService = await ServiceRepository.findOneAndUpdate({ $and: [{ _id: req.params.id }, { userId: currentUser }] }, body)
    if (!updatedService) {
        res.send({ message: "Impossible to update Service" })
    } else {
        // TODO : envoyer le service modifié
        res.send({ message: "Service updated succesfully" })
    }
}

const deleteOneService = async (req, res) => {
    const { currentUser } = req
    const { id } = req.params
    const deletedService = await ServiceRepository.findOneAndDelete({ $and: [{ _id: id }, { userId: currentUser }] })
    if (!deletedService) {
        res.send({ message: "Impossible to remove Service" })
    } else {
        res.send({ message: "Service is deleted" })
    }
}

const routeIsNotFound = async (req, res) => {
    res.status(404).send({ message: "Route is not Found" })
}

export { getService, getServicesByUser, getOneService, createOneService, updateOneService, deleteOneService, routeIsNotFound }