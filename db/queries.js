const pool = require('./pool');

async function getManufacturers() {
	const { rows } = await pool.query('SELECT * FROM manufacturers');
	return rows;
};

async function getManufacturerByName(name) {
	const { rows } = await pool.query(`
		SELECT * FROM manufacturers
		WHERE manufacturers.name = ($1)
		`, [name]
	);
	return rows[0] || null;
};

async function getManufacturerById(id) {
	const { rows } = await pool.query(`
		SELECT * FROM manufacturers
		WHERE manufacturers.id = ($1)
		`, [id]
	);
	return rows[0] || null;
};
// Get all cars from a specific manufacturer
async function getManufacturerCars(name) {
	const { rows } = await pool.query(`
		SELECT 
			cars.*,
			manufacturers.name AS manufacturer_name
		FROM cars 
		JOIN manufacturers ON cars.manufacturer_id = manufacturers.id 
		WHERE manufacturers.name = ($1)
		`, [name]
	);
	return rows;
};

async function getCarById(carId) {
	const { rows } = await pool.query(`
		SELECT 
			cars.*,
			manufacturers.name AS manufacturer_name
		FROM cars 
		JOIN manufacturers ON cars.manufacturer_id = manufacturers.id
		WHERE cars.id = ($1)
		`, [carId]
	);
	return rows[0] || null;
};

async function insertManufacturer(data) {
	await pool.query(`
		INSERT INTO manufacturers
		VALUES
			(DEFAULT, $1, $2, $3)
		`, [...data]
	);
};

async function insertCar(data) {
	await pool.query(`
		INSERT INTO cars
		VALUES
			(DEFAULT, $1, $2, $3, $4, $5, $6, $7)
		`, [...data]
	);
};

async function delManufacturer(name) {
	await pool.query(`
		DELETE FROM manufacturers 
		WHERE manufacturers.name = ($1)
		`, [name]
	);
};

async function delCar(id) {
	await pool.query(`
		DELETE FROM cars 
		WHERE cars.id = ($1)
		`, [id]
	);
};

module.exports = {
	getManufacturers,
	getManufacturerByName,
	getManufacturerById,
	getManufacturerCars,
	getCarById,
	insertManufacturer,
	insertCar,
	delManufacturer,
	delCar,
};
