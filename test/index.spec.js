import { transformFileSync } from 'babel-core'
import assert from 'assert'
import path from 'path'
import fs from 'fs'

const plugin = require('../src/index');

const getPath = function(...args){
  const basePath = [__dirname];
  return path.join.apply(
    null,basePath.concat(args)
  )
};

describe('pick parts module', () => {


  it(`should work`, () => {
    const testNum = 'test1';
    const actual = transformFileSync(getPath(testNum, 'actual.js'), {
      plugins: [plugin],
    }).code;
    const expected = fs.readFileSync(getPath(testNum, 'expected.js'), 'utf8');
    assert.strictEqual(actual.trim(), expected.trim());
  });

  it(`should not process with out react-bootstrap`, () => {
    const testNum = 'test2';
    const actual = transformFileSync(getPath(testNum, 'actual.js'), {
      plugins: [plugin],
    }).code;
    const expected = fs.readFileSync(getPath(testNum, 'expected.js'), 'utf8');
    assert.strictEqual(actual.trim(), expected.trim());
  });

});




