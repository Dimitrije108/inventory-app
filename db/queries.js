const pool = require('./pool');

async function getManufacturers() {
	const { rows } = await pool.query('SELECT * FROM manufacturers');
	return rows;
};

async function getManufacturerByName(name) {
	const { rows } = await pool.query(`
		SELECT * FROM manufacturers
		WHERE manufacturers.name = $1
		`, [name]
	);
	return rows[0] || null;
};

async function getManufacturerById(id) {
	const { rows } = await pool.query(`
		SELECT * FROM manufacturers
		WHERE manufacturers.id = $1
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
		WHERE manufacturers.name = $1
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
		WHERE cars.id = $1
		`, [carId]
	);
	return rows[0] || null;
};

async function insertManufacturer({ name, founded, owner }) {
	await pool.query(`
		INSERT INTO manufacturers
		VALUES
			(DEFAULT, $1, $2, $3)
		`, [name, founded, owner]
	);
};

async function insertCar({ 
	model, 
	price, 
	year, 
	mileage, 
	engine,
	hp, 
	manufacturerId 
}) {
	await pool.query(`
		INSERT INTO cars
		VALUES
			(DEFAULT, $1, $2, $3, $4, $5, $6, $7)
		`, [model, price, year, mileage, engine, hp, manufacturerId]
	);
};

async function updateManufacturer(nameParam, { name, founded, owner }) {
	await pool.query(`
		UPDATE manufacturers
		SET name = $2, founded = $3, owner = $4
		WHERE manufacturers.name = $1
		`, [nameParam, name, founded, owner]
	);
};

async function updateCar(carId, { 
	model, 
	price, 
	year, 
	mileage, 
	engine, 
	hp, 
	manufacturerId 
}) {
	await pool.query(`
		UPDATE cars
		SET model = $2, price = $3, year = $4, mileage = $5, engine = $6, hp = $7, manufacturer_id = $8
		WHERE cars.id = $1
		`, [carId, model, price, year, mileage, engine, hp, manufacturerId]
	);
};

async function delManufacturer(name) {
	await pool.query(`
		DELETE FROM manufacturers 
		WHERE manufacturers.name = $1
		`, [name]
	);
};

async function delCar(id) {
	await pool.query(`
		DELETE FROM cars 
		WHERE cars.id = $1
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
	updateManufacturer,
	updateCar,
	delManufacturer,
	delCar,
};
