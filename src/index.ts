
import { AccessibilityFixes, AccessibilityFixStruct, HtmlAttributeFixes, FixReport } from './accessibility-fixes';
import { ATTRIBUTE_WHITE_LIST, ATTRIBUTE_ARIA_REGEX } from './attribute-white-list';
import { DomAccessibilityFixer } from './dom-accessibility-fixer';
// import { DomApplyFixes } from './dom-apply-fixes';
import { FileFixValidator } from './file-fix-validator';
import { FixValidator } from './fix-validator';
import { WaiAriaSchema } from './wai-aria-schema';

export {
  AccessibilityFixes,
  ATTRIBUTE_WHITE_LIST,
  ATTRIBUTE_ARIA_REGEX,
  DomAccessibilityFixer,
  FixValidator,
  FileFixValidator,
  WaiAriaSchema,
}

switch (process.argv.slice(-1)[ 0 ]) {

  case '--validator-test':
    const validator = new FixValidator();

    console.log(process.argv); // @was: validator.validateTest();
    break;

  case '--aria-process':
    const rdf = new WaiAriaSchema();
    rdf.process();
    break;

  // default: console.warn('?')
}

// End.
