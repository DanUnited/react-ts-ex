const fs = require('fs');
const execSync = require('child_process').execSync;
const arg = process.argv[2];
const path = require('path');

const envsPath = path.format({ dir: 'envs' });

if (arg) {
  // initial commit count that I set approximately
  const currentVersion = String(execSync('git rev-list HEAD --count')).replace(/\r?\n/g, '');
  console.log('Build with app version ', currentVersion);

  if (['build', 'start'].includes(arg)) { // default build
    const envFile = arg === 'start' ? '.env.local' : '.env.develop';

    fs.appendFile(`${envsPath}${envFile}`, `\nREACT_APP_VERSION=${currentVersion}\n`, (error) => {
      if (error) throw error;
      execSync(`env-cmd -f ${envsPath}${envFile} craco ${arg} --no-override`, { stdio: 'inherit' });
    });
  } else { // build with custom env
    const envName = `.env.${arg}`;

    fs.appendFile(`${envsPath}${envName}`, `\nREACT_APP_VERSION=${currentVersion}\n`, (error) => {
      if (error) throw error;
      execSync(`env-cmd -f ${envsPath}${envName} craco build --no-override`, { stdio: 'inherit' });
    });
  }
} else {
  throw new Error('Passed craco command is not recognized');
}
