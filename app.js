var player;
var videoIds = [];
var currentIndex;
var isMuted = false;

function fetchVideoIds(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            callback(response);
        }
    };
    xhr.open("GET", "/videos.json", true);
    xhr.send();
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function onPlayerReady(event) {
    event.target.loadVideoById(videoIds[currentIndex].id);
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
    if (currentIndex >= videoIds.length) {
        currentIndex = 0;
        videoIds = shuffleArray(videoIds);
    }
    player.loadVideoById(videoIds[currentIndex].id);
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
    var audioButton = document.getElementById('unmute');
    if (isMuted) {
        audioButton.classList.add('muted');
    } else {
        audioButton.classList.remove('muted');
    }
}

function updateProgressBar() {
    var playerProgress = (player.getCurrentTime() / player.getDuration()) * 100;
    document.getElementById('progress').style.width = playerProgress + '%';
}

fetchVideoIds(function(response) {
    videoIds = response;
    videoIds = shuffleArray(videoIds);
    currentIndex = 0;
    player = new YT.Player('player', {
        height: '75vh',
        width: '100vw',
        videoId: videoIds[currentIndex].id,
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
});

document.getElementById('next').addEventListener('click', playNextVideo);
document.getElementById('logo').addEventListener('click', playNextVideo);
document.getElementById('unmute').addEventListener('click', toggleMute);
