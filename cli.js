#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const [, , command, projectName] = process.argv;

const runCommand = (command) => {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute command: ${command}`, error);
    process.exit(1);
  }
};

switch (command) {
  case 'create':
    if (!projectName) {
      console.error('Please provide a project name.');
      process.exit(1);
    }

    const templateDir = path.resolve(__dirname, 'tsp-template');
    const targetDir = path.resolve(process.cwd(), projectName);

    if (fs.existsSync(targetDir)) {
      console.error(`Directory ${projectName} already exists.`);
      process.exit(1);
    }

    fs.mkdirSync(targetDir);
    fs.cpSync(templateDir, targetDir, { recursive: true });

    const packageJsonPath = path.resolve(targetDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName;
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n',
    );

    const gitignorePath = path.resolve(targetDir, 'gitignore');
    const dotGitignorePath = path.resolve(targetDir, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
      fs.renameSync(gitignorePath, dotGitignorePath);
    }

    console.log(`Project ${projectName} created successfully.`);
    break;

  case 'build':
    runCommand('tsc');
    break;

  case 'start':
    runCommand('ts-node -r source-map-support/register src/main.ts');
    break;

  case 'start:dev':
    runCommand(
      'nodemon --watch src --ext js,ts --exec "ts-node -r source-map-support/register src/main.ts"',
    );
    break;

  case 'start:prod':
    runCommand('node dist/main.js');
    break;

  default:
    console.error(`Unknown command: ${command}`);
    process.exit(1);
}
