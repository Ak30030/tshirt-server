import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
  
    req.isAdmin = decoded.isAdmin; // Add isAdmin to req object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};  

export const adminOnly = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}; 