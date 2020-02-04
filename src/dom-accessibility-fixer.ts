/**
 * Apply a set of fixes to a HTML web page (DOM), either immediately, or at the specified intervals.
 *
 * @author NDF, 25-Jan-2020.
 *
 * @see https://github.com/nfreear/accessifyhtml5.js/blob/master/accessifyhtml5.js
 *
 * @was `./dom-apply-fixes.js`
 */

import { AccessibilityFixes, AccessibilityFixStruct, HtmlAttributeFixes, FixReport } from './accessibility-fixes';

export class DomAccessibilityFixer {
// @was export class DomFixAccessibility {

  private WIN;
  private DOC;

  private fixReport: FixReport = {
    ok:   [],
    warn: [],
    fail: [],
    input: null,
  };

  constructor(WIN = window) {
    this.WIN = WIN;
    this.DOC = WIN.document;
  }

  public async fix(fixes: AccessibilityFixes): Promise<FixReport> {
    this.fixReport.input = fixes;

    await setTimeout(() => this.fixNow(fixes.fixesOnLoad), fixes.onLoadTimeout);

    return this.fixReport;
  }

  public fixNow(fixesInner: Array<AccessibilityFixStruct>): FixReport {

    fixesInner.forEach((fixes: AccessibilityFixStruct, idx: number) => {
      const $elems: NodeList = this.DOC.querySelectorAll(fixes.selectors);
      const attributes: HtmlAttributeFixes = fixes.attributes;

      Array.prototype.forEach.call($elems, $elem => {
      // Was: $elems.forEach($elem => {
        for (const attr in attributes) {
          $elem.setAttribute(attr, attributes[ attr ]);
        }
      });
    });

    return this.fixReport;
  }
}
