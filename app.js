var player;
var videoIds = [];
var currentVideoIndex;
var muted = true;
fetch('/videos.json')
    .then(response => response.json())
    .then(data => {
        videoIds = data.map(video => video.id);
        currentVideoIndex = Math.floor(Math.random() * videoIds.length);
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: videoIds[currentVideoIndex],
            playerVars: {
                autoplay: 1,
                controls: 0,
                showinfo: 0,
                rel: 0,
                modestbranding: 1,
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });

function onPlayerReady(event) {
    event.target.mute();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        nextVideo();
    }
}

function nextVideo() {
    currentVideoIndex = Math.floor(Math.random() * videoIds.length);
    player.loadVideoById(videoIds[currentVideoIndex]);
}

function toggleMute() {
    if (player.isMuted()) {
        player.unMute();
        document.getElementById('unmute').classList.remove('muted');
        muted = false;
    } else {
        player.mute();
        document.getElementById('unmute').classList.add('muted');
        muted = true;
    }
}

document.getElementById('next').addEventListener('click', nextVideo);
document.getElementById('logo').addEventListener('click', nextVideo);
document.getElementById('unmute').addEventListener('click', toggleMute);

setInterval(function() {
    var progress = (player.getCurrentTime() / player.getDuration()) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}, 1000);
