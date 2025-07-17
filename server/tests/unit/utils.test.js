// utils.js (to be placed in server/tests/unit/ for demonstration)
function multiply(a, b) {
  return a * b;
}

function isPositive(n) {
  return n > 0;
}

// Export for testing
module.exports = { multiply, isPositive };

// utils.test.js
const { multiply, isPositive } = require('./utils.test');

describe('Server Utility Functions', () => {
  test('multiply returns the product of two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-1, 1)).toBe(-1);
  });

  test('isPositive returns true for positive numbers', () => {
    expect(isPositive(2)).toBe(true);
    expect(isPositive(0)).toBe(false);
  });

  test('isPositive returns false for zero or negative numbers', () => {
    expect(isPositive(0)).toBe(false);
    expect(isPositive(-1)).toBe(false);
  });
}); 