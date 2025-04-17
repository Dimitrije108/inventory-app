const { Router } = require('express');
const inventoryController = require('../controllers/inventoryController');
const indexRouter = Router();

indexRouter.get('/add-manufacturer', inventoryController.createManufacturerGet);
indexRouter.post('/add-manufacturer', inventoryController.createManufacturerPost);

indexRouter.get('/', inventoryController.getManufacturers);

indexRouter.get('/:manufacturer', inventoryController.getManufacturerCars);
indexRouter.get('/:manufacturer/add-car', inventoryController.createCarGet);
indexRouter.post('/:manufacturer/add-car', inventoryController.createCarPost);
indexRouter.get('/:manufacturer/:carId', inventoryController.getCar);

module.exports = indexRouter;
