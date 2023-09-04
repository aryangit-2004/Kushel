

const express = require('express');
const Notification = require('./notifction'); 

const router = express.Router();

router.post('/notifications', async (req, res) => {
  try {
    const { message } = req.body;
    const newNotification = new Notification({ message });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ timestamp: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
