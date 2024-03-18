// find which page you on
// find navbar button, update its class
$(document).ready(function () {
    setButtonPrimary();
});

function setButtonPrimary() {
    var tempPageUrl = window.location.href
    var indicator = getLastIndicator(tempPageUrl);
    var navLink = document.querySelector(`[href="/${indicator}"]`);
    if (navLink == null) {
        console.log(`Navbar doesnt contain /${indicator} link`);
        return;
    }
    var tempClasses = navLink.getAttribute("class");
    navLink.setAttribute("class",`${tempClasses} active`);
}

function getLastIndicator(url) {
    var indicators = url.split('/');
    return indicators[indicators.length - 1];
}