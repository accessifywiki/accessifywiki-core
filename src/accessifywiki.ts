/**
 * A minimal script to get and apply accessibility fixes.
 */

import { DomAccessibilityFixer } from './dom-accessibility-fixer.js'; // Yes, '.js'!

// E.g. <path>/example-fixes.json
const FIX_URL = document.querySelector('script[ data-a11y-fix-uri ]').getAttribute('data-a11y-fix-uri');

fetch(FIX_URL).then(resp => resp.json()).then(fixes => {
  console.warn('Accessibility fixes:', fixes);

  const a11y = new DomAccessibilityFixer();

  const result = a11y.fix(fixes);

  console.warn('Fixes applied!', result);
})
.catch(err => console.error("Can't fetch fixes :(", err))

console.log('accessifywiki.js');
