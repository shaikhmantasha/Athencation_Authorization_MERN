
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());


const users = [
    { id: 1, username: 'admin', password: bcrypt.hashSync('admin123', 10), role: 'admin' },
    { id: 2, username: 'user', password: bcrypt.hashSync('user123', 10), role: 'user' }
];
 console.log(users)
// const authenticate = (req, res, next) => {
//     const { username, password } = req.body;
//     const user = users.find(u => u.username === username);
//     console.log(user)



//     if (user && bcrypt.compareSync(password, user.password)) {

//         console.log(user)
//         req.user = user;
//         next();
//     } else {
//         res.status(401).send('Authentication failed');
//     }
// };
const authenticate = (req, res, next) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    console.log(req.body)
    console.log(bcrypt.compareSync(password, user.password))
    console.log(user.password)
    console.log(password)



    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
        // console.log(user)
            req.user = user;

            
            // console.log(bcrypt.compareSync(password, user.password))
            next();
        } else {
            res.status(401).send('Authentication failed: Password does not match');
        }
    } else {
        res.status(401).send('Authentication failed: User not found');
    }
};


const authorize = (roles) => (req, res, next) => {
    if (roles.includes(req.user.role)) {
        next();
    } else {
        res.status(403).send('Authorization failed');
    }
};

app.post('/login', authenticate, (req, res) => {
    const token = jwt.sign({ sub: req.user.id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
});

app.get('/admin', authenticate, authorize(['admin']), (req, res) => {
    res.send('Welcome Admin');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
