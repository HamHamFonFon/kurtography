import kuzzleBridge from './dist/src/kuzzleBridge';
import auth from './dist/services/auth'
import search from './dist/src/search';

console.log("==========================================================================");
console.log("========================> The Otter Team present <========================");
console.log("==========================================================================");

console.log("      .----.__             ");
console.log("     / c  ^  _`;           ");
console.log("     |     .--'            ");
console.log("      \\   (               ");
console.log("      /  -.\\               _   __              _                                      _");
console.log("     / .   \\              | | / /             | |                                    | |");
console.log("    /  \\    |             | |/ /  _   _  _ __ | |_   ___    __ _  _ __   __ _  _ __  | |__   _   _");
console.log("   ;    `-. `.            |    \\ | | | || '__|| __| / _ \\  / _` || '__| / _` || '_ \\ | '_ \\ | | | |");
console.log("   |      /`'.`.          | |\\  \\| |_| || |   | |_ | (_) || (_| || |   | (_| || |_) || | | || |_| |");
console.log("   |      |   \\ \\         |_| \\_/ \\__,_||_|    \\__| \\___/  \\__, ||_|    \\__,_|| .__/ |_| |_| \\__, |");
console.log("   |    __|    `'                                            __/ |             | |             __/ |");
console.log("   ;   /   \\                                                |___/              |_|            |___/ ");
console.log("  ,'        |              ");
console.log(" (_`'---._ /--,            ");
console.log("    `'---._`'---..__       ");
console.log("          `''''--, )       ");
console.log("            _.-'`,`        ");
console.log("             ````          ");


// Load collections
kuzzleBridge.listCollections();
// Load research
search.init();

// Connexion/register links
document.querySelector('a[data-link="auth"]').addEventListener('click', function() {
    //document.querySelector('.mdl-layout__drawer').classList.toggle('is-visible');
    //document.querySelector('.mdl-mdl-layout__obfuscator').classList.toggle('is-visible');
    document.getElementById("divAuth").classList.toggle("hidden");
}, false);

document.querySelector('a[data-link="register"]').addEventListener('click', function() {
    //document.querySelector('.mdl-layout__drawer').classList.toggle('is-visible');
    //document.querySelector('.mdl-mdl-layout__obfuscator').classList.toggle('is-visible');
    //document.querySelector('.mdl-layout__drawer').setAttribute('aria-hidden', true);
    document.getElementById("divRegister").classList.toggle("hidden");
}, false);

// Hide cards
document.querySelector('#mdlAuthClose').addEventListener('click', function() {
    document.getElementById("divAuth").classList.toggle("hidden");
}, false);
document.querySelector('#mdlRegisterClose').addEventListener('click', function() {
    document.getElementById("divRegister").classList.toggle("hidden");
}, false);
document.querySelector('#mdlClose').addEventListener('click', function() {
    document.getElementById("infoKdoc").classList.toggle("hidden");
}, false);
document.querySelector('#mdlTrakingClose').addEventListener('click', function() {
    document.getElementById("divTrackingChoice").classList.toggle("hidden");
}, false);
document.querySelector('#mdlExportClose').addEventListener('click', function() {
    document.getElementById("divExport").classList.toggle("hidden");
}, false);
document.querySelector('a[data-link="logout"]').addEventListener('click', function() {
    auth.logout();
});

/**
 * Form Adding Properties
 * @param e
 */
var handleSubmit = function(e) {
    e.preventDefault();
    var objPropertiesFeature = new Array();
    var updFeature = kuzzleBridge.getSource().getFeatureById(kuzzleBridge.state.notNotifFeatureId);
    Array.from(e.target.elements).forEach(element => {
        if ("text" == element.type && "undefined" != element.type) {
            objPropertiesFeature[element.name] = element.value;
            updFeature.setProperties(objPropertiesFeature);
        }
    });
    document.getElementById("divAddDoc").classList.toggle("hidden");
    kuzzleBridge.updateDocument(updFeature);
};
var form = document.forms['form-edit-properties'];
form.addEventListener('submit', handleSubmit, false);

/**
 * Form Authentification
 * @returns {string}
 */
var handleConnexion = function(e)
{
    e.preventDefault();

    var login = e.target.elements.userkuzzlename.value;
    var password = e.target.elements.userkuzzlepass.value;

    auth.login(login, password);
};
var formAuth = document.forms['form-user-authentification'];
formAuth.addEventListener('submit', handleConnexion, false);

/**
 * Form registration
 * @returns {string}
 */
var handleRegister = function(e)
{
    e.preventDefault();

    var formLogin = e.target.elements.newUsername.value;
    var formPassword = e.target.elements.newUserPass.value;
    var formEmail = e.target.elements.newUserEmail.value;

    // TODO : add email verification

    if (0 < formLogin.length
        && 0 < formPassword.length
        && 0 < formEmail.length
    ) {
        var tabNewUser = {
            username: formLogin,
            password: formPassword,
            email: formEmail
        };

        auth.registerNewUser(tabNewUser);
    }
};
var formRegister = document.forms['form-user-register'];
formRegister.addEventListener('submit', handleRegister, false);

/**
 * @returns {string}
 */
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// https://www.dartdocs.org/documentation/mdl/1.15.2/mdlcomponents/mdlcomponents-library.html
// http://quaintous.com/2015/07/09/react-components-with-mdl/