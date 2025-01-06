import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Optional chaining to avoid runtime error

    if (!token) {
      return res.status(401).json({ success: false, error: 'Token Not Provided' }); // 401 Unauthorized
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY); // Fix: Corrected `jwt.verify` syntax
    if (!decoded) {
      return res.status(401).json({ success: false, error: 'Token Not Valid' });
    }

    const user = await User.findById(decoded._id).select('-password'); // Fix: Simplified `findById` parameter
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    req.user = user; // Attach user to the request object
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export default verifyUser;
