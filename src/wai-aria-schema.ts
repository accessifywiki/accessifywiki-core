/**
 * Use regular expressions to parse WAI-ARIA roles, states & properties from XML-RDF.
 *
 * @author NDF, 30-Jan-2020.
 * @see  https://w3.org/TR/wai-aria/#a_schemata
 * @see  http://www.w3.org/WAI/ARIA/schemata/aria-1.rdf
 */

import * as path from 'path';
import * as fs from 'fs';

export const WAI_ARIA_TAXONOMY = 'http://www.w3.org/WAI/ARIA/schemata/aria-1.rdf';

const ATTR_RE = /<role:\w+State rdf:resource="http:\/\/www.w3.org\/2005\/07\/aaa#(aria-\w+)"\/>/ ;
const ROLE_RE = /<owl:Class rdf:ID="([a-z]+)">/ ; // Lower-case only!

export class WaiAriaSchema {

  private rdfFilePath: string;

  constructor() {
    this.rdfFilePath = path.join(__dirname, '..', 'schema', 'aria-1.rdf');
  }

  public async process() {
    const RDF: string = await fs.promises.readFile(this.rdfFilePath, 'utf8');

    const attributes: string[] = unique(myMatchAll(RDF, ATTR_RE)).sort();
    const roles     : string[] = myMatchAll(RDF, ROLE_RE).sort();

    const result = { roles, attributes };

    console.log('WAI-ARIA roles/ attr:', result);

    return result;
  }
}

function myMatchAll(text: string, regex: RegExp): Array<string> {
  // const matches = text.matchAll(regex);

  const G_REGEX = new RegExp(regex, 'gs');
  const extracted: Array<string> = text.match(G_REGEX).map(MCH => MCH.match(regex)[ 1 ]);

  return extracted;
}

// https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
function unique(ARY: string[]): any {
  return Array.from(new Set(ARY));
  // return [...new Set(ARY)];
}
