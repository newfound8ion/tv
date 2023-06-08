// Load the YouTube Iframe API asynchronously
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Fetch the video IDs from the JSON file
async function fetchVideoIds() {
    let response = await fetch('videos.json');
    let data = await response.json();
    return data;
}

// Shuffle the video IDs array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create YouTube player
let player;
let videoIds = [];
let shuffledVideoIds = [];
let currentIndex = 0;
let isMuted = true;

function onYouTubeIframeAPIReady() {
    fetchVideoIds().then(response => {
        videoIds = response;
        shuffledVideoIds = shuffleArray(videoIds);
        createPlayer();
    });
}

function createPlayer() {
    player = new YT.Player('player', {
        height: '75vh',
        width: '75vw',
        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            rel: 0,
            modestbranding: 1,
            showinfo: 0,
            playsinline: 1,
            mute: isMuted ? 1 : 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.loadVideoById(shuffledVideoIds[currentIndex].id);
    setInterval(updateProgressBar, 200);
    updateAudioButton();
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
    isMuted = !isMuted;
    player.setVolume(isMuted ? 0 : 100);
    updateAudioButton();
}

function updateAudioButton() {
    const audioButton = document.getElementById('audio');
    if (isMuted) {
        audioButton.classList.add('muted');
    } else {
        audioButton.classList.remove('muted');
    }
}

function updateProgressBar() {
    let playerProgress = (player.getCurrentTime() / player.getDuration()) * 100;
    let progressBar = document.getElementById('progress-bar');
    progressBar.style.width = playerProgress + '%';
}

document.getElementById('logo').addEventListener('click', playNextVideo);
document.getElementById('next').addEventListener('click', playNextVideo);
document.getElementById('audio').addEventListener('click', toggleMute);
