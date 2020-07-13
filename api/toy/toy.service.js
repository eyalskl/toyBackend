const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    filterBy.sort = filterBy.sort.toLowerCase();
    var prop = (filterBy.sort === 'price') ? 'price' : (filterBy.sort === 'name') ? 'name' : 'createdAt';
    var order = prop === 'createdAt' ? -1 : 1;
    var sortBy = {
        [prop]: order
    }
    const collection = await dbService.getCollection('toy')
    try {
        const toys = await collection.find(criteria).sort(sortBy).toArray();
        return toys
    } catch (err) {
        console.log('ERROR: cannot find toys')
        throw err;
    }
}

async function getById(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        const toy = await collection.findOne({ "_id": ObjectId(toyId) })
            // toy.givenReviews = await reviewService.query({bytoyId: ObjectId(toy._id) })
            // toy.givenReviews = toy.givenReviews.map(review => {
            //     delete review.bytoy
            //     return review
            // })
        return toy
    } catch (err) {
        console.log(`ERROR: while finding toy ${toyId}`)
        throw err;
    }
}

async function remove(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        await collection.deleteOne({ "_id": ObjectId(toyId) })
    } catch (err) {
        console.log(`ERROR: cannot remove toy ${toyId}`)
        throw err;
    }
}

async function update(toy) {
    const collection = await dbService.getCollection('toy')
    toy._id = ObjectId(toy._id);

    try {
        await collection.replaceOne({ "_id": toy._id }, { $set: toy })
        return toy
    } catch (err) {
        console.log(`ERROR: cannot update toy ${toy._id}`)
        throw err;
    }
}

async function add(toy) {
    const collection = await dbService.getCollection('toy')
    try {
        await collection.insertOne(toy);
        return toy;
    } catch (err) {
        console.log(`ERROR: cannot insert toy`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.name) criteria.name = { $regex: new RegExp(filterBy.name, 'i') };
    if (filterBy.type !== '') criteria.type = filterBy.type;
    if (filterBy.inStock !== '') criteria.inStock = (filterBy.inStock + '' === 'true') ? true : false;
    return criteria;
}