require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const usersRouter = require('./users/users.routes');
const mongoose = require('mongoose');
app.use(cors());
app.use(helmet());
app.use('/users', usersRouter)

mongoose.connect(process.env.LOCAL_MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("connect"))

app.listen(process.env.PORT, () => console.log(`listening to ${process.env.PORT}`))

