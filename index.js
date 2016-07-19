'use strict';

const google = require('googleapis');
const pify = require('pify');

const pagespeed = pify(google.pagespeedonline('v2').pagespeedapi.runpagespeed);

pagespeed({url: 'http://rhythmicexcellence.london'}).then(data => {
  console.log(data);
});
