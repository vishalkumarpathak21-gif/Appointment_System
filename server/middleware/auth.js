import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'docpulse_secure_jwt_secret_key_2026_india';

/**
 * Middleware to authenticate requests using JWT Bearer token.
 * Attaches decoded user payload { id, role, email, name } to req.user.
 */
export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid authorization format. Format must be: Bearer <token>' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Authentication token has expired. Please sign in again.' });
    }
    return res.status(403).json({ error: 'Invalid or corrupted authentication token.' });
  }
}

/**
 * Optional JWT middleware: Decodes token if present, but allows guest access if absent.
 */
export function optionalAuthenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    req.user = null;
    return next();
  }

  const parts = authHeader.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') {
    try {
      const decoded = jwt.verify(parts[1], JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      req.user = null;
    }
  }
  next();
}
