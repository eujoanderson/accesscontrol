import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Host from '../model/Host.js';
import Reachability from '../model/Reachability.js';
import User from '../model/User.js';

import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

class HTTPError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

router.post('/user', isAuthenticated, async (req, res) => {
    const users = req.body;

    const newUser = await User.create(users);

    if (newUser) {
        res.json(newUser);
    } else {
        throw new HTTPError('Invalid data to create host', 400);
    }
});

//Emails
router.get('/users/emails', async (req, res) => {
    const users = await User.readEmail();
    
    res.json(users);
});

//Emails e IDS
router.get('/emails', async (req, res) => {
    const users = await User.readUsers();
    
    res.json(users);
});



router.get('/user', isAuthenticated, async (req, res) => {
    const users = await User.readAll();

    res.json(users);
});

router.put('/user/:id', isAuthenticated, async (req, res) => {
    const id = Number(req.params.id);

    const user = req.body;

    if (id && user) {
        const newUser = await Host.update(user, id);

        res.json(newUser);
    } else {
        throw new HTTPError('Invalid data to update host', 400);
    }
});


router.put('/user/update_user/:id', async (req, res) => {
    const id = Number(req.params.id);

    const user = req.body;

    if (id && user) {
        const newUser = await Host.update(user, id);

        res.json(newUser);
    } else {
        throw new HTTPError('Invalid data to update host', 400);
    }
});


router.delete('/user/:id', isAuthenticated, async (req, res) => {
    const id = Number(req.params.id);

    if (id && (await User.remove(id))) {
        res.sendStatus(204);
    } else {
        throw new HTTPError('Id is required to remove host', 400);
    }
});

router.post('/user/:id/reachabilities', isAuthenticated, async (req, res) => {
    const id = Number(req.params.id);

    const user = await User.read(id);

    const count = 3;

    const ping = await getPing(user.address, count);

    const times = ping.times.map((time) => ({ value: time }));

    const reachability = {
        transmitted: count,
        received: ping.times.length,
        hostId: id,
    };

    await Reachability.create(reachability);

    res.json(times);
});


router.get('/reachabilities', isAuthenticated, async (req, res) => {
    const reachabilities = await Reachability.readAll();

    res.json(reachabilities);
});

router.post('/users', async (req, res) => {
    const user = req.body;

    delete user.confirmationPassword;

    const newUser = await User.create(user);

    delete newUser.password;

    res.status(201).json(newUser);
});


router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const { id: userId, password: hash } = await User.readByEmail(email);

        const match = await bcrypt.compare(password, hash);

        if (match) {
            const token = jwt.sign(
                { userId },
                process.env.SECRET,
                { expiresIn: 3600 } // 1h
            );

            res.json({ auth: true, token });
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(401).json({ error: 'User not found' });
    }
});

router.get('/users/me', isAuthenticated, async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.read(userId);

        delete user.password;

        return res.json(user);
    } catch (error) {
        throw new HTTPError('Unable to find user', 400);
    }
});

// 404 handler
router.use((req, res, next) => {
    res.status(404).json({ message: 'Content not found!' });
});

// Error handler
router.use((err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof HTTPError) {
        res.status(err.code).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Something broke!' });
    }
});

export default router;