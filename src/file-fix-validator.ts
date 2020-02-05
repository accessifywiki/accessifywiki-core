
import { FixValidator } from './fix-validator';
import * as Ajv from 'ajv';
import * as path from 'path';
import * as fs from 'fs';

// https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options
import * as crypto from 'crypto';

const TS_SCHEMA_FILE = [ __dirname, 'accessibility-fixes-schema.ts' ];

export class FileFixValidator extends FixValidator {

  public async validateFile(filePath: string | Array<string>, options: Ajv.Options = {}): Promise<any> {
    const data = await this.readJsonFile(filePath);

    return this.validate(data, options);
  }

  public async writeJsonSchemaFile(): Promise<any> {
    const jsonFilePath: string = path.join(...this.getSchemaFilePath());
    const schemaData = this.getFixSchema();
    const integrity = await this.fileIntegrityHash(TS_SCHEMA_FILE);

    schemaData.integrity = integrity;
    schemaData[ '#' ] = 'Auto-generated from :~ accessibility-fixes-schema.ts';

    const schemaJson: string = JSON.stringify(schemaData, null, 2);

    const promise = fs.promises.writeFile(jsonFilePath, schemaJson, 'utf8')
      .then(() => 'schema file written')
      .catch(err => err);
    return promise;
  }

  private async readJsonFile(fpath: string | Array<string>): Promise<any> {
    const filePath: string = typeof fpath === 'string' ? fpath : path.join(...fpath);
    const jsonData: string = await fs.promises.readFile(filePath, 'utf8');

    return JSON.parse(jsonData);
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
   * @see https://github.com/goto-bus-stop/shasum-object/blob/default/index.js
   */
  private async fileIntegrityHash(filePath: string[]): Promise<string> {
    const ALGOR = 'sha256';
    const hash = crypto.createHash(ALGOR);
    const inputPath: string = path.join(...filePath);

    const buffer: Buffer = await fs.promises.readFile(inputPath);

    return `${ ALGOR }-` + hash.update(buffer).digest('hex');
  }
}
