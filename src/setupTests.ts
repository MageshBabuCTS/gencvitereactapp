import '@testing-library/jest-dom';

// Polyfill for TextEncoder for Jest environment
if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = require('util').TextEncoder;
  }
