module.exports = {
    testEnvironment: 'node',
    reporters: [
        'default', [
            'jest-html-reporters',
            {
                filename: 'report.html',
                expand: true,
                pageTitle: 'BankReport'
            },

        ]
    ],

    moduleFileExtensions: ['js', 'json'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testMatch: ['**/specs/*.spec.*'],
    globals: {
        testTimeout: 10000,
    },
    verbose: true,
    setupFilesAfterEnv: ["jest-allure/dist/setup"]


};