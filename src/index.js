require('./models/User');
require('./models/Movements');
require('./models/Products');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const movementsRoutes = require('./routes/movementsRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productsRoutes');
const requierAuth = require('./middlewares/requireAuth');

const app = express();

const port = process.env.PORT || 3005;

app.use(bodyParser.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(movementsRoutes);
app.use(productRoutes);

const mongoUri =
	'mongodb+srv://admin:Password01@cluster0.j9t0v.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
	console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
	console.log('Error connecting to mongo', err);
});

app.get('/', requierAuth, (req, res) => {
	res.send(`User email: ${req.user.email}`);
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
