/**
 * The whitelist of allowed HTML attributes (and attribute-classe), from a security perspective.
 *
 * The list includes WAI-ARIA-related attributes, `aria-*`, `role` and `tabindex`.
 *
 * Note, the list intentionally excludes all the `on*` Javascript event handler-attributes!
 *
 * @author NDF, 25-Jan-2020.
 *
 * @see https://w3.org/TR/wai-aria-1.1/
 * @see http://www.w3.org/WAI/ARIA/schemata/aria-1.rdf
 * @see https://html.spec.whatwg.org/multipage/
 * @see https://github.com/nfreear/accessifyhtml5.js/blob/master/accessifyhtml5.js#L23-L24

  'aria-[a-z]+|role|tabindex|title|alt|data-[\\w-]+|lang|' + 'id|' +
  'style|for|maxlength|placeholder|pattern|required|type|target|accesskey|longdesc'  (18)
 */

export const ATTRIBUTE_ARIA_REGEX = /^aria\-[a-z]{4,16}$/;

export const ATTRIBUTE_WHITE_LIST_COUNT: number = 17;

export const ATTRIBUTE_WHITE_LIST: Array<string> = [
  'accesskey',
  'alt',
  'aria-*',
  'data-*',
  'for',
  'id',
  'lang',
  'longdesc',
  'maxlength',
  'pattern',
  'placeholder',
  'required',
  'role',
  // 'style',
  'tabindex', // number.
  'target',
  'title',
  'type',
];
