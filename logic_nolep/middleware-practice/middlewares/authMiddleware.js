// middlewares/authMiddleware.js
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    // Simulate token verification
    if (token === 'valid-token') {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};