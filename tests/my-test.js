// for parameterized project DEMO
const base = require('@playwright/test');

exports.test = base.test.extend({
  // Define an option and provide a default value.
  // We can later override it in the config.
  number: ['0000000000', { option: true }],
  password: ['0000', { option: true }],
  expectedBalance: ['0', { option: true }],
});