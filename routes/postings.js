const express = require('express');
const { body } = require('express-validator/check');

const postingsController = require('../controller/postings');
const isAuth = require('../middleware/is-auth');

const router = express.Router();


//GET /postings

router.get('/', postingsController.getPostings);

router.get('/:postingId', postingsController.getPosting);

//POST - create a new product

router.post('/', 
    isAuth, 
    [
        body('title').trim().isLength({ min: 5 }),
        body('description').trim().isLength({ min: 5 })
    ], 
    postingsController.postPosting
);

//PATCH - add images to posting

router.patch('/:postingId', isAuth , postingsController.patchImageToPosting);

//PUT - update posting

router.put('/:postingId', 
    isAuth, 
    [
        body('title')
        .trim()
        .isLength({min: 5}),
        body('description')
        .trim()
        .isLength({min: 5})
    ], 
    postingsController.updatePosting
);

//DELETE - delete posting

router.delete('/:postingId', isAuth, postingsController.deletePosting);

module.exports = router;