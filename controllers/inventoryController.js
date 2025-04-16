const db = require('../db/queries');

const manufacturers = [
  { 
		id: 1, 
		name: 'Toyota', 
		founded: 1937, 
		owner: 'Toyota Group'
	},
  { 
		id: 2, 
		name: 'Nissan', 
		founded: 1933, 
		owner: 'Renault' 
	},
];

const cars = [
  { 
		id: 1, 
		model: 'GT-R R34', 
		price: 120990, 
		year: 2001, 
		mileage: 52226, 
		engine: '2.6L Twin-Turbo I6 (RB26DETT)', 
		hp: 280,
		manufacturer_id: 2,
	},
  { 
		id: 2, 
		model: 'Supra', 
		price: 72250, 
		year: 1996, 
		mileage: 76344, 
		engine: '3.0L Twin-Turbo I6 (2JZ-GTE)*', 
		hp: 320,
		manufacturer_id: 1,
	},
];

async function getManufacturers(req, res) {
	const manufacturers = await db.getManufacturers();
	
	res.render('index', {
		manufacturers: manufacturers
	});
};

async function getManufacturerCars(req, res) {
	const manufacturer = await db.getManufacturer(req.params.manufacturer);
	const cars = await db.getManufacturerCars(manufacturer.name);

	res.render('manufacturer', {
		manufacturer: manufacturer,
		cars: cars
	});
};

async function getCar(req, res) {
	const car = await db.getCar(req.params.carId);

	res.render('car', {
		car: car
	});
};

async function createManufacturerGet(req, res) {
	res.render('createManufacturer');
};

async function createManufacturerPost(req, res) {
	// receive form data from req.body
	// validate/sanitize
	// insert into db
	// redirect to /
	res.redirect('/');
};

async function createCarGet(req, res) {
	res.render('createCar');
};

async function createCarPost(req, res) {
	// receive form data from req.body
	// manufacturer_id will come from select input value
	// validate/sanitize
	// insert into db
	// redirect to /:manufacturer where the car was created
};

module.exports = {
	getManufacturers,
	getCar,
	getManufacturerCars,
	createManufacturerGet,
	createManufacturerPost,
	createCarGet,
	createCarPost,
};
