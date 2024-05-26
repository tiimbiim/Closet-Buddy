const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/api/data', (req, res)=> {

    const sql = 'SELECT * FROM shirt';

    db.query(sql, (err, result) => {
        if(err){
            return res.status(500).send(err);
        }
        res.json(result);
    });

});

router.post('/api/data', (req,res) => {

    const { name, value } = req.body;
    const sql = 'INSERT INTO  (name, value) VALUES (?, ?)';  //TODO needs to be reworked
    db.query(sql, [name,value], (err,result) => {
        if(err) {
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId });
    });
});

module.exports = router;