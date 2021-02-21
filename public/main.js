const vhs_button = document.getElementById('vhs-button');
const channel_dial = document.getElementById('channel-dial');
const volume_dial = document.getElementById('volume-dial');
const doom_badge = document.getElementById('doom-badge');
const tv_tube = document.getElementById('tv-tube');
const create_button = document.getElementById('create-button');
const delete_buttons = document.querySelectorAll('.delete-video-id');
const change_channel_sfx = new Audio('sounds/change_channel.mp3');
const change_volume_sfx = new Audio('sounds/change_volume.mp3');
const vhs_in_sfx = new Audio('sounds/vhs_tape_in.mp3');
const vhs_out_sfx = new Audio('sounds/vhs_tape_out.mp3');
const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let doom_videos;

fetch('/', {
    method: 'get'
}).then(result => {
    if (result.ok) doom_videos = JSON.stringify(result);
}).catch(console.error);

// console.log(doom_videos);

function getRanDOOMVideo() {
    return doom_videos[Math.floor(Math.random() * doom_videos.length)];
}

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

let state;

function onPlayerStateChange(change) {
    state = change.data;

    switch (state) {
        //if player state is ended
        case 0:
            tv_tube.classList.add('tv-static');
            break;
        case 1:
            vibrateSpeaker();
            break;
        default:
            break;
    }
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

function vibrateSpeaker() {
    //TODO: animate speaker
}

function deleteVideo(event) {
    console.log(event.target.value);
    console.log(event.currentTarget.value);
    fetch('/rhymes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            videoId: event.target.value
        })
    })
        .catch(console.error);
}

vhs_button.addEventListener('click', event => {
    if (event.target.innerHTML === 'MM.. FOOD (The Movie)') {
        playVHSTape();
    } else {
        vhs_out_sfx.play();
        player.stopVideo();
        event.target.innerHTML = 'MM.. FOOD (The Movie)';
        tv_tube.classList.add("tv-static");
    }
});
channel_dial.addEventListener('click', event => {
    change_channel_sfx.play();
    const randDeg = Math.floor(Math.random() * Math.floor(360));
    player.loadVideoById(getRanDOOMVideo());
    event.target.style.transform = `rotate(${randDeg}deg)`;
    setTimeout(function () {
            tv_tube.classList.remove('tv-static')
        },
        300
    )
});
volume_dial.addEventListener('click', event => {
    change_volume_sfx.play();
    if (!player.isMuted()) {
        player.mute();
        event.target.style.transform = "rotate(-115deg)";
    } else {
        player.unMute();
        event.target.style.transform = "rotate(115deg)";
    }
});
doom_badge.addEventListener('click', event => {
    if (event.target.style.display === 'none') {
        event.target.style.display = 'inline';
    } else {
        event.target.style.display = 'none';
    }
});
create_button.addEventListener('click', event => {
    window.location.reload(true);
});

Array.from(delete_buttons).forEach(button =>
    button.addEventListener('click', deleteVideo)
);

