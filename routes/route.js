const express = require('express');
const router = express.Router();
const Shop = require('../models/shops');


// add shop
router.post('/shop', (req, res, next) => {

    let newShop = new Shop({
        name: req.body.name,
        geo: {
            coordinates: [req.body.lng, req.body.lat]
        }
    });
    newShop.save((err, shop) => {
        if (err) {
            res.json({ msg: err });
        } else {
            res.json({ msg: 'shop added successfully.' });
        }
    });
});

// delete shop
router.delete('/shop/:id', (req, res, next) => {
    Shop.remove({ _id: req.params.id },
        (err, result) => {
            if (err)
                res.json(err);
            else
                res.json(result);
        }
    )
});

// retrieving data with pagination
router.get('/shops', (req, res, next) => {

    if (!req.query.lat || !req.query.lng) {
        res.json([]);
        return;
    }

    const { lng, lat } = req.query;

    Shop.geoNear({ type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] }, {
        spherical: true,
        maxDistance: 2000
    }).then(function(shop) {
        if (!shop) {
            res.json([]);
        } else {
            res.json(shop);
        }

    }).catch(function(err) {
        res.json(err);
    });

});

module.exports = router;