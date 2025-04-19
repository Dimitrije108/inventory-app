const { Router } = require('express');
const inventoryController = require('../controllers/inventoryController');
const indexRouter = Router();

indexRouter.get('/add-manufacturer', inventoryController.createManufacturerGet);
indexRouter.post('/add-manufacturer', inventoryController.createManufacturerPost);

indexRouter.get('/:manufacturer/del', inventoryController.delManufacturerGet);

indexRouter.get('/:manufacturer/update', inventoryController.updateManufacturerGet);
indexRouter.put('/:manufacturer/update/:id', inventoryController.updateManufacturerPut);

indexRouter.get('/:manufacturer/add-car', inventoryController.createCarGet);
indexRouter.post('/:manufacturer/add-car', inventoryController.createCarPost);

indexRouter.get('/:manufacturer/:carId/update', inventoryController.updateCarGet);
indexRouter.put('/:manufacturer/:carId/update', inventoryController.updateCarPut);

indexRouter.get('/:manufacturer/:carId', inventoryController.getCar);
indexRouter.get('/:manufacturer/:carId/del', inventoryController.delCar);

indexRouter.get('/:manufacturer', inventoryController.getManufacturerCars);

indexRouter.get('/', inventoryController.getManufacturers);

module.exports = indexRouter;
