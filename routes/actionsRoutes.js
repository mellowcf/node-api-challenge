const express = require('express');

const router = express.Router();

const Db = require('../data/helpers/actionModel')

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const actions = await Db.get()
        res.status(200).json(actions)
    }
    catch {
        res.status(500).json({ "error": "error in retrieving actions"})
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const item = await Db.get(id)
        if (!item) {
            res.status(404).json({ "error" : "Item does not exist" })
        }
        else {
            res.status(200).json(item)
        }
    }
    catch {
        res.status(500).json({ "error" : "error in retrieving that item" })
    }
})

router.post('/', async (req, res) => {
    const postItem = req.body
    const { notes, description, project_id } = req.body;
    if (!notes || !description || !project_id) {
        return res.status(400).json({ "error" : "Make sure to include the action project ID, notes and description"})
    }
    try {
        const item = await Db.insert(postItem)
        res.status(200).json(item)
    }
    catch {
        res.status(500).json({ "error" : "Error in adding item"})
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted =  await Db.remove(id)
        if (deleted) {
            res.status(200).json(deleted)
        }
        else {
            res.status(404).json({ "error" : "item not found"})
        }
    }
    catch {
        res.status(500).json({ "error": "error in deleting item"})
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const item = req.body;
    try {
        const updated = await Db.update(id, item)
        if (updated) {
            res.status(200).json(updated)
        }
        else {
            res.status(404).json({ "error": "item could not be updated"})
        }
    }
    catch {
        res.status(500).json({ "error": "error in updating item" })

    }
})



module.exports = router;