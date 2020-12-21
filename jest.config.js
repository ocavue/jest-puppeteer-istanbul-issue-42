module.exports = {
    preset: "./test/configs/testPreset",
    testMatch: ["**/?(*.)+(spec|test).[t]s"],
    testPathIgnorePatterns: ["/node_modules/", "dist"],
    moduleFileExtensions: ["js", "ts", "tsx"],
    setupFilesAfterEnv: [
        "jest-puppeteer-istanbul/lib/setup",
        "jest-puppeteer-allure/src/registerAllureReporter"
    ],
    setupFiles: [
        "<rootDir>/test/__setups__/setupEnzyme.ts"
    ],
    coverageReporters: ["json", "text", "lcov"],
    reporters: ["default", "jest-puppeteer-istanbul/lib/reporter", "jest-puppeteer-allure"],
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!**/*d.ts",
        "!**/*d.ts",
        "!**/*scss",
        "!**/node_modules/**"
    ],
    coverageDirectory: "dist/coverage",
    moduleNameMapper: {
        "\\.scss$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "<rootDir>/test/__mocks__/fileMock.ts",
    }
};