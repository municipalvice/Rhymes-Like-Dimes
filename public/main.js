const vhs_button = document.getElementById('vhs-button');
const channel_dial = document.getElementById('channel-dial');
const volume_dial = document.getElementById('volume-dial');
const doom_badge = document.getElementById('doom-badge');
const tv_tube = document.getElementById('tv-tube');
const admin_panel = document.getElementById('admin-panel');
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
function deleteVideo() {
    fetch('/rhymes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            videoId: this.value
        })
    })
        .then(result => {
            if (result.ok) return result.json();
            window.location.reload(true);
        })
        .catch(console.error);
};

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
    setTimeout(function () {
            tv_tube.classList.remove('tv-static')
        },
        300
    )
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
    if (admin_panel.style.display === 'none') {
        admin_panel.style.display = 'inline';
    } else {
        admin_panel.style.display = 'none';
    }
});
create_button.addEventListener('click', _ => {
    window.location.reload(true);
});

Array.from(delete_buttons).forEach(button =>
    button.addEventListener('click', deleteVideo)
);

