const express = require('express');
const Url = require('../schema/url');
const utils = require('../utils/utils');
const shortid = require('shortid');

const router = express.Router();

router.post('/short', async (req, res) => {
  res.header('Access-Control-Allow-Origin', "*");
  const { origUrl } = {origUrl:req.body.url};
  const base = process.env.BASE;

  var urlId = req.body.alias;

  if (urlId === "" ) {
    urlId = shortid.generate();
  }
  if (utils.validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        const result = {"short":url['shortUrl'],"long":url['origUrl'],"date":url['date'],clicks : url['clicks']}
res.json(result)
      } else {
let al = await await Url.findOne({ urlId });
      if (al) {
        err = {"status":"error","message":"this custom link is taken"}
        res.json(err)
        return;
      } 

        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      error = {"status":"error","message":"Server Error"}
      res.status(500).json(error);
    }
  } else {
    err = {"err":"invalid url"};
    res.status(400).json(err);
  }
});

router.get('/short', async (req, res) => {
  res.header('Access-Control-Allow-Origin', "*");
  const  origUrl  = req.query.url;
  var urlId = req.query.alias;
  const base = process.env.BASE;

  if (typeof urlId === "undefined" ) {
    urlId = shortid.generate();
  }
  if (urlId === "" ) {
    urlId = shortid.generate();
  }
  if (origUrl === ""){
err = {"err":"empty url"}
        res.json(err)
        return;
  }
  if (utils.validateUrl(origUrl)) {

    try {

      let url = await Url.findOne({ origUrl });
      if (url) {
        const result = {"short":url['shortUrl'],"long":url['origUrl'],"date":url['date'], clicks : url['clicks']}
res.json(result)
      } else {
      
      let al = await Url.findOne({ urlId });
      if (al) {
        err = {"err":"this custom link is taken"}
        res.json(err)
        return;
      } 
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      
      res.status(500).json('Server Error');
    }
  } else {
        err = {"err":"invalid url"};
        res.status(400).json(err);
  }
});

module.exports = router;
