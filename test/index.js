const { tempdirFixture } = require('../');
const fs = require('fs-extra-promise');
const withFixtures = require('with-fixtures');

const tap = require('tap');

tap.test('tempdirFixture', t => {
    const temp = tempdirFixture()
    return withFixtures([
        temp
    ], () => {
        const tempExists = temp
            .then(fixture =>  fs.accessAsync(fixture.dir))
            .then(() => t.pass("Directory exists"));

        return tempExists;
    })
        .then(() => temp)
        .then(fixture =>  fs.accessAsync(fixture.dir))
        .then(() => {
            throw("Directory still exists!");
        }, err => {
            if (err.code != 'ENOENT') throw err;
            t.pass("Directory removed");
        })
});
