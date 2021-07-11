const express = require('express');
const short = require('./short');
const path = require('path');
const Url = require('../schema/url');
const router = express.Router();

var index = path.join(__dirname, '..',"..", 'client',"pages", 'index.html');

router.get('/:id', async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.id });
    if (url) {
      url.clicks++;
      url.save();
      return res.redirect(url.origUrl);
    } else res.status(404).json('Page Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

router.get("/",function(req, res) {
  res.sendFile(index);
})

router.use('/api', short);

module.exports = router;
