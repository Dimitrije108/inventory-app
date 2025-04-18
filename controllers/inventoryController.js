const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const lengthErr = 'must be between 1 and 30 characters.';
const numberErr = 'must be higher than 0.';
const yearErr = 'must be a number between 1900 and 2100.';

const validateManufacturer = [
	body('name').trim()
		.isLength({ min: 1, max: 30 }).withMessage(`Manufacturer name ${lengthErr}`)
		.custom(async (value) => {
			const manufacturer = await db.getManufacturerByName(value);
			if (manufacturer) {
				throw new Error('Manufacturer name already exists.');
			}
			return true;
		}),
	body('founded')
		.isInt({ min: 1900, max: 2100 }).withMessage(`Year ${yearErr}`),
	body('owner').trim()
		.optional({ values: 'falsy' })
		.isLength({ min: 1, max: 30 }).withMessage(`Owner name ${lengthErr}`),
];

const validateCar = [
	body('manufacturerId')
		.notEmpty().withMessage('Manufacturer is required.')
		.custom(async (value) => {
			const manufacturer = await db.getManufacturerById(value);
			if (!manufacturer) {
				throw new Error('Selected manufacturer does not exist.');
			}
			return true;
		}),
	body('model').trim()
		.isLength({ min: 1, max: 30 }).withMessage(`Model name ${lengthErr}`),
	body('price')
		.isFloat({ min: 1 }).withMessage(`Price ${numberErr}`),
	body('year')
		.isInt({ min: 1900, max: 2100 }).withMessage(`Year ${yearErr}`),
	body('mileage')
		.optional({ values: 'falsy' })
		.isFloat({ min: 1 }).withMessage(`Mileage ${numberErr}`),
	body('engine').trim()
		.optional({ values: 'falsy' })
		.isLength({ min: 1, max: 30 }).withMessage(`Engine spec ${lengthErr}`),
	body('hp')
		.optional({ values: 'falsy' })
		.isInt({ min: 1 }).withMessage(`Horsepower ${numberErr}`),
];

const getManufacturers = asyncHandler(async (req, res) => {
	const manufacturers = await db.getManufacturers();
	res.render('index', { manufacturers });
});

const getManufacturerCars = asyncHandler(async (req, res) => {
	const manufacturer = await db.getManufacturerByName(req.params.manufacturer);

	if (!manufacturer) {
		res.status(404).send('Manufacturer not found');
		return;
	}

	const cars = await db.getManufacturerCars(manufacturer.name);

	res.render('manufacturer', {
		manufacturer,
		cars
	});
});

const getCar = asyncHandler(async (req, res) => {
	const car = await db.getCarById(req.params.carId);

	if (!car) {
		res.status(404).send('Car not found');
		return;
	}

	res.render('car', { car });
});

const createManufacturerGet = (req, res) => {
	res.render('createManufacturer');
};

const createManufacturerPost = [
	validateManufacturer,
	asyncHandler(async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Return 400 Bad Request because of malformed request
			return res.status(400).render('createManufacturer', {
				errors: errors.array()
			});
		}
		
		const { name, founded, owner }  = req.body;
		await db.insertManufacturer([name, founded, owner]);
		res.redirect('/');
	})
];

const delManufacturerGet = asyncHandler(async (req, res) => {
	const manufacturerName = req.params.manufacturer;
	const cars = await db.getManufacturerCars(manufacturerName);

	if (cars.length > 0) {
		res.send(`Cannot delete ${manufacturerName} - ${cars.length} car(s) depend on it. Reassign or delete cars first.`);
		return;
	}

	await db.delManufacturer(manufacturerName);
	res.redirect('/');
});

const createCarGet = asyncHandler(async (req, res) => {
	const manufacturers = await db.getManufacturers();
	res.render('createCar', {
		selectedManufacturer: req.params.manufacturer,
		manufacturers
	});
});

const createCarPost = [
	validateCar,
	asyncHandler(async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const manufacturers = await db.getManufacturers();
			return res.status(400).render('createCar', {
				selectedManufacturer: req.params.manufacturer,
				manufacturers,
				errors: errors.array()
			})
		}

		const { model, price, year, engine, manufacturerId } = req.body;
		const mileage = req.body.mileage ? parseInt(req.body.mileage) : null;
		const hp = req.body.hp ? parseInt(req.body.hp) : null;

		await db.insertCar([model, price, year, mileage, engine, hp, manufacturerId]);
		res.redirect(`/${req.params.manufacturer}`);
	})
];

const delCar = asyncHandler(async (req, res) => {
	const carId = req.params.carId;
	await db.delCar(carId);
	res.redirect(`/${req.params.manufacturer}`);
});

module.exports = {
	getManufacturers,
	getCar,
	getManufacturerCars,
	createManufacturerGet,
	createManufacturerPost,
	delManufacturerGet,
	createCarGet,
	createCarPost,
	delCar,
};
