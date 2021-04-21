module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@repositories': './src/repositories',
        '@services': './src/services',
        '@entities': './src/entities',
        '@controllers': './src/controllers',
        '@views': './src/views',
        '@errors': './src/errors',
      }
    }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
