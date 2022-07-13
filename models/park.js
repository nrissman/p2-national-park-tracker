// using an already connected mongoose not a fresh one from node_modules
const mongoose = require('./connection')
const commentSchema = require('./comment')

// inside of mongoose I want the keys that are named Schema and model
const { Schema, model } = mongoose

const parkSchema = new Schema(
	{
		name: String,
		color: String,
		readyToEat: Boolean,
		owner: {
			type: Schema.Types.ObjectId, // a single User ._id
			ref: 'User', // const User = model('User', userSchema) the string of 'User' is how we reference a model
		},
		comments: [commentSchema] // a park can have many comments. Comments are a sub doc of Park
	},
	{
		timestamps: true,
	}
)

// need to make a model
// this collections will be called parks
const Park = model('Park', parkSchema)

module.exports = Park