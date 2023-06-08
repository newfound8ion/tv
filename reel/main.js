// A manually curated list of public video IDs
const videoIds = ["12345678", "23456789", "34567890", "45678901", "56789012"]; 

// Randomize the order of the video IDs
videoIds.sort(() => Math.random() - 0.5); 

videoIds.forEach(videoId => {
    const options = {
        id: videoId, // The video ID
        autoplay: false,
    };
    
    const playerContainer = document.createElement("div");
    document.getElementById("container").appendChild(playerContainer);
    
    const player = new Vimeo.Player(playerContainer, options);
    
    player.setVolume(0);
});
