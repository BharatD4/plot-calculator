const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { calculate, savePlot, getMyPlots, deletePlot } = require('../controllers/plotController');

router.post('/calculate', calculate);          // public
router.post('/save', auth, savePlot);           // login required
router.get('/my-plots', auth, getMyPlots);       // login required
router.delete('/:id', auth, deletePlot);         // login required

module.exports = router;
