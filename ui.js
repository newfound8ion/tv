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

    function createStartButton() {
        var startButton = document.createElement('button');
        startButton.id = 'startButton';
        startButton.innerText = 'Start Video';
        document.body.appendChild(startButton);

        startButton.addEventListener('click', function() {
            window.playerModule.play();
            this.remove(); // Remove start button after it's clicked
        });
    }

    window.onload = function() {
        doubleLogoWidth();
        createStartButton();
    };

    window.uiModule = {
        updateProgressBar: updateProgressBar,
        doubleLogoWidth: doubleLogoWidth // Expose the function if needed elsewhere
        // Add other UI related functions as needed
    };
})(window);
