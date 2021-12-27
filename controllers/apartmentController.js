const Apartment = require("../models/Apartment");

//Get all apartments controller
const getAllApartments = async (req, res) => {
  const { limit, q } = req.query;
  const limitRecords = parseInt(limit);

  let query = {};

  if (q) {
    query = { $text: { $search: q } };
  }

  try {
    let getApartments;

    if (limitRecords) {
      getApartments = await Apartment.find(query).limit(limitRecords);
    }
    if (q) {
      getApartments = await Apartment.find(query).sort({
        updatedAt: 1,
      });
    } else {
      getApartments = await Apartment.find().sort({
        updatedAt: 1,
      });
    }
    res.status(200).json(getApartments);
    console.log(query);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//Get single apartment controller
const getApartmentById = async (req, res) => {
  const id = req.params.id;
  try {
    const findApartment = await Apartment.findById(id);
    res.status(200).json(findApartment);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Create apartment controller
const createApartment = async (req, res) => {
  const userID = req.user.uid;
  const newApartment = new Apartment({
    ...req.body,
    userId: userID,
    email: req.user.email,
  });

  try {
    const saveApartment = await newApartment.save();
    res.status(200).json(saveApartment);
  } catch (err) {
    console.log("Error creating apartment", err);
    res.status(500).json(err);
  }
};

//Delete apartment controller
const deleteApartment = async (req, res) => {
  const id = req.params.id;
  const apt = await Apartment.findById(id);

  if (apt.userId === req.user.uid) {
    try {
      await apt.delete();
      res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({ message: "Insufficient permission" });
  }
};

//Update apartment controller
const updateApartment = async (req, res) => {
  const id = req.params.id;
  const apt = await Apartment.findById(id);

  if (apt.userId === req.user.uid) {
    try {
      const updatedApartment = await Apartment.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedApartment);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({ message: "Insufficient permission" });
  }
};

module.exports = {
  getAllApartments,
  getApartmentById,
  createApartment,
  deleteApartment,
  updateApartment,
};
