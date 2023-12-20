module.exports = {
  apps: [
    {
      name: 'front-spotify',
      script: './node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
