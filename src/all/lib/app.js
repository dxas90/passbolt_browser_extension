/**
 * Main include file.
 *
 * @copyright (c) 2017 Passbolt SARL
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

/* ===================================================================================
 *  Events
 *
 *  Events help the addon code interact with content code via content/workers
 *  given by the pagemod. Read more about it here:
 *  https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs/content_worker
 *
 *  These section contain events includes that is reusable by the listeners
 *  themselves. This allows to factorize some code common to many listeners.
 *  For example multiple listeners will be will interested in sending/receiving
 *  encryption and decryption events.
 * ==================================================================================
 */
var events = {};
events.app = require('./event/appEvents');
events.auth = require('./event/authEvents');
events.clipboard = require('./event/clipboardEvents');
events.config = require('./event/configEvents');
events.debug = require('./event/debugEvents');
events.editPassword = require('./event/editPasswordEvents');
events.file = require('./event/fileEvents');
events.group = require('./event/groupEvents');
events.groupAutocomplete = require('./event/groupAutocompleteEvents');
events.keyring = require('./event/keyringEvents');
events.masterPasswordIframe = require('./event/masterPasswordIframeEvents');
events.masterPassword = require('./event/masterPasswordEvents');
events.passboltPage = require('./event/passboltPageEvents');
events.secret = require('./event/secretEvents');
events.setup = require('./event/setupEvents');
events.setupbootstrap = require('./event/setupBootstrapEvents');
events.shareAutocomplete = require('./event/shareAutocompleteEvents');
events.share = require('./event/shareEvents');
events.template = require('./event/templateEvents');
events.user = require('./event/userEvents');

exports.events = events;

/* ==================================================================================
 *  Page mods
 *  Run scripts in the context of web pages whose URL matches a given pattern.
 *  see. https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/page-mod
 * ==================================================================================
 */
/*
 * Each pagemod triggers a worker that can be used to communicate between the add-on and content code.
 * We need to store these workers in a global objects because they need to be able to
 * communicate with each other
 */
var workers = {};
exports.workers = workers;

/*
 * Content code callbacks are UUIDs generated by the content code and mapped with an anonymous
 * function on the content code side. This UUID is given to the add-on code when the content code
 * is triggering a request for a process managed at the addon level such as encrypt or decrypt.
 * We cannot give directly the function reference since the add-on and content code can only
 * communicate via text.
 */
var callbacks = {};
exports.callbacks = callbacks;

/*
 * We use this variables to store the references to the pagemods
 * It is usefull for example to re-initialize pagemods after a configuration changes
 * for example when you change the list of domains that you are running passbolt on
 */
var pageMods = {};

/*
 * This pagemod allow inserting classes to help any page
 * to know about the status of the extension, in a modernizr fashion
 * It also helps the plugin to recognise if a page behave like a passbolt app
 */
pageMods.Bootstrap = require('./pagemod/bootstrapPagemod').Bootstrap;

/*
 * This pagemod drives the login / authentication
 */
pageMods.PassboltAuth = require('./pagemod/passboltAuthPagemod').PassboltAuth;

/*
 * This pagemod drives the login passphrase capture
 */
pageMods.PassboltAuthForm = require('./pagemod/passboltAuthFormPagemod').PassboltAuthForm;

/*
 * This pagemod help bootstrap the first step of the setup process from a passbolt server app page
 * The pattern for this url, driving the setup bootstrap, is defined in config.json
 */
pageMods.SetupBootstrap = require('./pagemod/setupBootstrapPagemod').SetupBootstrap;

/*
 * This page mod drives the reset of setup process
 * The reset of the setup process is driven on the add-on side, see in ../data/ setup.html and js/setup.js
 */
pageMods.Setup = require('./pagemod/setupPagemod').Setup;

/*
 * This pagemod drives the main addon app
 * It is inserted in all the pages of a domain that is trusted.
 * Such trust is defined during the first step of the setup process (or in config-debug)
 */
pageMods.PassboltApp = require('./pagemod/passboltAppPagemod').PassboltApp;

/*
 * This pagemod drives the clipboard iframe tool
 */
pageMods.Clipboard = require('./pagemod/clipboardPagemod').Clipboard;

/*
 * This pagemod drives the file iframe tool
 */
pageMods.File = require('./pagemod/filePagemod').File;

/*
 * This pagemod drives the dialog/iframe where the user enters the secret key password,
 * also called passphrase. It is used when encrypting, decrypting, signing, etc.
 */
pageMods.MasterPasswordDialog = require('./pagemod/masterPasswordDialogPagemod').MasterPasswordDialog;

/*
 * This pagemod drives the progress bar iframe
 * It is used when the add-on is encrypting something
 */
pageMods.ProgressDialog = require('./pagemod/progressDialogPagemod').ProgressDialog;

/*
 * This pagemod drives the iframe used when the user enter a password to be stored by passbolt
 * It is used when creating/editing a new password
 */
pageMods.SecretEditDialog = require('./pagemod/secretEditDialogPagemod').SecretEditDialog;

/*
 * This pagemod drives the iframe used when the user share a password
 * It is used when sharing a new password
 */
pageMods.ShareDialog = require('./pagemod/shareDialogPagemod').ShareDialog;

/*
 * This pagemod drives the iframe used when the user share a password
 * and he is looking for new users to grant
 */
pageMods.ShareAutocompleteDialog = require('./pagemod/shareAutocompleteDialogPagemod').ShareAutocompleteDialog;

/*
 * This pagemod drives the iframe used when the user creates / edit a group.
 * It is used when selecting the users who are part of the group.
 */
pageMods.GroupEditDialog = require('./pagemod/groupEditDialogPagemod').GroupEditDialog;

/*
 * This pagemod drives the iframe used when the user creates / edit a group.
 * It shows the autocomplete list including the users that can be added to the group.
 */
pageMods.GroupEditAutocompleteDialog = require('./pagemod/groupEditAutocompleteDialogPagemod').GroupEditAutocompleteDialog;

/*
 * This page mod drives a convenience config page for debug
 * This allows to not have to go through the setup process steps
 * and perform changes useful for testing that would otherwise break things
 * Like for example changing the public key only on the client but not the server
 */
pageMods.Debug = require('./pagemod/debugPagemod').Debug;

exports.pageMods = pageMods;
