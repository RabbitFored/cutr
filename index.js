const express = require('express');
const rateLimit = require("express-rate-limit");
const connectDB = require('./server/database/connection');
connectDB();

const app = express();
const PORT = process.env.PORT;

const limiter = rateLimit({
	windowMs: 1000 * 60 * 60 , // 1 hr
	max: 250, // limit each IP to 250 requests per windowMs
  message:
    "Too many requests created from this IP, please try again after an hour"
})
app.use(limiter)

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/client'));
app.use('/', require('./server/routes/routes'));

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
