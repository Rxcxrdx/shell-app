/** @type {import('next').NextConfig} */
const NextFederationPlugin = require('@module-federation/nextjs-mf');

const CONSULTAS_URL = process.env.CONSULTAS_URL || 'http://localhost:3002';
const REPORTES_URL = process.env.REPORTES_URL || 'http://localhost:3003';

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  webpack(config, options) {
    const { isServer } = options;

    config.plugins.push(
      new NextFederationPlugin({
        name: 'shell',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          consultas: `consultas@${CONSULTAS_URL}/remoteEntry.js`,
          reportes: `reportes@${REPORTES_URL}/remoteEntry.js`,
        },
        exposes: {},
        shared: isServer
          ? {}
          : {
              react: { singleton: true, requiredVersion: false },
              'react-dom': { singleton: true, requiredVersion: false },
            },
        extraOptions: {
          exposePages: false,
          enableImageLoaderFix: true,
          enableUrlLoaderFix: true,
          skipSharingNextInternals: true,
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
