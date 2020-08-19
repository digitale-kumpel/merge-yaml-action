const readdirp = require("readdirp")
const yaml = require("js-yaml")
const fs = require("fs")
const core = require('@actions/core');

async function run() {
  const folder = core.getInput('folder')
  const file = core.getInput('file')
  try {
    let yamlArray = {}
    for await (const entry of readdirp(folder)) {
      const {path} = entry;
      if (path.includes(file)) {
        const yam = yaml.safeLoad(fs.readFileSync(`./${folder}/${path}`, "utf8"))
        yamlArray = {
          ...yamlArray,
          ...yam
        }
      }
    }
    core.setOutput(yaml.safeDump(yamlArray))
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
