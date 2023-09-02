const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const notificationRoutes = require('./routes');
const notifction = require('./notifction');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://aryandeveloper2004:Aryp5678@cluster0.k0o2zyp.mongodb.net/notification?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(bodyParser.json());


app.use('/api', notificationRoutes);

app.post('/api/notifications', async (req, res) => {
  try {
    const { message } = req.body;
    const newNotification = new Notification({ message, timestamp: new Date() });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ timestamp: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
