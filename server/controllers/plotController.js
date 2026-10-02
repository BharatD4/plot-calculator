const Plot = require('../models/Plot');
const { calculateArea, calculatePerimeter, convertUnits } = require('../utils/geoCalculations');

// Bina save kiye sirf calculate karna
exports.calculate = (req, res) => {
  try {
    const { corners } = req.body;
    if (!corners || corners.length < 3) {
      return res.status(400).json({ error: 'Kam se kam 3 corners chahiye' });
    }
    const areaSqMeters = calculateArea(corners);
    const perimeterMeters = calculatePerimeter(corners);
    const units = convertUnits(areaSqMeters);

    res.json({ areaSqMeters, perimeterMeters, units });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Plot save karna (login required)
exports.savePlot = async (req, res) => {
  try {
    const { plotName, corners } = req.body;
    const areaSqMeters = calculateArea(corners);
    const perimeterMeters = calculatePerimeter(corners);

    const plot = await Plot.create({
      userId: req.userId,
      plotName,
      corners,
      areaSqMeters,
      perimeterMeters
    });
    res.status(201).json(plot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyPlots = async (req, res) => {
  const plots = await Plot.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(plots);
};

exports.deletePlot = async (req, res) => {
  await Plot.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Deleted' });
};
