/**
 * Bootstrap pagemod.
 *
 * This pagemod allow inserting classes to help any page
 * to know about the status of the extension, in a modernizr fashion
 *
 * @copyright (c) 2017 Passbolt SARL
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */
var app = require('../app');
var pageMod = require('../sdk/page-mod');
var Worker = require('../model/worker');

var Bootstrap = function () {};
Bootstrap._pageMod = undefined;

Bootstrap.init = function () {

  if (typeof Bootstrap._pageMod !== 'undefined') {
    Bootstrap._pageMod.destroy();
    Bootstrap._pageMod = undefined;
  }

  Bootstrap._pageMod = pageMod.PageMod({
    name: 'Bootstrap',
    include: '*',
    contentScriptWhen: 'ready',
    contentStyleFile: [],
    contentScriptFile: [
      'data/vendors/jquery.min.js',
      'data/vendors/ejs_production.js',
      'data/js/lib/request.js',
      'data/js/lib/message.js',
      'data/js/lib/html.js',
      'data/js/bootstrap.js'
    ],
    onAttach: function (worker) {
      Worker.add('Bootstrap', worker);
      app.events.template.listen(worker);
      app.events.config.listen(worker);
    }
  });
};
exports.Bootstrap = Bootstrap;
