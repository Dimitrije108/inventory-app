// import db

async function getCategories() {
	// retrieve all categories from db
	// pass it to index.ejs
	// render index.ejs
	// index should loop over all categories and display them
	// all categories should have link element leading to /:category
};

async function getChar() {
	// from the req.params take out the category and char id
	// query db to retrieve that char
	// render the char
};

async function getCategoryChars() {
	// from the req.params take out the category
	// query db to retrieve all chars from that category
	// render view category
	// pass in the chars and loop over them to display them
};

async function createCategoryGet() {
	// render the form for new category
};

async function createCategoryPost() {
	// receive form data from req.body
	// validate/sanitize
	// insert into db
	// redirect to /
};

async function createCharGet() {
	// render the form for new char
};

async function createCharPost() {
	// receive form data from req.body
	// validate/sanitize
	// insert into db
	// redirect to /:category where the char was created
};
