
import { AccessibilityFixes, AccessibilityFixStruct, HtmlAttributeFixes, FixReport } from './accessibility-fixes';
import { ATTRIBUTE_WHITE_LIST, ATTRIBUTE_ARIA_REGEX } from './attribute-white-list';
import { DomAccessibilityFixer } from './dom-accessibility-fixer';
// import { DomApplyFixes } from './dom-apply-fixes';
import { FixValidator } from './fix-validator';

export {
  AccessibilityFixes,
  ATTRIBUTE_WHITE_LIST,
  ATTRIBUTE_ARIA_REGEX,
  DomAccessibilityFixer,
  FixValidator,
}

switch (process.argv.slice(-1)[ 0 ]) {

  case '--validator-test':
    const validator = new FixValidator();

    console.log(process.argv); // @was: validator.validateTest();
  break;

  // default: console.warn('?')
}

// End.
