import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModal from '../models/user.js';

const secret = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const { emailAddress, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ emailAddress });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { emailAddress: oldUser.emailAddress, id: oldUser._id },
      secret,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const register = async (req, res) => {
  const { username, emailAddress, password, avatar } = req.body;

  try {
    const oldUser = await UserModal.findOne({ emailAddress, username });

    if (oldUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      username,
      emailAddress,
      password: hashedPassword,
      avatar,
    });

    const token = jwt.sign(
      { emailAddress: result.emailAddress, id: result._id },
      secret,
      {
        expiresIn: '1h',
      }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
};
