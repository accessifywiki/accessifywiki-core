/**
 * Typescript types.
 *
 * @author NDF, 25-Jan-2020.
 *
 * @see https://github.com/nfreear/accessifyhtml5.js/blob/master/accessifyhtml5.js#L23-L24

  'aria-[a-z]+|role|tabindex|title|alt|data-[\\w-]+|lang|' + 'id|' +
  'style|for|maxlength|placeholder|pattern|required|type|target|accesskey|longdesc'  (18)
 */

// Aliases for documentation.
type CommentText   = string;
type CssSelectors  = string;
type CssStylesheet = string;
type IsoDateTime   = string;
type Milliseconds  = number;

// @TODO: How to deal with each 'aria-*' attribute, e.g. 'aria-label', and arbitrary 'data-*' attributes?
export interface HtmlAttributeFixes {
  accesskey ?: string,
  alt       ?: string,
  'aria-*'  ?: string, // E.g. 'aria-label'
  'data-*'  ?: string,
  for       ?: string,
  id        ?: string,
  lang      ?: string,
  longdesc  ?: string,
  minlength ?: number,
  maxlength ?: number,
  pattern   ?: string,
  placeholder?:string,
  required  ?: string,
  role      ?: string,
  style     ?: string, // Add for now!
  tabindex  ?: number,
  target    ?: string,
  title     ?: string,
  type      ?: string,
}

export interface AccessibilityFixStruct {
  '#'       ?: CommentText,
  selectors  : CssSelectors,
  attributes?: HtmlAttributeFixes,
  styles    ?: Array<string>,  // @TODO: Put styles here ...?
}

export interface AccessibilityFixes {
  updatedAt     ?: IsoDateTime,

  fixesOnLoad   ?: Array<AccessibilityFixStruct>,  // 'fixesOnLoad'
  onLoadTimeout ?: Milliseconds,

  repeatFixes   ?: Array<AccessibilityFixStruct>,
  repeatInterval?: Milliseconds,

  styles        ?: CssStylesheet, // @TODO: ... Or, put styles here?
}

interface ReportObject {
  sel  : string,
  attr : string,
  val  : string,
  msg  : string,
  ex  ?: Error,
}

export interface FixReport {
  ok    : Array<ReportObject>,
  warn  : Array<ReportObject>,
  fail  : Array<ReportObject>,
  input?: AccessibilityFixes,
}
