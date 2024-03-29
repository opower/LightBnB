const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { pool } = require('../db');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 * getUserWithEmail
 */
const getUserWithEmail = function(email) {
  return pool.query(`SELECT * 
  FROM users 
  WHERE email = $1;`, [email])
  .then(res => res.rows[0]);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`SELECT * 
  FROM users 
  WHERE id = $1;`, [id])
  .then(res => user = res.rows[0]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const { name, password, email } = user;
  return pool.query(`INSERT INTO users (name, email, password) 
  VALUES($1, $2, $3) RETURNING *;`, [name, email, password])
  .then(res => user.id = res.rows[0].id);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  return pool.query(`SELECT properties.*, reservations.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN reservations ON properties.id = property_id
  JOIN property_reviews ON reservations.id = reservation_id
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`, [guest_id, limit])
  .then(res => res.rows)
  
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;
  if(options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }
  if(options.owner_id) {
    let id = parseInt(options.owner_id)
    queryParams.push(id);
    queryString += `WHERE properties.owner_id = $${queryParams.length}`;
  }
  if(options.minimum_price_per_night){
    let min = options.minimum_price_per_night * 100;
    queryParams.push(min);
    if(queryParams.length >= 1){
      queryString += ` AND cost_per_night >= $${queryParams.length}`;
    }
    else{
      queryString += `WHERE cost_per_night >= $${queryParams.length}`;
    }
  }
  if(options.maximum_price_per_night){
    let max = options.maximum_price_per_night * 100;
    queryParams.push(max);
    if(queryParams.length >= 1){
      queryString += ` AND cost_per_night <= $${queryParams.length}`;
    }
    else{
      queryString += `WHERE cost_per_night <= $${queryParams.length}`;
    }
  }
  if(options.minimum_rating){
    queryParams.push(`${options.minimum_rating}`);
    if(queryParams.length >=1){
      queryString += ` AND rating >= $${queryParams.length}`;
    }
    else{
      queryString += `WHERE rating >= $${queryParams.length}`;
    }
  }
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

  let array = Object.values(property);

  let queryString = `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) 
  VALUES($14,$1,$2,$7,$8,$6,$5,$4, $3, $10, $9, $11, $12, $13) RETURNING *;`
  return pool.query(queryString, array)
  .then(res=>res.rows);

}
exports.addProperty = addProperty;
