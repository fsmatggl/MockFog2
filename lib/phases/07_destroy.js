const fs = require("fs")

const conf = require("../config.js")
const infra = require("../data/infrastructure.js")
const common = require("./common.js")

// prepare var file
const varPath = conf.playbookVarDir + "07_destroy.yml"
fs.writeFileSync(varPath, infra.awsYML)
console.log("Destroy playbook vars written to " + varPath)

// check all dependencies
const playbookPath = conf.playbookDir + "07_destroy.yml"
common.checkFiles(playbookPath, varPath)
    .then(exists => { if (!exists) throw "Mandatory files for bootstrapping playbook do not exist." })

// requiring this file again gives you the same playbook instance
module.exports = new common.Playbook(playbookPath, varPath)