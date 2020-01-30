/**
 * Test the JSON schema.
 *
 * @author NDF, 30-Jan-2020.
 */

import { FixValidator, JsonSchema } from '../src/fix-validator';
import { ATTRIBUTE_WHITE_LIST } from '../src/attribute-white-list';

describe("Test the JSON schema.", () => {

  test("Schema :~ 'accessibility-fixes.json'", async () => {
    const validator = new FixValidator();
    const SCHEMA: JsonSchema = await validator.getFixSchema();

    expect(SCHEMA).not.toBeNull();
    expect(SCHEMA[ '$schema' ]).toContain('http://json-schema.org/');
    expect(SCHEMA.definitions).toHaveProperty('HtmlAttributeFixes');
    expect(SCHEMA.additionalProperties).toBeFalsy();
  });

  test("Sub-schema :~ 'HtmlAttributeFixes'", async () => {
    const validator = new FixValidator();
    const SCHEMA: JsonSchema = await validator.getFixSchema();
    const ATTR_FIXES = SCHEMA.definitions[ 'HtmlAttributeFixes' ];

    const attributes : string[] = Object.keys(ATTR_FIXES.properties);
    const patternAttr: string[] = Object.keys(ATTR_FIXES.patternProperties);

    expect(ATTR_FIXES.additionalProperties).toBeFalsy();
    expect(patternAttr).toHaveLength(2);
    expect(attributes).toHaveLength(16);
    expect(ATTRIBUTE_WHITE_LIST).toHaveLength(16);

    expect(attributes).toEqual(ATTRIBUTE_WHITE_LIST);

    expect(attributes).toContain('alt');
    expect(attributes).not.toContain('onclick');

    attributes.forEach(attr => expect(attr).not.toMatch(/^on\w+/));

    console.log('Allowed HTML attributes:', attributes, patternAttr);
  });
});
