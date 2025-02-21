# TypeScript AWS Lambda Function

This is a TypeScript project template for AWS Lambda functions.

## Project Structure

```
.
├── src/
│   └── index.ts      # Lambda function source code
├── dist/             # Compiled JavaScript output
├── build.js          # esbuild configuration
├── tsconfig.json     # TypeScript configuration
└── package.json      # Project dependencies and scripts
```

## Available Scripts

- `npm run build` - Builds the project using esbuild
- `npm run type-check` - Runs TypeScript type checking without emitting files

## Development

1. Write your Lambda function code in `src/index.ts`
2. Run type checking: `npm run type-check`
3. Build the project: `npm run build`
4. The compiled JavaScript will be available in the `dist` directory

## Deployment

The compiled JavaScript in the `dist` directory can be deployed to AWS Lambda. Make sure to zip the contents of the `dist` directory before uploading to AWS Lambda.

## Requirements

- Node.js 18 or later
- npm
