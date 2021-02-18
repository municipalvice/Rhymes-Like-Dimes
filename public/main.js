const vhs_button = document.getElementById('vhs-button');
const channel_dial = document.getElementById('channel-dial');
const volume_dial = document.getElementById('volume-dial');
const doom_badge = document.getElementById('doom-badge');
const tv_tube = document.getElementById('tv-tube');
const admin_panel = document.getElementById('admin-panel');
const tag = document.createElement('script');
const change_channel_sfx = new Audio('sounds/change_channel.mp3');
const change_volume_sfx = new Audio('sounds/change_volume.mp3');
const vhs_in_sfx = new Audio('sounds/vhs_tape_in.mp3');
const vhs_out_sfx = new Audio('sounds/vhs_tape_out.mp3');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const doom_videos = [
    {
        shortCode: "CRHyBwNtkLA",
        songName: "Doomsday",
    }, {
        shortCode: "rpaonSDPw7Y",
        songName: "Accordion"
    }, {
        shortCode: "Pb1E5XNheqw",
        songName: "Questions"
    }, {
        shortCode: "h69FSgua80A",
        songName: "One Beer"
    }, {
        shortCode: "uSxlZQUqVPY",
        songName: "Strange Ways"
    }
];

var doom_video_id = "CRHyBwNtkLA";

function getDoomVideoCode() {
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

function playVideo() {
    player.playVideo();
}

function playVHSTape() {
    vhs_in_sfx.play();
    vhs_button.innerHTML = '&#11036';

    setTimeout(
        function () {
            player.loadVideoById({
                    videoId: 'Ga-R6mxI5X4'
                },
                setTimeout(function () {
                        tv_tube.classList.remove("tv-static")
                    },
                    1000
                )
            );
        },
        4500
    );
}


vhs_button.addEventListener('click', _ => {
    if (vhs_button.innerHTML === 'MM.. FOOD (The Movie)') {
        playVHSTape();
    } else {
        vhs_out_sfx.play();
        player.stopVideo();
        vhs_button.innerHTML = 'MM.. FOOD (The Movie)';
        tv_tube.classList.add("tv-static");
    }
});
channel_dial.addEventListener('click', _ => {
    change_channel_sfx.play();
    var randDeg = Math.floor(Math.random() * Math.floor(360));
    doom_video_id = getDoomVideoCode();
    player.loadVideoById({
        videoId: doom_video_id
    });
    channel_dial.style.transform = `rotate(${randDeg}deg)`;
    tv_tube.classList.remove('tv-static');
});
volume_dial.addEventListener('click', _ => {
    change_volume_sfx.play();
    if (!player.isMuted()) {
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