/**
 * Typescript source of the JSON schema.
 *
 * @see http://json.schemastore.org/package
 */

export const ACCESSIBILITY_FIXES_SCHEMA = {

  "$schema": "http://json-schema.org/schema#",

  "$id": "http://nick.freear.org.uk/schemas/accessibility-fix-schema.json",

  "integrity": "__FILE_INTEGRITY__",

  "#": "__COMMENT__",

  "title": "JSON schema to specify accessibility fixes for a collection of HTML Web pages.",

  "definitions": {

    "HtmlAttributeFixes": {
      "description":
        "A collection of fixes, keyed by HTML attribute name. Should now match the 'white list'. Plus, WAI-ARIA and 'data-*' patternProps.",
      "type": "object",
      "required": [],
      "additionalProperties": false,
      "properties"  : {
        "accesskey" : { "type": "string" },
        "alt"       : { "type": "string" },
        "for"       : { "type": "string" },
        "id"        : { "type": "string" },
        "lang"      : { "type": "string" },
        "longdesc"  : { "type": "string" },
        "minlength" : { "type": "integer", "minimum": 1 },
        "maxlength" : { "type": "integer", "minimum": 1 },
        "pattern"   : { "type": "string" },
        "placeholder":{ "type": "string" },
        "required"  : { "type": "string" },
        "role"      : { "type": "string" },
        "style"     : { "type": "string" },  // Add for now!
        "tabindex"  : { "type": "integer", "minimum": -1 },
        "target"    : { "type": "string" },
        "title"     : { "type": "string" },
        "type"      : { "type": "string" }
      },
      "patternProperties": {
        "^aria-[a-z]{4,16}$": {
          "type": [ "string", "number", "boolean" ]
        },
        "^data-[\\w-_]+$": {
          "type": [ "string", "number", "boolean" ]
        }
      }
    },

    "AccessibilityFixStruct": {
      "type": "object",
      "required": [ "selectors" ],
      "properties"  : {
        "#"         : { "type": "string" },
        "selectors" : { "type": "string" },
        "attributes": { "$ref": "#/definitions/HtmlAttributeFixes" },
        "styles"    : {
          "description": "@TODO: styles here ...",
          "type"    : "array",
          "items"   : { "type": "string" }
        }
      }
    },

    "Milliseconds": {
      "type"      : "integer",
      "minimum"   : 0,
      "maximum"   : 30000,
      "multipleOf": 10
    }

  },

  "type": "object",
  "required": [],
  "additionalProperties": false,

  "properties"  : {
    "#"         : { "type": "string" },
    "title"     : { "type": "string" },
    "updatedAt" : { "type": "string", "format": "date-time" },

    "include"   : {
      "type"    : "array",
      "items"   : { "type": "string", "format": "uri" }
    },

    "testUrls"  : {
      "type"    : "array",
      "items"   : { "type": "string", "format": "uri" }
    },

    "onLoadTimeout": { "$ref": "#/definitions/Milliseconds" },

    "fixesOnLoad": {
      "type"    : "array",
      "items"   : { "$ref"  : "#/definitions/AccessibilityFixStruct" }
    },

    "styles": {
      "description": "@TODO: ... or here ?!",
      "type": [ "string", "array" ]
    }
  }
}
