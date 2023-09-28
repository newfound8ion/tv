// ui.js
(function(window) {
    var progressBar = document.getElementById('progress-bar');
    var logo = document.getElementById('logo');

    function updateProgressBar(value) {
        progressBar.style.width = value + '%';
    }

    function doubleLogoWidth() {
        var currentWidth = logo.offsetWidth;
        logo.style.width = (currentWidth * 2) + 'px';
    }

    // Execute the function on window load or another event as needed
    window.onload = function() {
        doubleLogoWidth();
    };

    window.uiModule = {
        updateProgressBar: updateProgressBar,
        doubleLogoWidth: doubleLogoWidth // Expose the function if needed elsewhere
        // Add other UI related functions as needed
    };
})(window);
