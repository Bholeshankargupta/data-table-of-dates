const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const DateModel = require('./models/DateModel');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/datesDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/dates', async (req, res) => {
    const { date } = req.body;
    try {
        const newDate = new DateModel({ date });
        await newDate.save();
        res.status(201).send(newDate);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/dates', async (req, res) => {
    try {
        const dates = await DateModel.find();
        res.status(200).send(dates);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/dates/:id', async (req, res) => {
    const { id } = req.params;
    const { date } = req.body;
    try {
        const updatedDate = await DateModel.findByIdAndUpdate(id, { date }, { new: true });
        res.status(200).send(updatedDate);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/dates/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await DateModel.findByIdAndDelete(id);
        res.status(200).send({ message: 'Date deleted successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
