// errorHandler.js (for demonstration)
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
}

module.exports = errorHandler;

// errorHandler.test.js
const errorHandler = require('./errorHandler.test');
describe('Global Error Handler', () => {
  it('logs the error and sends 500 response', () => {
    const err = new Error('Test error');
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    console.error = jest.fn();
    errorHandler(err, req, res, next);
    expect(console.error).toHaveBeenCalledWith(err.stack);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Something went wrong!' });
  });
}); 