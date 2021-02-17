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
var state;
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'CRHyBwNtkLA',
        events: {
            'onStateChange': getState
        }
    });
}

function getState() {
    state = player.getPlayerState();
}
function playVideo(){
    player.playVideo();
}

start_button.addEventListener('click', _ => {
    if (start_button.innerHTML === 'S T A R T') {
        playVideo();
        start_button.innerHTML = 'S T O P';
    } else {
        player.pauseVideo();
        start_button.innerHTML = 'S T A R T';
    }
});