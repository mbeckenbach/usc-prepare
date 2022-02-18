const {execSync} = require('child_process');

const nxCommand = `npx nx print-affected`;
const output = execSync(nxCommand)
  .toString('utf-8');

const parsedOutput = JSON.parse(output);

const affected = {
  hasAffected: parsedOutput.projects.length > 0,
  projects: JSON.stringify(parsedOutput.projects)
}

console.log(JSON.stringify(affected));
