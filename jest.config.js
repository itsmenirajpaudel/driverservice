module.exports = {
    roots: ['<rootDir>/src/api'],
    collectCoverageFrom: ['!<rootDir>/src/api/routes/**/*.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
