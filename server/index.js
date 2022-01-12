const express = require('express');
const app = express();
const port = 4000;
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/data2', require('./routes/rooms'));
app.use('/api/chart', require('./routes/chartinfo'));
app.use('/api/image', express.static('./upload'));
app.use('/api/auth', require('./middleware/auth'));


app.listen(port, () => console.log(`listening on port(server) ${port}!`));
