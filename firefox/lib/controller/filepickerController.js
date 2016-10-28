/**
 * File picker controller.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

/**
 * !! Warning.
 * The API used to gain Chrome access is currently an experimental feature of the SDK, and may change in future releases.
 * @see https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Chrome_Authority
 */
var {Cc, Ci} = require('chrome');

/**
 * Open a dialog box for selecting a file to open.
 *
 * @returns {string} The path of the file to open
 */
function openFilePrompt() {
  const nsIFilePicker = Ci.nsIFilePicker;

  var window = require('sdk/window/utils').getMostRecentBrowserWindow(),
    path = null,
    fp = Cc['@mozilla.org/filepicker;1']
      .createInstance(nsIFilePicker);

  fp.init(window, 'Select a file', nsIFilePicker.modeOpen);
  fp.appendFilters(nsIFilePicker.filterAll | nsIFilePicker.filterText);

  var rv = fp.show();
  if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
    path = fp.file.path;
  }

  return path;
}
exports.openFilePrompt = openFilePrompt;

/**
 * Open a dialog box for selecting a file to save
 *
 * @param filename Name of the file
 * @returns {string} The path of the file to save
 */
function saveFilePrompt(filename) {
  const nsIFilePicker = Ci.nsIFilePicker;

  var window = require('sdk/window/utils').getMostRecentBrowserWindow(),
    path = null,
    fp = Cc['@mozilla.org/filepicker;1']
      .createInstance(nsIFilePicker);

  fp.init(window, 'Select a file', nsIFilePicker.modeSave);
  fp.appendFilters(nsIFilePicker.filterAll | nsIFilePicker.filterText);
  fp.defaultString = filename;

  var rv = fp.show();
  if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
    path = fp.file.path;
  }

  return path;
}
exports.saveFilePrompt = saveFilePrompt;