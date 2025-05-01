import express from 'express'
import User from '../../models/user.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RefreshToken from '../../models/refreshToken.models.js';

const router = express.Router();
const SECRET_KEY = "your_secret_key";
const REFRESH_SECRET_KEY = "your_refresh_key";

router.post('/signUp', async (req, res) => {
    const data = req.body;
    if (!data.email || !data.password || !data.confirmPassword) {
        return res.status(400).json({ error: "Email and Password are required!" });
    }
    // check if password n confirm password match
    if (data.password !== data.confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match!" })
    }
    // check if user already exists 
    const existingUser = await User.findOne({ email: data.email })
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt)

    // new user handling
    const newUser = new User({ email: data.email, password: hashedPassword });
    try {
        const saveUser = await newUser.save();
        console.log("data saved successfully!!");
        res.status(200).json(saveUser);
    } catch (err) {
        console.log(err, "error");
        res.status(500).json({ err: "Internal Server error!" })
    }
})

router.post('/login', async (req, res) => {
    const data = req.body;
    if (!data.email || !data.password) {
        return res.status(400).json({ error: "Email and Password are required." })
    }
    try {
        // find user if it exists or not 
        const user = await User.findOne({ email: data.email })
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        // compare the passwords
        const validPassword = await bcrypt.compare(data.password, user.password)
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // generate jwt
        const accessToken = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1m' })

        const refreshToken = jwt.sign({ id: user._id, email: user.email }, REFRESH_SECRET_KEY, { expiresIn: '1d' });

        const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

        const refreshTokenDoc = new RefreshToken({
            userId: user._id,
            token: refreshToken,
            expiresAt: expiresAt,
        });

        await refreshTokenDoc.save();

        res.json({ accessToken })

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" })
    }
})

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ error: "Access Token expired or invalid" });
        }
        req.user = user;
        next();
    });
};

router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: "Profile data", user: req.user });
})

export default router;