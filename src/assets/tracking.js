// var _paq = window._paq = window._paq || [];
// /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
// _paq.push(['trackPageView']);
// _paq.push(['enableLinkTracking']);
// (function () {
//     var u = "https://analytics.taethni.com/";
//     _paq.push(['setTrackerUrl', u + 'matomo.php']);
//     _paq.push(['setSiteId', '1']);
//     var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
//     g.type = 'text/javascript'; g.async = true; g.src = u + 'matomo.js'; s.parentNode.insertBefore(g, s);
// })();

var _paq = window._paq || [];
_paq.push(["setRequestMethod", "POST"]);
_paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
if (window.location.hostname === "localhost") {
    _paq.push(["setCookieDomain", "localhost"]);
    _paq.push(["setDomains", ["localhost"]]);
} else {
    _paq.push(["setCookieDomain", "npl.genmapper.com"]);
    _paq.push(["setDomains", ["npl.genmapper.com"]]);
}
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
_paq.push(['enableHeartBeatTimer']);
if (document.referrer) {
    _paq.push(['setReferrerUrl', document.referrer]);
}
(function () {
    var u = "//stats.taethni.com/";
    _paq.push(['setRequestMethod', 'POST']);
    _paq.push(['setTrackerUrl', u + 'js/']);
    _paq.push(['setSiteId', '1']);

    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript'; g.async = true; g.defer = true; g.src = u + 'js/'; s.parentNode.insertBefore(g, s);
})();
