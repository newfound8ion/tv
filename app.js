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
let captions = {
  en: "English",
  es: "Español",
  "zh-Hans": "中文",
  hi: "हिन्दी",
  ar: "العربية",
  ru: "Русский",
  he: "עברית",
  bn: "বাংলা",
  th: "ไทย",
  fr: "Français",
  de: "Deutsch"
};

function onYouTubeIframeAPIReady() {
  fetchVideoIds().then(response => {
    videoIds = response;
    shuffledVideoIds = shuffleArray(videoIds);
    createPlayer();
  });
}

function createPlayer() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
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
}

function toggleMute() {
  isMuted = !isMuted;
  player.setVolume(isMuted ? 0 : 100);
  document.getElementById('audio').classList.toggle('muted');
}

function updateProgressBar() {
  let playerProgress = (player.getCurrentTime() / player.getDuration()) * 100;
  let progressBar = document.getElementById('progress-bar');
  progressBar.style.width = playerProgress + '%';
}

function activateCaptions(lang) {
  let captionText = captions[lang];
  let captionsElement = document.createElement('div');
  captionsElement.innerText = captionText;
  captionsElement.className = 'captions';
  player.getIframe().contentWindow.document.body.appendChild(captionsElement);
}

function deactivateCaptions() {
  let captionsElements = player.getIframe().contentWindow.document.getElementsByClassName('captions');
  while (captionsElements.length > 0) {
    captionsElements[0].parentNode.removeChild(captionsElements[0]);
  }
}

document.getElementById('logo').addEventListener('click', playNextVideo);
document.getElementById('next').addEventListener('click', playNextVideo);
document.getElementById('audio').addEventListener('click', toggleMute);

let captionLinks = document.getElementsByClassName('caption-link');
for (let i = 0; i < captionLinks.length; i++) {
  captionLinks[i].addEventListener('click', function(e) {
    e.preventDefault();
    let lang = this.getAttribute('data-lang');
    deactivateCaptions();
    activateCaptions(lang);
  });
}
