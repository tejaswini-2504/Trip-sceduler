const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const localUserStore = require('../utils/localUserStore');

const useLocalStore = () => process.env.USE_LOCAL_AUTH_STORE === 'true' || mongoose.connection.readyState !== 1;

const createToken = (id) => {
  const secret = process.env.JWT_SECRET || 'tripwise_dev_secret';
  return jwt.sign({ id }, secret, { expiresIn: '7d' });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = useLocalStore()
      ? await localUserStore.findByEmail(normalizedEmail)
      : await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (useLocalStore()) {
      const user = await localUserStore.create({ name, email: normalizedEmail, password: hashedPassword });
      const token = createToken(user.id);
      return res.status(201).json({ token, user: localUserStore.publicUser(user) });
    }

    const user = await User.create({ name, email: normalizedEmail, password: hashedPassword });

    const token = createToken(user._id);
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = useLocalStore()
      ? await localUserStore.findByEmail(normalizedEmail)
      : await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const userId = user._id || user.id;
    const token = createToken(userId);
    const responseUser = useLocalStore()
      ? localUserStore.publicUser(user)
      : { id: user._id, name: user.name, email: user.email };

    res.json({ token, user: responseUser });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
