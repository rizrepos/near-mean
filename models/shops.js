const mongoose = require('mongoose');

const PointSchema = mongoose.Schema({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dspere' }
});

const ShopSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    geo: PointSchema
});

const Shop = module.exports = mongoose.model('Shop', ShopSchema);