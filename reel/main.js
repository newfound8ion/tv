// Provided list of video IDs
const videoIds = ["837978443", "837978321", "837978227", "837978066", "837977965" ]; 

// Randomize the order of the video IDs
videoIds.sort(() => Math.random() - 0.5); 

const players = [];

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const player = players.find(p => p.element === entry.target);
        if (entry.isIntersecting) {
            player.instance.play();
        } else {
            player.instance.pause();
        }
    });
}, {
    threshold: 0.5 // Adjust this value to decide when exactly to start and stop video play. This denotes the percentage of visibility of the video player in the viewport
});

videoIds.forEach(videoId => {
    const options = {
        id: videoId,
        width: window.innerWidth,
        height: window.innerHeight,
        byline: false,
        portrait: false,
        title: false,
        responsive: true,
    };

    const videoWrapper = document.createElement("div");
    videoWrapper.classList.add("video-wrapper");
    document.getElementById("container").appendChild(videoWrapper);

    const player = new Vimeo.Player(videoWrapper, options);

    player.setVolume(0);

    // We're keeping track of the player instances and their respective HTML elements here
    players.push({
        instance: player,
        element: videoWrapper,
    });

    observer.observe(videoWrapper);
});

// Ensure the first video plays when the page is loaded
players[0].instance.play();
