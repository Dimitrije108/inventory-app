const { Router } = require('express');
const indexRouter = Router();
const inventoryController = require('../controllers/inventoryController');

indexRouter.get('/new', inventoryController.createCategoryGet);
indexRouter.get('/new', inventoryController.createCategoryPost);

indexRouter.get('/', inventoryController.getCategories);

indexRouter.get('/:category', inventoryController.getCategoryChars);
indexRouter.get('/:category/new', inventoryController.createCharGet);
indexRouter.get('/:category/new', inventoryController.createCharPost);
indexRouter.get('/:category/:itemId', inventoryController.getChar);


module.exports = indexRouter;
