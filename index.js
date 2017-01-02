const fs = require('fs-extra-promise');
const os = require('os');

module.exports = {
    tempdirFixture
}

function tempdirFixture() {
  const dir = fs.mkdtempAsync(os.tmpdir());
  return dir.then(dir => ({
    done: () => fs.removeAsync(dir),
    dir
  }));
}
