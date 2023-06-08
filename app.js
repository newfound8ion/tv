// Fetch the video IDs from the JSON file
function fetchVideoIds(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            callback(response);
        }
    };
    xhr.open("GET", "videos.json", true);
    xhr.send();
}

// Shuffle the video IDs array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Create YouTube player
var player;
var videoIds = [];
var shuffledVideoIds = [];
var currentIndex = 0;
var isMuted = false;

function onYouTubeIframeAPIReady() {
    fetchVideoIds(function(response) {
        videoIds = response;
        shuffledVideoIds = shuffleArray(videoIds);
        createPlayer();
    });
}

function createPlayer() {
    player = new YT.Player('player', {
        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            rel: 0,
            modestbranding: 1,
            showinfo: 0,
            playsinline: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.loadVideoById(shuffledVideoIds[currentIndex].id);
    player.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
    window.addEventListener('resize', function() {
        player.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
    });
    setInterval(updateProgressBar, 200);
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playNextVideo();
    }
}

function playNextVideo() {
    currentIndex++;
    if (currentIndex >= shuffledVideoIds.length) {
        currentIndex = 0;
        shuffledVideoIds = shuffleArray(videoIds);
    }
    player.loadVideoById(shuffledVideoIds[currentIndex].id);
    updateAudioButton();
}

function toggleMute() {
    if (isMuted) {
        player.unMute();
    } else {
        player.mute();
    }
    isMuted = !isMuted;
    updateAudioButton();
}

function updateAudioButton() {
    var audioButton = document.getElementById('audio');
    if (isMuted) {
        audioButton.classList.add('muted');
    } else {
        audioButton.classList.remove('muted');
    }
}

function updateProgressBar() {
    var playerProgress = (player.getCurrentTime() / player.getDuration()) * 100;
    var progressBar = document.getElementById('progress-bar');
    progressBar.style.width = playerProgress + '%';
}

document.getElementById('logo').addEventListener('click', playNextVideo);
document.getElementById('next').addEventListener('click', playNextVideo);
document.getElementById('audio').addEventListener('click', toggleMute);
