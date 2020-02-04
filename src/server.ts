#!/usr/bin/env node

/**
 * 'live-server' middleware ~ inject accessibility-fix Javascript - for demo/testing!
 *
 * @author NDF / 21-August-2019, 01-Feb-2020.
 * @see  https://github.com/tapio/live-server#usage-from-node
 */

import * as liveServer from 'live-server';
import * as path from 'path';
import * as fs from 'fs';

const FOOTER: string[] = [
  '\n',
  '<!-- Injected -->',
  '<script\n  type="module"\n  src="../../esm/accessifywiki.js"\n  data-a11y-fix-uri="./example-fixes.json" ></script>',
  '<!-- End injected -->',
];

const PARAMS = {
	port: 9001, // PORT, // 8181, // Set the server port. Defaults to 8080.
	host: '0.0.0.0', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
	// root: "/public", // Set root directory that's being served. Defaults to cwd.
	open: false, // When false, it won't load your browser by default.
	ignore: '**', // 'scss,my/templates', // comma-separated string for paths to ignore
	// file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
	wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
	// mount: [['/components', './node_modules']], // Mount a directory to a route.
	logLevel: 2, // 0 = errors only, 1 = some, 2 = lots

	middleware: [

    function (req, res, next) {
      const IS_HTML_PAGE: boolean = /\.html/.test(req.url);
      const REQUEST_FIX : boolean = /fix=(a|true|1)/.test(req.url);

      if (IS_HTML_PAGE && REQUEST_FIX) {
        const HTML_FILE: string = req.url.replace(/\?.*/, '');
        const FILE_PATH: string = path.join(__dirname, '..', HTML_FILE);

        fs.readFile(FILE_PATH, (err: Error, html: Buffer) => {
          if (err) {
            console.error('Server:', '[error]', err.toString())

            res.writeHeader(500, { 'Content-Type': 'text/html' });
            res.write('<h1> Error (500) </h1>\n<pre>' + err.toString());
            res.end();

            return;
          }

          console.log('Server:', '[html]', req.url)

          res.writeHeader(200, { 'Content-Type': 'text/html; charset=utf-8', });
          res.write(html);
          res.write(FOOTER.join('\n'));
          res.end();
        });
      }
      else {
        // console.log('OU proxy:', '[pass]');
        next();
      }
    }
  ] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};

liveServer.start(PARAMS);

// End.
