
[![Test status][gh-badge]][gh-link]

# @accessifywiki/core #

A rewrite of the core of the [Accessify-Wiki][blog] eco-system,
with a JSON schema and unit tests.

```sh
npm install
npm run build
npm test
npm start
```

## Components

 * `DomAccessibilityFixer` ~ core class to apply fixes to a HTML Web Page `DOM`;
 * `FixValidator` ~ JSON schema-based validator (Node.js);
 * `schema/accessibility-fixes.json` ~ JSON schema;

---
[blog]: https://nick.freear.org.uk/2018/11/18/accessify-wiki.html
[gh-badge]: https://github.com/accessifywiki/accessifywiki-core/workflows/Node%20CI/badge.svg
[gh-link]: https://github.com/accessifywiki/accessifywiki-core/actions "Test status ~ 'Node CI'"
