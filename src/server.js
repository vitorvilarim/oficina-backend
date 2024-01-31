require('dotenv').config();
const express = require('express');
const routes = require('./routes/route');
const app = express();
app.use(routes);

app.listen(process.env.PORT, () => console.log("server is running"));