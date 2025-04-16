const pool = require('./pool');

async function getManufacturers() {
	const { rows } = await pool.query('SELECT * FROM manufacturers');
	return rows || null;
};

async function getManufacturer(manufacturer) {
	const { rows } = await pool.query(`
		SELECT * FROM manufacturers
		WHERE manufacturers.name = ($1)
		`, [manufacturer]
	);
	return rows || null;
};
// Get all cars from a specific manufacturer
async function getManufacturerCars(manufacturer) {
	const { rows } = await pool.query(`
		SELECT 
			cars.*,
			manufacturers.name AS manufacturer_name
		FROM cars 
		JOIN manufacturers ON cars.manufacturer_id = manufacturers.id 
		WHERE manufacturers.name = ($1)
		`, [manufacturer]
	);
	return rows || null;
};

async function getCar(carId) {
	const { rows } = await pool.query(`
		SELECT 
			cars.*,
			manufacturers.name AS manufacturer_name
		FROM cars 
		JOIN manufacturers ON cars.manufacturer_id = manufacturers.id
		WHERE cars.id = ($1)
		`, [carId]
	);
	return rows || null;
};

async function insertManufacturer(data) {
	const { rows } = await pool.query(`
		INSERT INTO manufacturers
		VALUES
			(DEFAULT, $1, $2, $3)
		`, [...data]
	);
	return rows || null;
};

async function insertCar(data) {
	const { rows } = await pool.query(`
		INSERT INTO cars
		VALUES
			(DEFAULT, $1, $2, $3, $4, $5, $6, $7)
		`, [...data]
	);
	return rows || null;
};

module.exports = {
	getManufacturers,
	getManufacturer,
	getManufacturerCars,
	getCar,
	insertManufacturer,
	insertCar,
};
