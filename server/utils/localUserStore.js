const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const storePath = path.join(__dirname, '../data/local-users.json');

const readUsers = () => {
  if (!fs.existsSync(storePath)) {
    return [];
  }

  try {
    return JSON.parse(fs.readFileSync(storePath, 'utf-8'));
  } catch (error) {
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(storePath, JSON.stringify(users, null, 2));
};

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

const findByEmail = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();
  return readUsers().find((user) => user.email === normalizedEmail) || null;
};

const findById = async (id) => {
  return readUsers().find((user) => user.id === id) || null;
};

const create = async ({ name, email, password }) => {
  const users = readUsers();
  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    savedTrips: [],
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  writeUsers(users);
  return user;
};

module.exports = {
  create,
  findByEmail,
  findById,
  publicUser,
};
