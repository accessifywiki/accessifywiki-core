/**
 *
 * @author NDF, 29-Jan-2020.
 */

import { FixValidator /*, ValidatorOpt, ValidationError */ } from '../src/fix-validator';
import * as Ajv from 'ajv';

const IS_VERBOSE: boolean = isJestVerbose();

const FIXTURE_PATH = [ __dirname, 'fixtures', 'example-fixes.json' ];
// const EXAMPLE_PATH = [ __dirname, '..', 'examples', 'example-fixes.json' ];
const VALIDATOR_OPT: Ajv.Options = { // Was: ValidatorOpt
  allErrors: true,
  verbose: IS_VERBOSE,
  logger:  IS_VERBOSE ? console : undefined,
};


describe("Test the 'Fix Validator' class:", () => {
  /* let validator;

  beforeEach(() => {
    validator = new FixValidator()
  }); */

  test("A valid input file :~ 'example-fixes.json'", async () => {
    const validator = new FixValidator();

    const errors = await validator.validateFile(FIXTURE_PATH, VALIDATOR_OPT);

    expect(errors).toBeNull();
  });

  test("Fixes containing invalid timeout.", async () => {
    const validator = new FixValidator();

    const errors = await validator.validate({ onLoadTimeout: 21 }, VALIDATOR_OPT);

    expect(errors).not.toBeNull();
    expect(errors[ 0 ].keyword).toEqual('multipleOf');

    /* if (IS_VERBOSE) {
      console.error('Validation errors:', errors);
    } */
  });

  test("Fixes containing invalid 'updatedAt'.", async () => {
    const validator = new FixValidator();

    const errors = await validator.validate({ updatedAt: 'zzz' }, VALIDATOR_OPT);

    expect(errors).not.toBeNull();
    expect(errors[ 0 ].keyword).toEqual('format');
  });

  test("Test 'isAttrAllowed' function.", () => {
    const validator = new FixValidator();

    expect(validator.isAllowedAttr('alt')).toBeTruthy();
    expect(validator.isAllowedAttr('onclick')).toBeFalsy();
  });

  test("Test 'isAriaAttr' function.", () => {
    const validator = new FixValidator();

    expect(validator.isAriaAttr('aria-labelledby')).toBeTruthy();
    expect(validator.isAriaAttr('aria-z')).toBeFalsy();
    expect(validator.isAriaAttr('xxx')).toBeFalsy();
  })

});

function isJestVerbose(): boolean {
  // console.debug(process.argv);

  const VERBOSE_CMD = process.argv.slice(-1)[ 0 ] == '--verbose';

  const VERBOSE_PKG = require('../package.json').jest.verbose;

  return VERBOSE_CMD || VERBOSE_PKG;
}
