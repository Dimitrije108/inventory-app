require('dotenv').config();
const { Client } = require('pg');

const SQL = `
	CREATE TABLE IF NOT EXISTS manufacturers (
		id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name VARCHAR ( 255 ) UNIQUE NOT NULL,
		founded INT,
		owner VARCHAR ( 255 )
	);

	CREATE TABLE IF NOT EXISTS cars (
		id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		model VARCHAR ( 255 ) NOT NULL,
		price NUMERIC(10, 2) NOT NULL,
		year INT NOT NULL,
		mileage INT,
		engine VARCHAR ( 255 ),
		hp INT,
		manufacturer_id INT REFERENCES manufacturers(id) NOT NULL
	);

	INSERT INTO manufacturers
	VALUES
		(DEFAULT, 'Nissan', 1933, 'Renault-Nissan-Mitsubishi'),
		(DEFAULT, 'Toyota', 1937, 'Toyota Motor Corp.'),
		(DEFAULT, 'Mazda', 1920, 'Mazda Motor Corp.'),
		(DEFAULT, 'Subaru', 1953, 'Subaru Corp.');

	INSERT INTO cars
	VALUES
		(DEFAULT, 'GT-R R34', 120990, 2001, 52226, '2.6L Twin-Turbo I6 (RB26DETT)', 280, 1),
		(DEFAULT, 'Supra', 72250, 1996, 76344, '3.0L Twin-Turbo I6 (2JZ-GTE)*', 320, 2),
		(DEFAULT, 'RX-8', 7500, 2007, 168000, '1.3L 2-rotor Wankel (RENESIS)', 231, 3),
		(DEFAULT, 'Impreza WRX STi', 20990, 2003, 179900, '2.0 Turbo 6MT', 280, 4),
		(DEFAULT, '350Z', 14100, 2003, 118330, '3.5 L VQ35DE V6', 280, 1),
		(DEFAULT, 'RX-7', 54900, 1994, 153400, '1.3L 13B-REW twin-rotor', 255, 3);
`;

async function main() {
	console.log('seeding...');
	const client = new Client({
		connectionString: process.env.DB_URL
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('done');
};

main();
