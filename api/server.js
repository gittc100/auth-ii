require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require('cors');
const knex = require('knex');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const knexConfig = require("../knexfile.js");

const server = express();

const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
	res.send('sanity check 4400');
});

server.post('/api/register', (req, res) => {
	const userInfo = req.body;
	const hash = bcrypt.hashSync(userInfo.password, 12);
	userInfo.password = hash;
	db('users')
		.insert(userInfo)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => res.status(500).json(err));
});

function generateToken(user) {
	const payload = {
        id: user.id,
		// username: user.username,
		// department: user.department,
	};
	const secret = process.env.JWT_SECRET;
	const options = {
		expiresIn: '45m',
	};
	return jwt.sign(payload, secret, options);
}

server.post('/api/login', (req, res) => {
	const creds = req.body;
	db('users')
		.where({ username: creds.username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				// login is successful
				// create the token
				const token = generateToken(user);
				res.status(200).json({ token: token });
			} else {
				res.status(401).json({ message: 'you shall not pass!!' });
			}
		})
		.catch(err => res.status(500).json(err));
});

function lock(req, res, next) {
	// the auth token is normally sent in the Authorization header
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: 'invalid token, you shall not pass' });
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		});
	} else {
		res.status(401).json({ message: 'no token provided' });
	}
}

server.get('/api/users', lock, async (req, res) => {
	const users = await db('users').select('id', 'username', 'department', 'password');

	res.status(200).json({
		users,
		decodedToken: req.decodedToken,
	});
});

module.exports = server;