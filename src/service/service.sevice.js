import { qContent } from "../receive.js";
import { ServiceRepository } from "../repository/service.repository.js";

const getServicesByUser = async (req, res) => {
  const { currentUser } = req;

  const services = await ServiceRepository.find({ userId: currentUser });
  res.send({ services });
};

const getService = async (req, res) => {
  const services = await ServiceRepository.find({});
  res.send({ services });
};

const getOneService = async (req, res) => {
  // TODO : si mauvais format ca pete pas tout
  const { params } = req;
  const service = await ServiceRepository.findById(params.id);
  res.send({ service });
};

const createOneService = async (req, res) => {
  const { currentUser } = req;
  const currentDate = new Date();
  const {
    title = "defautTitle",
    date_fin = currentDate,
    date_start = currentDate,
    description = "description",
    price = 0,
  } = req.body;
  const service = await ServiceRepository.create({
    title,
    date_fin,
    date_start,
    description,
    price,
    userId: currentUser,
  });
  res.status(201).send({ service });
};

const updateOneService = async (req, res) => {
  const { currentUser } = req;
  const { id } = req.params;
  const body = req.body;
  const updatedService = await ServiceRepository.findOneAndUpdate(
    { $and: [{ _id: req.params.id }, { userId: currentUser }] },
    body
  );
  if (!updatedService) {
    res.send({ message: "Impossible to update Service" });
  } else {
    res.send({ message: "Service updated succesfully" });
  }
};

const deleteOneService = async (req, res) => {
  const { currentUser } = req;
  const { id } = req.params;
  const deletedService = await ServiceRepository.findOneAndDelete({
    $and: [{ _id: id }, { userId: currentUser }],
  });
  if (!deletedService) {
    res.send({ message: "Impossible to remove Service" });
  } else {
    res.send({ message: "Service is deleted" });
  }
};

const routeIsNotFound = async (req, res) => {
  res.status(404).send({ message: "Route is not Found" });
};

const addOneCommande = async (req, res) => {
  const { id } = req.params;
  const updatedService = await ServiceRepository.findByIdAndUpdate(id, {
    $push: {
      commande: {
        _id: req.body.id,
        status: "finished",
      },
    },
  });
  if (!updatedService) {
    res.send({ message: "Impossible to update Service" });
  } else {
    res.send({ message: "Service updated succesfully" });
  }
};

const cancelOneCommande = async (req, res) => {
  const { id } = req.params;

  const upadatedService = await ServiceRepository.findById(id);
  console.log({ commandeId: req.body.id });
  const commande = upadatedService.commande.find(
    (commande) => commande._id === req.body.id
  );
  if (!commande) {
    res.status(404).send({ message: "commande introuvale" });
  }
  if (commande.status === "cancel") {
    res.send({ message: "command is already canceled" });
  }
  commande.status = "cancel";
  upadatedService.save();

  res.send(upadatedService);
};

const deleteAllServiceByUserId = async (userId) => {
  console.log(userId);
  const deleteAll = await ServiceRepository.deleteMany({
    userId: qContent?.userId | userId,
  });

  console.log(deleteAll);
};

export {
  getService,
  getServicesByUser,
  getOneService,
  createOneService,
  updateOneService,
  deleteOneService,
  routeIsNotFound,
  addOneCommande,
  cancelOneCommande,
  deleteAllServiceByUserId,
};
