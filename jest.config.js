module.exports = {
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  moduleFileExtensions: ['ts', 'js'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
};