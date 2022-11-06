const express = require('express');
const uuid = require('uuid');
const members = require('../../Members')


const router = express.Router()

// Gets all members
router.get('/', (req, res) => res.json(members)) // sending all member data as json in responce

// Get single Member
router.get('/:id', (req, res) => { // '/:id' is parameter send in request ex.(http://localhost:5000/api/members/4)
  // checking if member with given id is available or not
  const found = members.some(member => member.id === parseInt(req.params.id)) // true if found false if not

  if (found) {
    // sending one members data as json with filter method
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
  } else {
    // sending https status 400 (bad request) as responce with message
    res.status(400).json({ msg: `No member found with id of ${req.params.id}` })
  }
})

// Cerate a member
router.post('/', (req, res) => {
  // creating a new member to add to data with data sent in request body
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  }

  // Checking if new member object have all the database (here local array) needed
  if (!newMember.name || !newMember.email) {
    // if not then send a 400 http status (bad request) to the use with following message
    return res.status(400).json({ msg: `please include a name and email` })
  }

  // if everything is ok, add new member to the database (again local array)
  members.push(newMember)

  // send responce with all members data as json
  res.json(members)
})

module.exports = router