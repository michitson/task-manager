const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const assert = require('assert')

const router = new express.Router()

//GET tasks?completed=true
//GET limit=10&skip=10
//GET sortBy
router.get('/tasks', auth, async (req, res) => {

    const match = {}
    const sort = {}
    
    //console.log('query ', req.query)

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    //console.log('sort ', sort)
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e)  {
        res.status(500).send(e)
    }

})

router.get('/tasks/:id', auth, async (req, res) => {
    
    const _id = req.params.id

    try {
        
        const task = await Task.findOne({_id, owner: req.user._id})

        if(!task) {
           return res.status(404).send()
        }
        res.send(task)
    
    } catch(e) {
        res.status(500).send(e)
    }

})

router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error : "invalid updates"})
    }
    
    try {
        const task = await Task.findOne({_id, owner: req.user._id}) //, { new: true, runValidators: true})
        
        if(!task) {
           return res.status(404).send()
        }
        res.status(200).send(task)

    } catch(e)  {
        res.status(500).send(e)
    }
})


router.delete('/tasks/:id',auth,  async(req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOneAndDelete({_id, owner:req.user._id})

        if(!task) {
           return res.status(404).send()
        }

        res.send(task)

    } catch(e)  {
        res.status(500).send(e)
    }
})

module.exports = router
