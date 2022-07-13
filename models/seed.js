///////////////////////////////////////
// This file runs on `npm run seed`
///////////////////////////////////////

///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Park = require('./park')

///////////////////////////////////////
// Seed Code
///////////////////////////////////////
// save my db connection to a variable for easy reference later
const db = mongoose.connection

// this runs the callback function when the db connection is opened from this file
db.on('open', () => {
    // array of starter parks
    const startParks = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: true },
        { name: "Coconut", color: "brown", readyToEat: true }
    ]

    // when we seed data, we usually clear out the db first
    Park.remove({})
    // then we create that data
        .then(deletedParks => {
            console.log('this is what remove returns', deletedParks)

            // now that our delete was successful, we can create our parks
            Park.create(startParks)
                .then(data => {
                    console.log('the new parks', data)
                    db.close()
                })
                .catch(error => {
                    console.log('error:', error)
                    db.close()
                })
        })
        .catch(error => {
            console.log('error:', error)
            db.close()
        })
    // whether it's successful or not, we want to close our db connection
})