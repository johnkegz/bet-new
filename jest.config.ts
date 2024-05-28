export default {
    testEnvironment: "jsdom",
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          diagnostics: {
            ignoreCodes: [1343]
          },
          astTransformers: {
            before: [
              {
                path: 'node_modules/ts-jest-mock-import-meta',  // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
                options: { metaObjectReplacement: { url: 'https://www.url.com' } }
              }
            ]
          }
        }
      ]
    },
    moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '<rootDir>/enzyme.setup.ts'], // Include the Enzyme setup file
};
