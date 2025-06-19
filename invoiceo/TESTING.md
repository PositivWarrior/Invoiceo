# Testing Documentation

## Overview

This project uses Jest and React Testing Library for testing. The test setup focuses on unit tests for utility functions and validation schemas.

## Test Setup

-   **Framework**: Jest with React Testing Library
-   **Configuration**: In `package.json` jest section
-   **Setup file**: `jest.setup.mjs`
-   **Test location**: `__tests__/` directory

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Current Test Coverage

### Utility Functions

-   ✅ `formatCurrency` - 100% coverage
    -   Tests all three currencies (USD, EUR, NOK)
    -   Edge cases: zero, negative numbers, decimal rounding
    -   Large numbers with comma formatting

### Validation Schemas

-   ✅ `zodSchemas` - 100% coverage
    -   `onboardingSchema` validation
    -   `invoiceSchema` validation with all fields
    -   Error message validation
    -   Optional field handling

## Test Structure

```
__tests__/
├── formatCurrency.test.tsx    # Currency formatting tests
├── utils.test.tsx            # Original formatCurrency tests
└── zodSchemas.test.tsx       # Zod schema validation tests
```

## Test Configuration Notes

The Jest configuration includes:

-   Module mapping for path aliases (`@/` → `./`)
-   Image and CSS file mocking
-   TypeScript support via Babel
-   jsdom environment for React components

## Challenges Addressed

-   **Module Resolution**: Used relative imports for reliability
-   **Unicode Issues**: Used regex matching for NOK currency formatting
-   **Path Aliases**: Mapped `@/` imports to relative paths
-   **Asset Mocking**: Configured mocks for images and stylesheets

## Future Test Additions

Consider adding tests for:

-   React components (requires more complex mocking)
-   API routes (requires database and auth mocking)
-   Server actions (requires extensive mocking)
-   Integration tests

## Test Statistics

-   **Test Suites**: 3 passed
-   **Tests**: 24 passed
-   **Coverage**: 100% for tested files
-   **Test Runtime**: ~4-7 seconds
