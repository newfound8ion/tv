// analytics.js
(function(window) {
    window.dataLayer = window.dataLayer || [];
    
    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'G-YMT320RGLJ');

    window.analytics = {
        trackEvent: function(eventCategory, eventAction, eventLabel) {
            gtag('event', eventAction, {
                'event_category': eventCategory,
                'event_label': eventLabel
            });
        }
    };
})(window);
