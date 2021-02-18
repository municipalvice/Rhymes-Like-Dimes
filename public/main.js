const vhs_button = document.getElementById('vhs-button');
const channel_dial = document.getElementById('channel-dial');
const volume_dial  = document.getElementById('volume-dial');
const doom_badge = document.getElementById('doom-badge');
const tv_tube = document.getElementById('tv-tube');
const admin_panel = document.getElementById('admin-panel');
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
    }, {
        shortCode: "h69FSgua80A",
        songName: "One Beer"
    }, {
        shortCode: "uSxlZQUqVPY",
        songName: "Strange Ways"
    }
];

var doom_video_id = "CRHyBwNtkLA";
function getDoomVideoCode(){
    var random_video = doom_videos[Math.floor(Math.random() * doom_videos.length)];

    return random_video.shortCode
}

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: doom_video_id,
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

vhs_button.addEventListener('click', _ => {
    if (vhs_button.innerHTML === 'MM.. FOOD (The Movie)') {
        player.loadVideoById({
            videoId: 'Ga-R6mxI5X4'
        });
        vhs_button.innerHTML = '&#11036';
        tv_tube.classList.remove("tv-static");
    } else {
        player.pauseVideo();
        vhs_button.innerHTML = 'MM.. FOOD (The Movie)';
        tv_tube.classList.add("tv-static");
    }
});
channel_dial.addEventListener('click', _ => {
    var randDeg = Math.floor(Math.random() * Math.floor(360));
    doom_video_id = getDoomVideoCode();
    player.loadVideoById({
        videoId: doom_video_id
    });
    channel_dial.style.transform = `rotate(${randDeg}deg)`;
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
doom_badge.addEventListener('click', _ => {
    if (admin_panel.style.display !== 'none') {
        admin_panel.style.display = 'none';
    } else {
        admin_panel.style.display = 'flex';
    }
});