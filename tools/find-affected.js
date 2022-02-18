const {execSync} = require('child_process');
const {readFileSync} = require('fs');

const readFileWithComments = (/** @type {string} */ fileName) => {
  return readFileSync(fileName)
    .toString('utf-8')
    .split('\n')
    .filter(line => !line.trim().startsWith('//'))
    .join('\n');
};

const workspaceFile = JSON.parse(readFileWithComments('workspace.json'));
const projects = Object.keys(workspaceFile.projects).map(key => {
  return {
    name: key,
    path: workspaceFile.projects[key],
    type: workspaceFile.projects[key].split('/')[0]
  }
})

const nxCommand = `npx nx print-affected`;
const output = execSync(nxCommand)
  .toString('utf-8');

const parsedOutput = JSON.parse(output);

const affectedEndToEndTests = parsedOutput.projects
  .filter(affectedProject => affectedProject.endsWith('e2e'))
  .filter(affectedProject =>
    projects.find(project => project.name === affectedProject && project.type === 'apps')
  );

const affectedApps = parsedOutput.projects
  .filter(affectedProject => !affectedProject.endsWith('e2e'))
  .filter(affectedProject =>
    projects.find(project => project.name === affectedProject && project.type === 'apps')
  );

const affected = {
  // Is there any affected app, lib or e2e?
  hasAffected: parsedOutput.projects.length > 0,
  // Is there any affected e2e test?
  hasAffectedE2e: affectedEndToEndTests.length > 0,
  // Is there any affected app?
  hasAffectedApps: affectedApps.length > 0,
  // List of affected apps
  apps: affectedApps
};

console.log(JSON.stringify(affected));
