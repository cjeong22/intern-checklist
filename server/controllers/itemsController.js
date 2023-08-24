const Item = require('../models/Item')
const asyncHandler = require('express-async-handler')
const {format} = require('date-fns')

const getAllItems = asyncHandler(async(req, res) => {
    const items = await Item.find().lean()
    if (!items) {
        return res.status(400).json({message: 'no items found'})
    }
    res.json(items)

})

const createNewItem = asyncHandler(async(req, res) => {
    const {title} = req.body
    const date =  `${format(new Date(), 'yyyy/MM/dd_HH:mm:ss')}`
    if (!title) {
        return res.status(400).json({message: 'all fields required'})
    }
    const duplicate = await Item.findOne({title}).lean().exec()

    if (duplicate) {
        return res.status(409).json({message: 'Duplicate item'})
    }
    const itemObject = {title, date}
    const item = await Item.create(itemObject)
    if (item) {
        res.status(201).json({message: `New item ${title} created`})
    } else {
        res.status(400).json({message: 'invalid item data received'})
    }
})

const updateItem = asyncHandler(async(req, res) => {
    const {id, title, checked} = req.body
    if (!id || !title) {
        return res.status(400).json({message: 'all fields required'})
    }
    const item = await Item.findById(id).exec()
    if (!item) {
        return res.status(400).json({message: 'Item not found'})
    }
    const duplicate = await Item.findOne({title}).lean().exec()
    if (duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicate item'})
    }
    item.title = title
    item.checked = checked
    const updatedItem = await item.save()
    res.json({message: `${updatedItem.title} updated`})
})

const deleteItem = asyncHandler(async(req, res) => {
    const {id} = req.body
    if (!id) {
        return res.status(400).json({message: 'item id required'})
    }
    const item = await Item.findById(id).exec()
    if (!item) {
        return res.status(400).json({message: 'Item not found'})
    }
    
    const result = await item.deleteOne()

    const reply = `Item ${result.title} with ID ${result._id} deleted`
    res.json(reply)

})

module.exports = {getAllItems, createNewItem, updateItem, deleteItem}