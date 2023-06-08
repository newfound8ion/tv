function onPlayerReady(event) {
    event.target.loadVideoById(shuffledVideoIds[currentIndex].id);
    event.target.mute();  // Add this line to mute by default
    player.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
    window.addEventListener('resize', function() {
        player.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
    });
    setInterval(updateProgressBar, 200);
}

// Then you should also update the isMuted variable and audio button
function onYouTubeIframeAPIReady() {
    fetchVideoIds(function(response) {
        videoIds = response;
        shuffledVideoIds = shuffleArray(videoIds);
        createPlayer();
        isMuted = true;  // Add this line
        updateAudioButton();  // And this line
    });
}
