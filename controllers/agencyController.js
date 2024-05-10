const Agency = require('../models/Agency');

exports.createAgency = async (req, res) => {
  try {
    const agency = await Agency.create(req.body);
    res.status(201).json(agency);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getAgencyById = async (req, res) => {
  try {
    const agency = await Agency.findById(req.params.id);
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }
    res.status(200).json(agency);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateAgency = async (req, res) => {
  try {
    const agency = await Agency.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }
    res.status(200).json(agency);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAgency = async (req, res) => {
  try {
    const agency = await Agency.findByIdAndDelete(req.params.id);
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }
    res.status(200).json({ message: 'Agency deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
