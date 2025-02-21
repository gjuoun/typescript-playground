const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/index.js',
    platform: 'node',
    target: 'node18',
    format: 'cjs',
    sourcemap: true,
    external: ['aws-sdk'],
}).catch(() => process.exit(1));
