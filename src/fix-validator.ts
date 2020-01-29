/**
 *
 * @author NDF, 28-Jan-2020.
 * @see  https://npmjs.com/package/ajv#options
 * @see  https://github.com/epoberezkin/ajv/blob/master/lib/ajv.d.ts
 * @see  https://json-schema.org/understanding-json-schema/
 */

import { AccessibilityFixes, AccessibilityFixStruct, HtmlAttributeFixes, FixReport } from './accessibility-fixes';
import { ATTRIBUTE_WHITE_LIST, ATTRIBUTE_ARIA_REGEX } from './attribute-white-list';
import * as path from 'path';
import * as fs from 'fs';
import * as Ajv from 'ajv';

// const Ajv = require('ajv');

interface JsonSchema {
  '$schema'  : string,
  '$id'      : string,
  title      : string,
  definitions: {},
  type       : string,
  properties?: {},
  additionalProperties?: boolean,
}

// `Ajv` module?
/* interface LogFn {
  (p: any, p2?: any): void // => {}
}

interface Logger {
  error: LogFn,
  log  : LogFn,
  warn : LogFn,
}

export interface ValidatorOpt {
  allErrors?: boolean,
  verbose  ?: boolean,
  logger   ?: Logger,
}

export interface ValidationError {
  keyword   : string,
  dataPath  : string,
  schemaPath: string,
  params    : {},
  message   : string,
  schema   ?: any,  // Verbose only.
  parentSchema?: {},
  data     ?: any,
} */

// const SCHEMA_FILE = 'accessibility-fix-schema.json';

export class FixValidator {

  private schemaFile: string = 'accessibility-fixes.json';

  public async validate(fixes: AccessibilityFixes, options: Ajv.Options = {}): Promise<Array<Ajv.ErrorObject>> {
    const ajv = new Ajv(options); // options can be passed, e.g. {allErrors: true}
    const schema : JsonSchema = await this.getFixSchema();

    const isValid: boolean = await ajv.validate(schema, fixes);

    if (options && options.logger) {
      if (isValid) {
        console.log('OK. Valid JSON fixes!');
      } else {
      //if (!valid) {
        options.logger.error('Validation errors:', ajv.errors);
      }
    }

    return ajv.errors;
  }

  public async validateFile(filePath: string | Array<string>, options?: {}): Promise<any> {
    const data = await this.readJsonFile(filePath);

    return this.validate(data, options);
  }

  // allowAttr
  public isAllowedAttr(attribute: string): boolean {
    return ATTRIBUTE_WHITE_LIST.indexOf(attribute) !== -1 || this.isAriaAttr(attribute);
  }

  public isAriaAttr(attribute: string): boolean {
    return ATTRIBUTE_ARIA_REGEX.test(attribute);
  }

  // ----------------------------------------------------------

  public async validateTest(): Promise<any> {
  }

  private async getFixSchema(): Promise<JsonSchema> {
    // const SCHEMA_PATH = path.join(__dirname, SCHEMA_FILE);
    // const schemaJson: string = await fs.promises.readFile(SCHEMA_PATH, 'utf8');

    // return JSON.parse(schemaJson);
    return await this.readJsonFile([ __dirname, '..', 'schema', this.schemaFile ]);
  }

  private async readJsonFile(fpath: string | Array<string>): Promise<any> {
    const filePath: string = typeof fpath === 'string' ? fpath : path.join(...fpath);
    const jsonData: string = await fs.promises.readFile(filePath, 'utf8');

    return JSON.parse(jsonData);
  }
}
