const tag = document.createElement('script');
const start_button = document.getElementById('start-button');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// const doom_videos = [
//     {
//         shortCode:"CRHyBwNtkLA",
//         songName:"Doomsday",
//     },{
//         shortCode: "rpaonSDPw7Y",
//         songName: "Accordion"
//     }, {
//         shortCode:"Pb1E5XNheqw",
//         songName:"Questions"
//     }
// ];

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'CRHyBwNtkLA',
        events: {
            'onStateChange': showNoSignal
        }
    });
}

function showNoSignal() {
    //TODO: when player is stopped/paused, show no signal image
}
function startVideo() {
    player.playVideo();
}
function stopVideo() {
    player.stopVideo();
}

start_button.addEventListener('click', _ => {
    startVideo();
});