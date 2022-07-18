//using the mongoose we already built in connection by assigning it to a variable   
const mongoose = require('./connection')
const commentSchema = require('./comment')

//mogoose is a giant OBJECT that has key value pairs, we are grabbing the two key values (schema and model) reverse engineered 
const { Schema, model } = mongoose

const parkSchema = new Schema(
	{
		fullName: String,
		city: String,
		stateCode: String,
		entranceFees: Number,
		description: String,
		
	},
	{
		timestamps: true, //does not go in object
	}
)

// need to make a model with the above schema
// this collections will be called parks
const Park = model('park', parkSchema)

module.exports = Park