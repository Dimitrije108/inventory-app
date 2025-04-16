const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
// const { body, validationResult } = require('express-validator');

// const validateManufacturer = [

// ];

// const validateCar = [

// ];

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

const createManufacturerPost = asyncHandler(async (req, res) => {
	// receive form data from req.body
	// validate/sanitize
	// insert into db
	// redirect to /
	res.redirect('/');
});

const createCarGet = (req, res) => {
	res.render('createCar');
};

const createCarPost = asyncHandler(async (req, res) => {
	// receive form data from req.body
	// manufacturer_id will come from select input value
	// validate/sanitize
	// insert into db
	// redirect to /:manufacturer where the car was created
});

module.exports = {
	getManufacturers,
	getCar,
	getManufacturerCars,
	createManufacturerGet,
	createManufacturerPost,
	createCarGet,
	createCarPost,
};
