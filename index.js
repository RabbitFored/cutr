const express = require('express');
const connectDB = require('./server/database/connection');

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/client'));
app.use('/', require('./server/routes/routes'));

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
