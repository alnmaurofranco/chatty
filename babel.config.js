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
        '@repository': './src/repository',
        '@services': './src/services',
        '@models': './src/models',
        '@controllers': './src/controllers',
        '@views': './src/views',
        '@errors': './src/errors',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
