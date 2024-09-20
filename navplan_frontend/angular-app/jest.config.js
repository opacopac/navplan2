/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest', // Use ts-jest preset
    testEnvironment: 'node', // You can change this to 'jsdom' if you test browser environment code
    transform: {
        '^.+\\.ts?$': 'ts-jest', // Transform TypeScript files using ts-jest
    },
    moduleFileExtensions: ['ts', 'js'], // Recognize TypeScript and JavaScript files
};
