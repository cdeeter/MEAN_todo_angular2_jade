// Webpack dependencies
require('bootstrap/dist/css/bootstrap.min.css');

// Import modules without parsing script-loader
// !! overrides all loaders and inlines the script (equivalent to using <script> in HTML)
require('!!script!angular2/bundles/angular2-polyfills.min.js');
require('!!script!rxjs/bundles/Rx.umd.min.js');
require('!!script!angular2/bundles/angular2-all.umd.min.js');

// Import boot, resolve imports/requires, and pass through Babel
require('./js/boot');