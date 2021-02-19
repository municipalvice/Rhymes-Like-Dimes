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
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const doom_videos = [
    {
        videoId: "CRHyBwNtkLA",
        songName: "Doomsday",
        startSeconds: 6,
        endSeconds: 302

    }, {
        videoId: "rpaonSDPw7Y",
        songName: "Accordion",
        startSeconds: 1,
        endSeconds: 119
    }, {
        videoId: "Pb1E5XNheqw",
        songName: "Questions",
        startSeconds: 15,
        endSeconds: 187
    }, {
        videoId: "h69FSgua80A",
        songName: "One Beer",
        endSeconds: 143
    }, {
        videoId: "uSxlZQUqVPY",
        songName: "Strange Ways",
        startSeconds: 1,
        endSeconds: 110
    }
];

function getRanDOOMVideo() {
    return doom_videos[Math.floor(Math.random() * doom_videos.length)];
}

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            'onStateChange': getState
        }
    });
}

let state;

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
                    videoId: 'Ga-R6mxI5X4',
                    startSeconds: 0,
                    endSeconds: 1661
                },
                setTimeout(function () {
                        tv_tube.classList.remove("tv-static")
                    },
                    750
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
    const randDeg = Math.floor(Math.random() * Math.floor(360));
    player.loadVideoById(getRanDOOMVideo());
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