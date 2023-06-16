import { currentUser } from "../api/authentification.microservice.js";
import { ServiceRepository } from "../repository/service.repository.js"
import jwt_decode from "jwt-decode";

const getUserId = (req)=> {
    const bearerToken = req.headers.authorization
    console.log(bearerToken)
    return jwt_decode(bearerToken)
}

const getServicesByUser = async (req, res)=> {
    const services = await ServiceRepository.find()
    const bearerToken = req.headers.authorization
    const userId = await getUserId(req)

    const user = await currentUser(1, bearerToken)
    console.log(user)
    res.send({services})
}

const getOneService = async (req, res)=> {
    const {id}=req.params
    const service = await ServiceRepository.findById(id)
    res.send({service})
}

const createOneService = async (req, res)=> {
    const currentDate = new Date()
    const {userId = "userID", 
    title = "defautTitle",
    date_fin= currentDate,
    date_start = currentDate,
    description = 'description',
    price = 0} = req.body
    const service = await ServiceRepository.create({title, date_fin, date_start, description, price, userId})
    res.status(201).send({service})
}

const updateOneService = async (req, res)=> {
    const {id}=req.params
    const body = req.body
    const service = await ServiceRepository.findByIdAndUpdate( id, {...body})
    res.send({service})
}

const deleteOneService = async (req, res)=> {
    const {id}=req.params
    const service = await ServiceRepository.findByIdAndDelete(id)
    res.status(202).send({message: "Successful delete", id})
}

export {getServicesByUser as getServicesByUser, getOneService, createOneService, updateOneService, deleteOneService}