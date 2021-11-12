const router = require ('express').Router();
const apartmentController = require('../controllers/apartmentController');
const middleware = require('../middlewares');

//Get all apartments
router.get('/', apartmentController.getAllApartments)

//Get a single apartment
router.get('/:id', apartmentController.getApartmentById)

router.use(middleware.decodeToken)

//Post an apartment
router.post('/',  apartmentController.createApartment)

//Delete an apartment
router.delete('/:id', apartmentController.deleteApartment)

//Update an apartment
router.put('/:id', apartmentController.updateApartment)

module.exports = router;