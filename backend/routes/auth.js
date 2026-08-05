import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { User } from '../models.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { error: "Too many requests from this IP, please try again after 15 minutes." }
});

router.use(authLimiter);
const JWT_SECRET = process.env.JWT_SECRET;

// Helper
export const getUserFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return null;
    }
  }
};

// Auth middleware for protected routes
export const requireAuth = (req, res, next) => {
  const user = getUserFromHeader(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  req.user = user;
  next();
};

router.post('/register', async (req, res) => {
  const { username, password, age, occupation, state, gender, maritalStatus } = req.body;

  if (!username || !password || !age || !occupation || !state || !gender || !maritalStatus) {
    return res.status(400).json({ error: "All registration fields are required." });
  }
  
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      profile: {
        age: Number(age),
        occupation,
        state,
        gender,
        maritalStatus
      }
    });

    await newUser.save();
    
    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        username: newUser.username,
        profile: newUser.profile
      }
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Failed to register user." });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: "Logged in successfully",
      token,
      user: {
        username: user.username,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Failed to log in." });
  }
});

router.post('/guest', async (req, res) => {
  // Ensure this backdoor is only accessible in development or explicitly enabled demo modes
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_GUEST_LOGIN !== 'true') {
    return res.status(403).json({ error: "Guest login is disabled in production." });
  }

  try {
    let guestUser = await User.findOne({ username: 'guest_operator' });
    if (!guestUser) {
      const hashedPassword = await bcrypt.hash('guest123', 10);
      guestUser = new User({
        username: 'guest_operator',
        password: hashedPassword,
        profile: {
          age: 28,
          occupation: 'Farmer',
          state: 'Madhya Pradesh',
          gender: 'Male',
          maritalStatus: 'Married'
        }
      });
      await guestUser.save();
    }
    const token = jwt.sign({ userId: guestUser._id, username: guestUser.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({
      message: "Logged in as guest",
      token,
      user: {
        username: guestUser.username,
        profile: guestUser.profile
      }
    });
  } catch (error) {
    console.error("Guest login error:", error);
    res.status(500).json({ error: "Failed to authenticate as guest." });
  }
});

router.get('/me', async (req, res) => {
  const user = getUserFromHeader(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const dbUser = await User.findById(user.userId).select('-password');
    if (!dbUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(dbUser);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
