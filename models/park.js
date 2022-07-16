//using the mongoose we already built in connection by assigning it to a variable   
const mongoose = require('.connection')
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
		owner: {
			type: Schema.Types.ObjectId, // a single User ._id
			ref: 'User', // const User = model('User', userSchema) the string of 'User' is how we reference a model
		},
		comments: [commentSchema] // a park can have many comments. Comments are a sub doc of parks
	},
	{
		timestamps: true, //does not go in object
	}
)

// need to make a model with the above schema
// this collections will be called parks
const Park = model('park', parkSchema)

module.exports = Park