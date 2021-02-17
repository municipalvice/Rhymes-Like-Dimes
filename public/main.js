const start_button = document.getElementById('start-button');
const channel_dial = document.getElementById('channel-dial');
const volume_dial  = document.getElementById('volume-dial');
const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const doom_videos = [
    {
        shortCode:"CRHyBwNtkLA",
        songName:"Doomsday",
    },{
        shortCode: "rpaonSDPw7Y",
        songName: "Accordion"
    }, {
        shortCode:"Pb1E5XNheqw",
        songName:"Questions"
    }
];

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'CRHyBwNtkLA',
        events: {
            'onStateChange': getState
        }
    });
}

var state;
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
channel_dial.addEventListener('click', _ => {
    //TODO click to change to random Doom video
});
volume_dial.addEventListener('click', _ => {
   if (!player.isMuted()){
       player.mute();
       volume_dial.style.transform = "rotate(-115deg)";
   } else {
       player.unMute();
       volume_dial.style.transform = "rotate(115deg)";
   }
});