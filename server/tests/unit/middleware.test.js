// middleware.js (to be placed in server/tests/unit/ for demonstration)
function logger(req, res, next) {
  req.logged = true;
  next();
}

function requireAuth(req, res, next) {
  if (req.user) {
    return next();
  }
  res.status(401).send('Unauthorized');
}

// Export for testing
module.exports = { logger, requireAuth };

// middleware.test.js
const { logger, requireAuth } = require('./middleware.test');

describe('Middleware Functions', () => {
  test('logger adds logged property to req and calls next', () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    logger(req, res, next);
    expect(req.logged).toBe(true);
    expect(next).toHaveBeenCalled();
  });

  test('requireAuth calls next if user exists', () => {
    const req = { user: { id: 1 } };
    const res = {};
    const next = jest.fn();
    requireAuth(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('requireAuth sends 401 if user does not exist', () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();
    requireAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Unauthorized');
    expect(next).not.toHaveBeenCalled();
  });
}); 