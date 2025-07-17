// utils.js (to be placed in client/src/tests/unit/ for demonstration)
function add(a, b) {
  return a + b;
}

function isEven(n) {
  return n % 2 === 0;
}

// Export for testing
module.exports = { add, isEven };

// utils.test.js
const { add, isEven } = require('./utils.test');

describe('Utility Functions', () => {
  test('add returns the sum of two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  test('isEven returns true for even numbers', () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(0)).toBe(true);
  });

  test('isEven returns false for odd numbers', () => {
    expect(isEven(3)).toBe(false);
    expect(isEven(-1)).toBe(false);
  });
}); 