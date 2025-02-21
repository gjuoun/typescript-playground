const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/index.js',
    platform: 'node',
    target: 'node20', // Updated to latest LTS; revert to 'node18' if needed
    format: 'cjs', // CommonJS for compatibility
    sourcemap: true, // Useful for debugging
    external: ['@aws-sdk/*'], // Exclude all AWS SDK v3 packages provided by Lambda
  })
  .catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
  });