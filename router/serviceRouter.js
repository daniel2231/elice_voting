const express = require('express');
const router = express.Router();
const Service = require('../models/service');

router.use(express.static("public"));

router.get('/list', async (req, res)=>{
    const services = await Service.find({});
    res.render('services/service', {services});
})

router.post('/list/:id/vote', async (req, res)=>{
    const { id } = req.params;
    const services = await Service.find({}).exec();
    const service = services.find(service=> service.id === id);
    await Service.findOneAndUpdate({id: id}, {
        $set: {
            votes: Number(service.votes) + 1
        }
    });
    res.redirect('/services/list');

})

router.get('/add', (req, res)=>{
    res.render('services/add');
})

router.post('/add/submit', async (req, res, next)=>{
    const {name, id, producer, link, votes, rank } = req.body;
    try {
        await Service.create({
            name: name,
            id: id,
            producer: producer,
            link: link,
            votes: Number(votes),
            rank: Number(rank)
        });
    } catch (err) {
        next(err);
    }


     res.redirect('/services/add')
});

router.delete('list/:id/delete', async (req, res)=>{
    const { id } = req.params;
    await Service.findOneAndDelete({id: id});
    res.redirect('/services/list');
})
module.exports = router;