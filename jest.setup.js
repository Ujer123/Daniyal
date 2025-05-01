// jest.setup.js
import '@testing-library/jest-dom';

// Mock window.scrollTo
window.scrollTo = jest.fn();

// Reset mocks between tests
afterEach(() => {
  jest.clearAllMocks();
});