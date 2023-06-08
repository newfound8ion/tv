// A manually curated list of public video IDs
const videoIds = ["179509486", "171711330", "70405006", "615260697", "49258551"]; 

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
        autoplay: false,
        responsive: true,
    };

    const playerContainer = document.createElement("div");
    document.getElementById("container").appendChild(playerContainer);

    const player = new Vimeo.Player(playerContainer, options);

    player.setVolume(0);

    // We're keeping track of the player instances and their respective HTML elements here
    players.push({
        instance: player,
        element: playerContainer,
    });

    observer.observe(playerContainer);
});
