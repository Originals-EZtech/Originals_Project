const express = require('express');
const app = express();
const port = 5000;
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/data2', require('./routes/rooms'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));