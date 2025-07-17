// logger.js (for demonstration)
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

module.exports = logger;

// logger.test.js
const logger = require('./logger.test');
describe('Logger Middleware', () => {
  it('logs the request method and url', () => {
    const req = { method: 'GET', url: '/test' };
    const res = {};
    const next = jest.fn();
    console.log = jest.fn();
    logger(req, res, next);
    expect(console.log).toHaveBeenCalledWith('GET /test');
    expect(next).toHaveBeenCalled();
  });
}); 