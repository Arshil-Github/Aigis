const express = require('express');

const router = express.Router();

// Mock database
let accounts = [];

// Create account
router.post('/create-account', (req, res) => {
    const { username, email } = req.body;
    const newAccount = { id: accounts.length + 1, username, email, karma: 0, location: null };
    accounts.push(newAccount);
    res.status(201).json(newAccount);
});

// Update account
router.put('/update-account/:id', (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    const account = accounts.find(acc => acc.id == id);
    if (account) {
        account.username = username || account.username;
        account.email = email || account.email;
        res.status(200).json(account);
    } else {
        res.status(404).json({ message: 'Account not found' });
    }
});

// Post user location
router.post('/user-location/:id', (req, res) => {
    const { id } = req.params;
    const { location } = req.body;
    const account = accounts.find(acc => acc.id == id);
    if (account) {
        account.location = location;
        res.status(200).json(account);
    } else {
        res.status(404).json({ message: 'Account not found' });
    }
});

// Post add karma
router.post('/add-karma/:id', (req, res) => {
    const { id } = req.params;
    const { karma } = req.body;
    const account = accounts.find(acc => acc.id == id);
    if (account) {
        account.karma += karma;
        res.status(200).json(account);
    } else {
        res.status(404).json({ message: 'Account not found' });
    }
});

module.exports = router;