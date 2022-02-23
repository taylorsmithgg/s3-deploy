const core = require('@actions/core');
const deploy = require('./deploy');

function getBooleanInput(name) {
  return core.getInput(name).toLowerCase() === 'true';
}

async function run() {
  try {
    // Object.keys(process.env).forEach((input) => {
    //   core.addPath(`${input}=${process.env[input]}`) 
    // });

    const folder = core.getInput('folder', {required: true});
    const bucket = core.getInput('bucket', {required: true});
    const bucketRegion = core.getInput('bucket-region', {required: true});
    const distId = core.getInput('dist-id');
    const invalidation = core.getInput('invalidation') || '/';
    const deleteRemoved = core.getInput('delete-removed') || false;
    const noCache = getBooleanInput('no-cache');
    const private = getBooleanInput('private');

    await deploy({ folder, bucket, bucketRegion, distId, invalidation, deleteRemoved, noCache, private });
  } catch (error) {
    core.setFailed(error.message);
  }
}

// console.log(JSON.stringify(process.env, null, 2))
run();
